# Node.js Deep Dive: Backend Engineering Guide

This guide explains Node.js internals and backend architecture patterns that every Senior Engineer must know.

---

## 1. The Event Loop: How Node.js Really Works

**The Big Idea:** Node.js is **single-threaded** but **non-blocking**. It can handle thousands of requests without creating new threads for each one.

### The Architecture

Node.js = **V8 Engine** (JavaScript runtime) + **libuv** (C library for async I/O)

### The Event Loop Phases (In Order)

```
   ┌───────────────────────────┐
┌─>│           timers          │  Execute setTimeout/setInterval callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  Internal system callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  Internal use only
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │  Execute setImmediate() callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  socket.on('close', ...)
   └───────────────────────────┘
```

### Interview Question: Execution Order

```javascript
setTimeout(() => console.log('1'), 0);
setImmediate(() => console.log('2'));
process.nextTick(() => console.log('3'));
Promise.resolve().then(() => console.log('4'));

// Output:
// 3  ← nextTick queue (runs FIRST, before event loop starts)
// 4  ← Promise microtask queue (runs after nextTick, before timers)
// 1  ← setTimeout (timers phase)
// 2  ← setImmediate (check phase)
```

**Rule of Thumb:**
1. `process.nextTick()` - Runs before everything (use sparingly, can starve the event loop)
2. `Promise` - Microtask queue (runs after each phase)
3. `setTimeout` - Timers phase
4. `setImmediate` - Check phase (runs after poll phase)

---

## 2. Streams: Handling Large Data Efficiently

**The Big Idea:** Don't load a 5GB file into memory. Process it in **chunks**.

### Types of Streams

| Type | Description | Example |
| :--- | :--- | :--- |
| **Readable** | Source of data | `fs.createReadStream('file.txt')` |
| **Writable** | Destination for data | `fs.createWriteStream('output.txt')` |
| **Duplex** | Both readable and writable | TCP socket |
| **Transform** | Modify data as it flows | Compression (gzip) |

### Example: Reading a Large File (The Wrong Way ❌)

```javascript
// Loads entire 5GB file into memory → RAM crash!
const fs = require('fs');
const data = fs.readFileSync('huge-video.mp4');
res.send(data);
```

### Example: Using Streams (The Right Way ✅)

```javascript
const fs = require('fs');
const readStream = fs.createReadStream('huge-video.mp4');

// Sends data in chunks (default 64KB per chunk)
readStream.pipe(res);
```

### Real-World Use Case: CSV Upload Processing

```javascript
const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('users.csv')
  .pipe(csv())  // Transform stream (converts CSV to JSON)
  .on('data', (row) => {
    // Process each row as it comes (Database insert)
    db.users.create(row);
  })
  .on('end', () => {
    console.log('CSV file processed');
  });
```

---

## 3. Scaling Node.js Applications

### Problem: Single-Threaded Bottleneck

Node.js uses **one CPU core** by default. Modern servers have 8-64 cores. We're wasting resources!

### Solution 1: Cluster Mode (Multi-Process)

Create multiple Node.js processes (Workers) to utilize all CPU cores.

```javascript
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
  // Master process: Fork workers for each CPU core
  const numCPUs = os.cpus().length;
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();  // Create a new worker
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();  // Auto-restart crashed workers
  });

} else {
  // Worker process: Run the Express app
  const app = express();
  app.get('/', (req, res) => res.send(`Handled by ${process.pid}`));
  app.listen(3000);
  console.log(`Worker ${process.pid} started`);
}
```

**Result:** 8 cores = 8 workers = 8x throughput for CPU-bound tasks.

### Solution 2: Worker Threads (For CPU-Intensive Tasks)

When you need to do heavy computation (image processing, encryption) without blocking the event loop.

```javascript
const { Worker } = require('worker_threads');

function runHeavyTask(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./heavy-computation.js', {
      workerData: data
    });

    worker.on('message', resolve);
    worker.on('error', reject);
  });
}

// heavy-computation.js
const { parentPort, workerData } = require('worker_threads');
// Do expensive calculation
const result = expensiveOperation(workerData);
parentPort.postMessage(result);
```

**When to Use:**
- **Cluster:** For I/O-heavy apps (APIs, web servers).
- **Worker Threads:** For CPU-heavy tasks (video encoding, data analysis).

---

## 4. Error Handling (Production-Grade)

### The Golden Rules

1. **Never crash the server** - Catch errors gracefully.
2. **Log everything** - You can't fix what you can't see.
3. **Fail fast** - If something is fatally wrong, restart cleanly.

### Handling Uncaught Exceptions

```javascript
// Last resort: Something broke outside try/catch
process.on('uncaughtException', (error) => {
  console.error('FATAL ERROR:', error);
  // Log to monitoring service (Sentry, Datadog)
  logger.fatal(error);
  
  // Gracefully shut down
  process.exit(1);  // Let PM2/Docker restart the process
});

// For async errors (Promise rejections)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  // Log and exit
  process.exit(1);
});
```

### Graceful Shutdown

```javascript
const server = app.listen(3000);

// Handle SIGTERM (Docker stop, Kubernetes pod termination)
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  
  server.close(() => {
    console.log('HTTP server closed');
    
    // Close database connections
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
  
  // Force close after 10 seconds if not finished
  setTimeout(() => {
    console.error('Forcing shutdown');
    process.exit(1);
  }, 10000);
});
```

---

## 5. Memory Leaks: Detection \u0026 Prevention

### Common Causes

1. **Global Variables:** They never get garbage collected.
2. **Event Listeners Not Removed:** `socket.on('data', ...)` without cleanup.
3. **Closures Holding References:** Accidentally keeping large objects in memory.
4. **Timers Not Cleared:** `setInterval` running forever.

### Detection Tools

```bash
# Built-in heap snapshot
node --inspect index.js
# Open Chrome: chrome://inspect
# Take heap snapshots before/after to find leaks

# Or use clinic.js
npx clinic doctor -- node index.js
```

### Best Practices

```javascript
// ❌ Bad: Event listener leak
function setupSocket(socket) {
  socket.on('data', handleData);
  // Missing cleanup!
}

// ✅ Good: Cleanup on disconnect
function setupSocket(socket) {
  const handleData = (data) => { /* ... */ };
  socket.on('data', handleData);
  
  socket.on('close', () => {
    socket.removeListener('data', handleData);  // Cleanup
  });
}
```

---

## 6. Security Best Practices

### 1. Environment Variables (Never Hardcode Secrets)

```javascript
// ❌ Bad
const API_KEY = 'sk-1234567890abcdef';

// ✅ Good
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error('API_KEY environment variable is required');
}
```

### 2. Rate Limiting (Prevent DDoS)

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,  // Max 100 requests per IP
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
```

### 3. Input Validation

```javascript
const { body, validationResult } = require('express-validator');

app.post('/user',
  body('email').isEmail(),
  body('age').isInt({ min: 1, max: 150 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Safe to use req.body
  }
);
```

### 4. Helmet (Security Headers)

```javascript
const helmet = require('helmet');
app.use(helmet());  // Sets secure HTTP headers automatically
```

---

## 7. Performance Optimization

### 1. Caching

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });  // 10 min TTL

app.get('/expensive-data', async (req, res) => {
  const cacheKey = 'expensive-data';
  
  // Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  // Cache miss: Fetch from database
  const data = await db.query('SELECT * FROM expensive_table');
  cache.set(cacheKey, data);
  res.json(data);
});
```

### 2. Database Connection Pooling

```javascript
// ❌ Bad: New connection for every query
const mysql = require('mysql');
const connection = mysql.createConnection({ ... });
connection.query('SELECT ...', (err, results) => { ... });

// ✅ Good: Reuse connections from a pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'mydb'
});

pool.query('SELECT ...', (err, results) => { ... });
```

### 3. Compression

```javascript
const compression = require('compression');
app.use(compression());  // Gzip responses (reduces size by 70%)
```

---

## 8. Interview Checklist: Node.js

- [ ] Can you explain the Event Loop phases in order?
- [ ] What is the difference between `process.nextTick()` and `setImmediate()`?
- [ ] How would you scale a Node.js app to handle 1 million concurrent users?
- [ ] Explain when you would use Streams vs loading a file into memory.
- [ ] How do you prevent memory leaks in production?
- [ ] What is the libuv thread pool and when is it used? (File I/O, DNS, crypto)
