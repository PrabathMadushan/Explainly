# System Design & Architecture: The Senior Interview Guide

System Design interviews are the **make-or-break** round for Senior Engineers. This guide teaches you the framework to tackle any design problem.

---

## 1. The System Design Interview Framework

**Time Allocation (45 min interview):**
1. Requirements Clarification (5 min)
2. Back-of-Envelope Estimation (5 min)
3. High-Level Design (10 min)
4. Deep Dive (20 min)
5. Wrap-up \u0026 Questions (5 min)

---

## 2. Step 1: Requirements Clarification

**Never start designing immediately!** Ask questions to understand the scope.

### Functional Requirements (What the system does)
- "What are the core features we need to support?"
- "Are there any features we can deprioritize for v1?"

**Example: Design Twitter**
- ✅ Must Have: Post tweets, Follow users, View timeline
- ❌ Out of Scope (for v1): Direct Messages, Video uploads, Ads

### Non-Functional Requirements (How the system behaves)
- **Scalability:** "How many users? Daily active users (DAU)?"
- **Performance:** "What's the acceptable latency? (< 100ms? < 1s?)"
- **Availability:** "Can we have downtime? (99.9% = ~43 min/month downtime)"
- **Consistency:** "Is it okay if different users see slightly different data?" (CAP Theorem)

**Example Questions:**
- "Can tweets be eventually consistent, or must they appear instantly for all followers?"
- "Is read-heavy or write-heavy?" (Twitter: 100x more reads than writes)

---

## 3. Step 2: Back-of-Envelope Estimation

Interviewers want to see you can **estimate scale** without a calculator.

### Key Numbers to Memorize

```
1 MB = 1,000 KB = 1,000,000 bytes
1 GB = 1,000 MB
1 TB = 1,000 GB

1 million = 10^6
1 billion = 10^9

1 day = 86,400 seconds (~100,000 for quick math)
```

### Example: Design Twitter

**Assumptions:**
- 300M DAU (Daily Active Users)
- Each user views timeline 5 times/day → **1.5B timeline views/day**
- Each timeline has 20 tweets (from followed users)

**Read Traffic:**
- 1.5B views/day ÷ 86,400 sec = **~17,000 reads/sec**
- **Peak traffic (3x):** ~50,000 reads/sec

**Write Traffic:**
- 100M tweets/day → **~1,200 writes/sec**

**Storage:**
- Average tweet: 280 chars × 2 bytes (UTF-8) = 560 bytes
- Add metadata (user ID, timestamp, likes): ~1 KB/tweet
- 100M tweets/day × 1 KB = **100 GB/day**
- 1 year = **36 TB**
- 5 years (with retention) = **180 TB**

**Takeaway:** Read-heavy workload. Need caching, replicas for reads.

---

## 4. Step 3: High-Level Design

Draw boxes and arrows. Start simple, then iterate.

### Example: URL Shortener (like bit.ly)

```
┌─────────┐         ┌──────────────┐         ┌──────────┐
│  User   │────────>│ Load Balancer│────────>│  API     │
│         │<────────│              │<────────│  Servers │
└─────────┘         └──────────────┘         └────┬─────┘
                                                   │
                                                   ▼
                                            ┌─────────────┐
                                            │  Database   │
                                            │ (Key-Value) │
                                            │  Redis/DDB  │
                                            └─────────────┘

Flow:
1. User submits long URL: "https://example.com/very/long/url"
2. API generates short code: "a3b9Xz"
3. Store in DB: { "a3b9Xz": "https://example.com/very/long/url" }
4. Return: "https://short.ly/a3b9Xz"

Redirect:
1. User visits: "https://short.ly/a3b9Xz"
2. API looks up "a3b9Xz" in DB
3. Returns 301 redirect to original URL
```

---

## 5. Step 4: Deep Dive (The Real Test)

The interviewer will ask: "How do you handle X?" This is where you show expertise.

### Common Deep Dive Topics

#### A. Database Choice: SQL vs NoSQL

| Use Case | Choose SQL (Postgres/MySQL) | Choose NoSQL (MongoDB/DynamoDB) |
| :--- | :--- | :--- |
| Data Structure | Structured, relationships (Users ↔ Orders) | Unstructured, flexible schema |
| Transactions | Need ACID (Banking, Inventory) | Not critical (Logging, Analytics) |
| Queries | Complex joins, aggregations | Simple key-value lookups |
| Scalability | Vertical (bigger server) | Horizontal (more servers) |
| Consistency | Strong consistency required | Eventual consistency OK |

**Example:**
- **Banking App:** SQL (Need transactions: Debit A, Credit B must both succeed or fail)
- **Social Media Feed:** NoSQL (Eventual consistency OK, schema changes frequently)

#### B. Caching Strategy

**Why Cache?** Database is slow (10-50ms). Cache is fast (< 1ms).

**Eviction Policies:**
- **LRU (Least Recently Used):** Remove items not accessed recently.
- **LFU (Least Frequently Used):** Remove items accessed least often.
- **TTL (Time To Live):** Expire after X seconds.

**Cache Patterns:**

1. **Cache-Aside (Lazy Loading)**
```
Read:
1. Check cache
2. If MISS → Fetch from DB → Store in cache → Return
3. If HIT → Return from cache

Write:
1. Write to DB
2. Invalidate cache (let next read repopulate)
```

2. **Write-Through**
```
Write:
1. Write to cache
2. Cache writes to DB immediately
(Slower writes, but cache always fresh)
```

3. **Write-Behind (Write-Back)**
```
Write:
1. Write to cache (return instantly)
2. Async write to DB later
(Risky: Data loss if cache crashes before DB write)
```

**When to Use:**
- **Cache-Aside:** Most common. Safe. (Twitter timeline)
- **Write-Through:** When consistency matters. (Product inventory)
- **Write-Behind:** High write throughput. (Analytics counters)

#### C. Load Balancing Algorithms

**Problem:** 1 server can handle 1,000 req/sec. You have 10,000 req/sec. Solution: 10 servers + Load Balancer.

| Algorithm | How it works | Use Case |
| :--- | :--- | :--- |
| **Round Robin** | Server 1 → 2 → 3 → 1 → 2... | Servers are identical |
| **Least Connections** | Send to server with fewest active connections | Servers have varying capacity |
| **IP Hash** | Hash user's IP → Always same server | Session persistence (sticky sessions) |
| **Weighted Round Robin** | Server 1 (weight 3) gets 3x more traffic | Servers have different CPU/RAM |

#### D. Database Scaling

**Vertical Scaling (Scale Up):** Bigger server (8 cores → 64 cores).
- ✅ Simple.
- ❌ Expensive. Physical limits.

**Horizontal Scaling (Scale Out):** More servers.

**1. Replication (Read Scalability)**
```
                ┌──────────────┐
                │   Master DB  │ (Writes)
                └───────┬──────┘
                        │ (Replication)
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    ┌────────┐     ┌────────┐     ┌────────┐
    │Replica1│     │Replica2│     │Replica3│ (Reads)
    └────────┘     └────────┘     └────────┘
```
- **Master:** Handles all writes.
- **Replicas:** Handle reads (eventual consistency).
- **Use Case:** Read-heavy apps (Twitter, blogs).

**2. Sharding (Write Scalability)**

Split data across multiple databases.

**Example: User Database**
- Shard 1: Users A-M
- Shard 2: Users N-Z

**Sharding Strategies:**
- **Range-Based:** User ID 1-1M → Shard 1, 1M-2M → Shard 2
  - ❌ Problem: Uneven distribution (celebrities on Shard 1).
- **Hash-Based:** `hash(user_id) % num_shards`
  - ✅ Even distribution.
  - ❌ Rebalancing is hard (adding new shard changes hash).
- **Geo-Based:** US users → US Shard, EU users → EU Shard
  - ✅ Low latency.

**Challenges:**
- No joins across shards.
- Transactions across shards are complex.

#### E. CAP Theorem (The Fundamental Trade-off)

You can only have **2 out of 3**:

- **C (Consistency):** All nodes see the same data at the same time.
- **A (Availability):** Every request gets a response (even if some nodes are down).
- **P (Partition Tolerance):** System continues to work despite network failures.

**In Practice:** Network failures happen. **You must choose P.** So the real choice is:
- **CP (Consistency + Partition Tolerance):** Sacrifice Availability.
  - Bank account balance (can't show stale data).
  - Example: MongoDB, HBase.
- **AP (Availability + Partition Tolerance):** Sacrifice Consistency (Eventual Consistency).
  - Social media likes (OK if count is off by a few for 1 second).
  - Example: Cassandra, DynamoDB.

---

## 6. Common System Design Questions \u0026 Cheat Sheets

### Design Instagram

**Key Challenges:**
- Image storage (S3/CDN)
- Feed generation (Fan-out on write vs Fan-out on read)
- Real-time notifications (WebSockets)

**High-Level:**
```
Users → API Gateway → [Upload Service → S3]
                   → [Feed Service → Timeline DB (Cassandra)]
                   → [Graph Service → Who follows whom (SQL)]
```

### Design Uber

**Key Challenges:**
- Real-time location tracking (WebSockets, Redis Geo)
- Matching drivers to riders (Geohashing, Quadtree)
- ETA calculation (Graph algorithms, traffic data)

### Design YouTube

**Key Challenges:**
- Video upload processing (Transcoding to different resolutions)
- Video storage \u0026 delivery (CDN, adaptive bitrate streaming)
- Recommendation engine (ML, collaborative filtering)

---

## 7. Key Architectural Patterns

### 1. Microservices vs Monolith

| Aspect | Monolith | Microservices |
| :--- | :--- | :--- |
| **Structure** | One codebase, one deployment | Multiple services, independent deployments |
| **Scaling** | Scale entire app | Scale individual services |
| **Deployment** | Simple (one deploy) | Complex (orchestration needed) |
| **Tech Stack** | One language/framework | Each service can use different tech |
| **Best For** | Small teams, MVPs | Large teams, high scale |

### 2. Event-Driven Architecture

Instead of direct API calls, services communicate via **events** (messages).

```
Order Service → [Order Placed Event] → Message Queue (Kafka/RabbitMQ)
                                            ↓
                                  ┌─────────┴──────────┐
                                  ▼                    ▼
                         Inventory Service    Email Service
```

**Benefits:**
- Decoupling (services don't need to know about each other).
- Resilience (if Email Service is down, message stays in queue).

### 3. CQRS (Command Query Responsibility Segregation)

Separate **read** and **write** databases.

```
Writes → Command DB (Optimized for writes, normalized)
Reads  → Query DB (Optimized for reads, denormalized, cached)
         (Synced asynchronously from Command DB)
```

**Use Case:** E-commerce product catalog (writes are rare, reads are millions/sec).

---

## 8. Interview Checklist: System Design

- [ ] Can you explain the CAP theorem with examples?
- [ ] Design a URL shortener. How do you generate unique short codes?
- [ ] How would you scale a database that's hitting 100% CPU?
- [ ] Explain the difference between Cache-Aside and Write-Through caching.
- [ ] Design a rate limiter (Token Bucket algorithm).
- [ ] How do you ensure data consistency in a distributed system?
- [ ] What is the difference between Load Balancer and API Gateway?
