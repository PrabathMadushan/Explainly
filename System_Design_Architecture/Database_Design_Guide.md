# Database Design \u0026 Scaling: The Complete Guide

This guide covers database fundamentals, design principles, and scaling strategies that every Senior Engineer must know.

---

## 1. SQL vs NoSQL: The Decision Matrix

### When to Choose SQL (Relational Databases)

**Use SQL if you need:**
- ✅ **Structured data** with clear relationships (Users ↔ Orders ↔ Products)
- ✅ **ACID transactions** (All-or-nothing operations)
- ✅ **Complex queries** with JOINs and aggregations
- ✅ **Data integrity** (Foreign keys, constraints)

**Examples:** PostgreSQL, MySQL, SQL Server

**Best For:**
- Banking/Finance (transactions are critical)
- E-commerce (inventory management)
- CRM systems
- Any app with complex relationships

### When to Choose NoSQL

**Use NoSQL if you need:**
- ✅ **Flexible schema** (data structure changes frequently)
- ✅ **Horizontal scalability** (massive scale, distributed)
- ✅ **High write throughput** (millions of writes/sec)
- ✅ **Simple key-value or document lookups**

**Types of NoSQL:**

| Type | Example | Use Case |
| :--- | :--- | :--- |
| **Document** | MongoDB, Firestore | User profiles, product catalogs (JSON-like data) |
| **Key-Value** | Redis, DynamoDB | Caching, session storage |
| **Column-Family** | Cassandra, HBase | Time-series data, analytics (wide rows) |
| **Graph** | Neo4j, Amazon Neptune | Social networks, recommendation engines |

---

## 2. Database Normalization (SQL Best Practices)

**Goal:** Eliminate redundancy and maintain data integrity.

### Example: E-commerce Database

#### ❌ Bad Design (Denormalized - Redundant Data)

**Orders Table:**
```
OrderID | CustomerName | CustomerEmail     | Product      | Price
--------|--------------|------------------|--------------|------
1       | Alice        | alice@email.com  | Laptop       | $1000
2       | Alice        | alice@email.com  | Mouse        | $20
3       | Bob          | bob@email.com    | Laptop       | $1000
```

**Problems:**
- Customer data duplicated (waste space)
- If Alice changes email, must update ALL rows
- If Laptop price changes, update ALL rows

#### ✅ Good Design (Normalized - 3NF)

**Customers Table:**
```
CustomerID | Name  | Email
-----------|-------|------------------
1          | Alice | alice@email.com
2          | Bob   | bob@email.com
```

**Products Table:**
```
ProductID | Name   | Price
----------|--------|------
101       | Laptop | $1000
102       | Mouse  | $20
```

**Orders Table:**
```
OrderID | CustomerID | ProductID | Quantity
--------|------------|-----------|----------
1       | 1          | 101       | 1
2       | 1          | 102       | 1
3       | 2          | 101       | 1
```

**Benefits:**
- No duplicate data
- Update email once in Customers table
- Update price once in Products table

### Normalization Forms (Quick Reference)

- **1NF:** No repeating groups (each cell has one value)
- **2NF:** No partial dependencies (non-key columns depend on entire primary key)
- **3NF:** No transitive dependencies (non-key columns don't depend on other non-key columns)

**Practical Tip:** For most apps, **3NF is enough**. Don't over-normalize.

---

## 3. Indexes: The Performance Multiplier

**Without Index:** Database scans **every row** (slow for large tables).
**With Index:** Database uses a tree structure to find rows instantly.

### Example: Finding a User by Email

```sql
-- Without index: Scans 10 million rows
SELECT * FROM users WHERE email = 'alice@example.com';
-- Time: 5 seconds

-- With index on email column: Direct lookup
CREATE INDEX idx_email ON users(email);
-- Time: 10ms (500x faster!)
```

### Types of Indexes

#### 1. Single-Column Index
```sql
CREATE INDEX idx_user_email ON users(email);
```

#### 2. Composite Index (Multi-Column)
```sql
-- Good for queries like: WHERE status = 'active' AND created_at > '2024-01-01'
CREATE INDEX idx_status_created ON users(status, created_at);
```

**Order matters!**
- ✅ `WHERE status = 'active' AND created_at > '2024-01-01'` → Uses index
- ✅ `WHERE status = 'active'` → Uses index (leftmost column)
- ❌ `WHERE created_at > '2024-01-01'` → Does NOT use index (missing leftmost column)

#### 3. Unique Index
```sql
CREATE UNIQUE INDEX idx_username ON users(username);
-- Enforces uniqueness + speeds up lookups
```

### ⚠️ Index Trade-offs

**Pros:**
- Faster reads (SELECT queries)

**Cons:**
- Slower writes (INSERT/UPDATE must update index)
- Consumes storage

**Rule of Thumb:** Index columns used in WHERE, JOIN, and ORDER BY clauses.

---

## 4. Query Optimization

### EXPLAIN: Your Best Friend

```sql
EXPLAIN SELECT * FROM orders WHERE customer_id = 123;
```

**Output tells you:**
- Is an index being used?
- How many rows are scanned?
- Query cost

### Common Anti-Patterns

#### ❌ Bad: SELECT *
```sql
-- Fetches ALL columns (wasteful if you only need name)
SELECT * FROM users WHERE id = 1;
```

#### ✅ Good: Specify Columns
```sql
SELECT name, email FROM users WHERE id = 1;
```

#### ❌ Bad: Functions in WHERE Clause
```sql
-- Forces full table scan (can't use index)
SELECT * FROM users WHERE UPPER(email) = 'ALICE@EXAMPLE.COM';
```

#### ✅ Good: Store Lowercase in DB
```sql
-- Store emails as lowercase, query directly
SELECT * FROM users WHERE email = 'alice@example.com';
```

#### ❌ Bad: N+1 Query Problem
```sql
-- Fetch all orders (1 query)
SELECT * FROM orders;

-- For each order, fetch customer (N queries)
SELECT * FROM customers WHERE id = ?;
-- Total: N+1 queries (slow!)
```

#### ✅ Good: Use JOINs
```sql
-- Single query
SELECT orders.*, customers.name
FROM orders
JOIN customers ON orders.customer_id = customers.id;
```

---

## 5. Transactions \u0026 ACID

**Transaction:** A group of operations that must ALL succeed or ALL fail.

### Example: Bank Transfer

```sql
BEGIN TRANSACTION;

-- Deduct $100 from Alice
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;

-- Add $100 to Bob
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;

COMMIT;
-- Both updates happen, or neither happens
```

If power fails after first UPDATE, database automatically **rolls back** (no money lost!).

### ACID Properties

- **A (Atomicity):** All or nothing.
- **C (Consistency):** Data is valid (constraints enforced).
- **I (Isolation):** Concurrent transactions don't interfere.
- **D (Durability):** Once committed, data persists (even if server crashes).

### Isolation Levels (Trade-off Speed vs Safety)

| Level | Dirty Read | Non-Repeatable Read | Phantom Read | Speed |
| :--- | :---: | :---: | :---: | :--- |
| **Read Uncommitted** | ✅ | ✅ | ✅ | Fastest |
| **Read Committed** | ❌ | ✅ | ✅ | Fast |
| **Repeatable Read** | ❌ | ❌ | ✅ | Slower |
| **Serializable** | ❌ | ❌ | ❌ | Slowest (locks) |

**Default:** Most databases use **Read Committed**.

---

## 6. Database Scaling Strategies

### Strategy 1: Vertical Scaling (Scale Up)

**What:** Upgrade to a bigger server (more CPU, RAM, SSD).

**Pros:** Simple.
**Cons:** Expensive. Physical limits (can't buy a 1TB RAM server easily).

### Strategy 2: Read Replicas (Read Scalability)

**Problem:** 90% of queries are reads, 10% writes. Master DB is overloaded.

**Solution:** Copy data to multiple **replica databases**.

```
                ┌──────────────┐
                │   Master DB  │ (Handles ALL writes)
                └───────┬──────┘
                        │ (Async replication)
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    ┌────────┐     ┌────────┐     ┌────────┐
    │Replica1│     │Replica2│     │Replica3│ (Read-only)
    └────────┘     └────────┘     └────────┘
```

**Application Logic:**
```javascript
// Writes go to master
db.master.query('INSERT INTO users ...');

// Reads go to replicas (load balanced)
db.replica.query('SELECT * FROM users ...');
```

**Trade-off:** **Eventual consistency**. A write might take 100ms to replicate. User might not see their own post immediately.

### Strategy 3: Sharding (Write Scalability)

**Problem:** Single master DB can't handle millions of writes/sec.

**Solution:** Split data across multiple databases (shards).

#### Example: Shard by User ID

```
┌─────────────────┐
│  Application    │
└────────┬────────┘
         │
    ┌────┴────┐
    │ Router  │ (hash(user_id) % 3)
    └────┬────┘
         │
    ┌────┼─────┬──────┐
    ▼    ▼     ▼      ▼
 Shard0 Shard1 Shard2
 (ID%3=0)(ID%3=1)(ID%3=2)
```

**Query user 123:**
- `123 % 3 = 0` → Query Shard 0

**Challenges:**
1. **Can't JOIN across shards** (User on Shard 0, Orders on Shard 1).
2. **Rebalancing is hard** (adding Shard 3 changes all hash mappings).
3. **Hot shards** (Celebrity users on one shard).

**Solutions:**
- Use **Consistent Hashing** (minimizes rebalancing).
- Denormalize data (duplicate user info in orders table).

### Strategy 4: Partitioning vs Sharding

**Partitioning:** Splitting table within **one database** (e.g., `orders_2023`, `orders_2024`).
**Sharding:** Splitting table across **multiple databases**.

---

## 7. Caching with Redis

**Rule:** Cache is NOT the source of truth. Database is.

### Cache-Aside Pattern (Most Common)

```javascript
async function getUser(userId) {
  // 1. Check cache first
  const cached = await redis.get(`user:${userId}`);
  if (cached) {
    return JSON.parse(cached);  // Cache HIT
  }

  // 2. Cache MISS: Fetch from DB
  const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

  // 3. Populate cache (TTL 10 min)
  await redis.set(`user:${userId}`, JSON.stringify(user), 'EX', 600);

  return user;
}
```

### Cache Invalidation Strategies

**Problem:** User updates profile. Cache still has old data!

#### 1. TTL (Time To Live)
```javascript
redis.set('user:123', data, 'EX', 300);  // Expires after 5 min
```
**Pros:** Simple.
**Cons:** Stale data for up to 5 min.

#### 2. Explicit Invalidation
```javascript
async function updateUser(userId, newData) {
  await db.query('UPDATE users SET ... WHERE id = ?', [userId]);
  await redis.del(`user:${userId}`);  // Force cache refresh
}
```

#### 3. Write-Through Cache
```javascript
async function updateUser(userId, newData) {
  await redis.set(`user:${userId}`, JSON.stringify(newData));
  await db.query('UPDATE users SET ... WHERE id = ?', [userId]);
}
```

---

## 8. NoSQL Deep Dive: MongoDB Example

### Document Structure

```javascript
// users collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Alice",
  email: "alice@example.com",
  address: {  // Embedded document
    street: "123 Main St",
    city: "NYC"
  },
  orders: [  // Array of references
    ObjectId("507f191e810c19729de860ea"),
    ObjectId("507f191e810c19729de860eb")
  ]
}
```

### Embedding vs Referencing

#### Embedding (Denormalization)
**Good for:** One-to-few relationships (User → Addresses).
```javascript
{
  name: "Alice",
  addresses: [
    { street: "123 Main St", city: "NYC" },
    { street: "456 Oak Ave", city: "LA" }
  ]
}
```
**Pros:** Single query to get everything.
**Cons:** Document size limit (16MB in MongoDB).

#### Referencing (Normalization)
**Good for:** One-to-many or many-to-many (User → Orders).
```javascript
// users collection
{ _id: 1, name: "Alice" }

// orders collection
{ _id: 101, user_id: 1, product: "Laptop" }
{ _id: 102, user_id: 1, product: "Mouse" }
```
**Pros:** No duplication.
**Cons:** Requires multiple queries (or `$lookup` join, which is slow).

---

## 9. Interview Checklist: Databases

- [ ] Explain the difference between SQL and NoSQL with examples.
- [ ] What is database normalization and why is it important?
- [ ] How do indexes improve query performance? What are the trade-offs?
- [ ] Explain ACID properties with a real-world example.
- [ ] How would you scale a database handling 1M writes/sec?
- [ ] What is the N+1 query problem and how do you solve it?
- [ ] Explain sharding vs replication. When would you use each?
- [ ] How does cache invalidation work? (TTL vs explicit invalidation)
