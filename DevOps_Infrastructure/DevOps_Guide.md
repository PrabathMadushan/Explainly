# DevOps & Infrastructure: The Modern Senior Engineer's Guide

Modern Senior Engineers **own their code from development to production**. This guide covers the essentials.

---

## 1. CI/CD Pipelines: Automating Software Delivery

**CI (Continuous Integration):** Automatically test code when pushed to Git.
**CD (Continuous Deployment):** Automatically deploy passing code to production.

### The Pipeline Stages

```
┌─────────┐   ┌──────────┐   ┌───────┐   ┌──────────┐   ┌─────────┐
│  Lint   │──>│  Build   │──>│ Test  │──>│  Deploy  │──>│  Prod   │
└─────────┘   └──────────┘   └───────┘   └──────────┘   └─────────┘
    ↓             ↓              ↓            ↓
 ESLint      Webpack       Jest/Cypress   Docker Push   K8s Rolling
 Prettier    TypeScript    Unit/E2E       to Registry   Update
```

### Example: GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      # 1. Checkout code
      - uses: actions/checkout@v3
      
      # 2. Install dependencies
      - name: Install Dependencies
        run: npm ci
      
      # 3. Lint
      - name: Run Linter
        run: npm run lint
      
      # 4. Unit Tests
      - name: Run Tests
        run: npm test
      
      # 5. Build
      - name: Build Application
        run: npm run build
      
      # 6. Build Docker Image
      - name: Build Docker Image
        run: docker build -t myapp:${{ github.sha }} .
      
      # 7. Push to Container Registry
      - name: Push to Docker Hub
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker push myapp:${{ github.sha }}
      
      # 8. Deploy to Kubernetes
      - name: Deploy to K8s
        run: |
          kubectl set image deployment/myapp myapp=myapp:${{ github.sha }}
```

---

## 2. Docker: Containerization Basics

**The Big Idea:** Package your app and all dependencies into a single **container** that runs anywhere.

### Dockerfile Anatomy

```dockerfile
# 1. Base Image (Node.js runtime)
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependency files FIRST (for layer caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm ci --only=production

# 5. Copy application code
COPY . .

# 6. Build (if needed)
RUN npm run build

# 7. Expose port
EXPOSE 3000

# 8. Start application
CMD ["node", "dist/index.js"]
```

### Multi-Stage Builds (Reduce Image Size)

```dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]

# Result: Final image only contains built code, not source files!
```

### Docker Compose (Local Development)

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Application
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://db:5432/mydb
    depends_on:
      - db
      - redis
  
  # Database
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: mydb
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data
  
  # Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  db-data:
```

**Usage:**
```bash
docker-compose up  # Start all services
```

---

## 3. Kubernetes (K8s): Orchestration at Scale

**The Big Idea:** Docker runs one container. Kubernetes manages **thousands** of containers across servers.

### Core Concepts

#### 1. Pod (Smallest Unit)
A group of containers that run together (usually just 1 container per pod).

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
  - name: myapp
    image: myapp:latest
    ports:
    - containerPort: 3000
```

#### 2. Deployment (Manages Pods)
Ensures N replicas of your pod are always running.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3  # Run 3 instances
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:v1.2.3
        ports:
        - containerPort: 3000
        resources:
          requests:  # Guaranteed resources
            memory: "256Mi"
            cpu: "500m"
          limits:    # Maximum allowed
            memory: "512Mi"
            cpu: "1000m"
```

**Imperative Commands:**
```bash
# Create deployment
kubectl create deployment myapp --image=myapp:latest

# Scale to 5 replicas
kubectl scale deployment myapp --replicas=5

# Update image (Rolling Update)
kubectl set image deployment/myapp myapp=myapp:v2.0.0

# Check status
kubectl get pods
kubectl describe deployment myapp
```

#### 3. Service (Networking)
Exposes pods to the network (inside or outside cluster).

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: LoadBalancer  # Exposes to internet
  selector:
    app: myapp  # Targets pods with this label
  ports:
  - port: 80          # External port
    targetPort: 3000  # Pod port
```

**Types:**
- **ClusterIP:** Internal only (default).
- **NodePort:** Exposes on each Node's IP.
- **LoadBalancer:** Cloud provider creates external Load Balancer.

#### 4. ConfigMap \u0026 Secrets
Store configuration separately from code.

```yaml
# ConfigMap (Non-sensitive)
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  API_URL: "https://api.example.com"
  LOG_LEVEL: "info"

---
# Secret (Sensitive, base64 encoded)
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQxMjM=  # "password123" in base64
```

**Using in Deployment:**
```yaml
containers:
- name: myapp
  image: myapp:latest
  env:
  - name: API_URL
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: API_URL
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: app-secrets
        key: DB_PASSWORD
```

#### 5. Ingress (Routing)
Manages external HTTP/HTTPS access.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
```

---

## 4. Deployment Strategies

### 1. Rolling Update (Default in K8s)
Update pods one-by-one. Zero downtime.

```
Old pods: [v1] [v1] [v1]
          [v1] [v1] [v2] ← Deploy v2
          [v1] [v2] [v2]
          [v2] [v2] [v2] ✅ Done
```

**Pros:** Safe, gradual.
**Cons:** Mixed versions running simultaneously.

### 2. Blue-Green Deployment
Run two identical environments. Switch traffic instantly.

```
Blue (v1) ← 100% traffic
Green (v2) ← 0% traffic (Deploy and test)
          ↓
Blue (v1) ← 0% traffic (Switch!)
Green (v2) ← 100% traffic ✅

If v2 has bugs, switch back to Blue instantly.
```

**Pros:** Instant rollback.
**Cons:** Requires 2x infrastructure.

### 3. Canary Deployment
Send 5% of traffic to new version. Monitor. Gradually increase.

```
v1: 95% traffic
v2:  5% traffic ← Deploy to small subset
    ↓ (Monitor errors/metrics)
v1: 50% traffic
v2: 50% traffic
    ↓
v1:  0% traffic
v2: 100% traffic ✅
```

**Pros:** Reduces blast radius of bugs.
**Cons:** More complex.

---

## 5. Cloud Services (AWS Basics)

### Compute Options

| Service | Description | Use Case |
| :--- | :--- | :--- |
| **EC2** | Virtual Machines | Full control, custom software |
| **Lambda** | Serverless Functions (pay per execution) | Event-driven tasks, APIs |
| **ECS/EKS** | Container Orchestration (Kubernetes) | Microservices at scale |
| **Fargate** | Serverless Containers (no server management) | Simple containerized apps |

### Storage Options

| Service | Type | Use Case |
| :--- | :--- | :--- |
| **S3** | Object Storage (Blob) | Images, videos, backups |
| **EBS** | Block Storage (Disk) | EC2 instance hard drives |
| **EFS** | File Storage (Network File System) | Shared files across servers |
| **RDS** | Managed SQL Database | PostgreSQL, MySQL |
| **DynamoDB** | NoSQL Database | High-scale key-value store |

### Example: Serverless Architecture (Lambda + API Gateway + DynamoDB)

```
User → API Gateway → Lambda Function → DynamoDB
       (HTTPS)       (Node.js code)    (NoSQL DB)
```

**Benefits:**
- Zero server management.
- Auto-scales to millions of requests.
- Pay only for execution time.

**Lambda Function Example:**
```javascript
// index.js
exports.handler = async (event) => {
  const userId = event.pathParameters.id;
  
  const result = await dynamoDB.get({
    TableName: 'Users',
    Key: { id: userId }
  }).promise();
  
  return {
    statusCode: 200,
    body: JSON.stringify(result.Item)
  };
};
```

---

## 6. Monitoring \u0026 Observability

**The Three Pillars:**
1. **Metrics:** Numerical data (CPU%, latency, request count)
2. **Logs:** Events (error messages, debug info)
3. **Traces:** Request journey across services

### 1. Metrics (Prometheus + Grafana)

**Prometheus:** Collects metrics.
**Grafana:** Visualizes metrics.

```javascript
// Instrument your code
const promClient = require('prom-client');

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration.labels(req.method, req.route.path, res.statusCode).observe(duration);
  });
  next();
});
```

**Key Metrics to Track:**
- **Request Rate:** Requests per second
- **Error Rate:** % of 5xx errors
- **Latency:** p50, p95, p99 response times
- **Saturation:** CPU, Memory, Disk usage

### 2. Logs (ELK Stack: Elasticsearch + Logstash + Kibana)

**Structured Logging:**
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.json(),  // JSON for easy parsing
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.info('User logged in', { userId: 123, ip: '192.168.1.1' });
logger.error('Database connection failed', { error: err.message });
```

### 3. Distributed Tracing (Jaeger, OpenTelemetry)

**Problem:** Request touches 5 microservices. Where is the slowness?

**Solution:** Trace the request path.

```
API Gateway → Auth Service (50ms)
           → User Service (200ms) ← SLOW!
           → Order Service (30ms)
Total: 280ms
```

---

## 7. Security Best Practices

### 1. Secrets Management
```bash
# ❌ Bad: Hardcoded in code
const apiKey = "sk-1234567890";

# ✅ Good: Environment Variables
const apiKey = process.env.API_KEY;

# ✅ Better: Secrets Manager (AWS Secrets Manager, HashiCorp Vault)
const secret = await secretsManager.getSecretValue({ SecretId: 'prod/api-key' });
```

### 2. Network Security (VPC, Security Groups)
```
Internet → Load Balancer (Public Subnet)
         → App Servers (Private Subnet, no direct internet access)
         → Database (Private Subnet, only accessible by app servers)
```

### 3. Least Privilege (IAM Policies)
```json
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject",
    "s3:PutObject"
  ],
  "Resource": "arn:aws:s3:::my-bucket/*"
}
```
**Rule:** Grant only the permissions needed. Not `"s3:*"`.

---

## 8. Interview Checklist: DevOps

- [ ] Explain a typical CI/CD pipeline with stages.
- [ ] What is the difference between a Docker image and a container?
- [ ] How do you reduce Docker image size? (Multi-stage builds)
- [ ] Explain Kubernetes Pods, Deployments, and Services.
- [ ] What is the difference between Rolling Update and Blue-Green deployment?
- [ ] How do you handle secrets in Kubernetes? (Secrets, not ConfigMaps)
- [ ] What are the three pillars of observability? (Metrics, Logs, Traces)
- [ ] How would you debug a slow API endpoint in production? (Tracing, Logs, Metrics)
