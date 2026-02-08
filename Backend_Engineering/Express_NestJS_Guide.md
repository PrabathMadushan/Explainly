# Express & Nest.js: Framework Comparison Guide

This guide compares Express (minimalist) vs Nest.js (enterprise-grade), helping you choose the right tool and master both.

---

## 1. Express.js: The Minimalist Approach

**Philosophy:** Unopinionated. You build your own structure.

### Core Concepts

#### Middleware Pipeline

Everything in Express is **middleware** - functions that process requests in sequence.

```javascript
const express = require('express');
const app = express();

// Middleware 1: Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // Pass to next middleware
});

// Middleware 2: JSON Parser
app.use(express.json());

// Route Handler (also middleware!)
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// Error Handler (Must have 4 parameters!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(3000);
```

**Request Flow:** 
```
Request → Middleware 1 → Middleware 2 → Route Handler → Error Handler → Response
```

#### RESTful Routing

```javascript
const userRouter = express.Router();

userRouter.get('/', getAllUsers);       // GET /users
userRouter.post('/', createUser);       // POST /users
userRouter.get('/:id', getUser);        // GET /users/123
userRouter.put('/:id', updateUser);     // PUT /users/123
userRouter.delete('/:id', deleteUser);  // DELETE /users/123

app.use('/users', userRouter);
```

#### Async Error Handling (The Trap!)

```javascript
// ❌ Bad: Errors in async functions don't get caught by Express
app.get('/users', async (req, res) => {
  const users = await db.getUsers();  // If this throws, Express won't catch it!
  res.json(users);
});

// ✅ Good: Wrap in try/catch
app.get('/users', async (req, res, next) => {
  try {
    const users = await db.getUsers();
    res.json(users);
  } catch (error) {
    next(error);  // Pass to error handler
  }
});

// ✅ Better: Use a wrapper utility
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
}));
```

---

## 2. Nest.js: The Enterprise Framework

**Philosophy:** Opinionated, TypeScript-first, inspired by Angular. Built on top of Express (or Fastify).

### Why Nest.js?

1. **Scalability:** Clear architecture (Modules, Controllers, Services).
2. **Testability:** Dependency Injection makes mocking easy.
3. **Consistency:** Team members know where to put code.
4. **Built-in Features:** Validation, Authentication, WebSockets, Microservices.

### Core Concepts

#### 1. Modules (Organizing Code)

```typescript
// user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],  // Other modules can use UserService
})
export class UserModule {}
```

**Mental Model:** A Module is like a **box** containing related controllers and services. It keeps things organized.

#### 2. Controllers (Handling Requests)

```typescript
// user.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')  // Base route: /users
export class UserController {
  // Dependency Injection: Nest automatically provides UserService
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
```

**vs Express:**
```javascript
// Express equivalent
app.get('/users', async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
});
```

#### 3. Services (Business Logic)

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()  // Makes this class injectable
export class UserService {
  private users = [];

  findAll() {
    return this.users;
  }

  findById(id: string) {
    return this.users.find(u => u.id === id);
  }

  create(userData) {
    this.users.push(userData);
    return userData;
  }
}
```

**Why separate Controllers and Services?**
- **Controller:** Handles HTTP (request/response).
- **Service:** Pure business logic (testable without HTTP!).

---

## 3. Request Lifecycle in Nest.js

The order matters! Understand this for interviews.

```
1. Middleware       (Logging, CORS)
         ↓
2. Guards           (Authentication: "Is the user logged in?")
         ↓
3. Interceptors     (Before) (Transform request, caching)
         ↓
4. Pipes            (Validation: "Is the email valid?")
         ↓
5. Route Handler    (Controller method)
         ↓
6. Interceptors     (After) (Transform response, logging)
         ↓
7. Response
```

### Example: Complete Request Flow

```typescript
// 1. Middleware
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
  }
}

// 2. Guard (Authentication)
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers.authorization === 'Bearer secret-token';
  }
}

// 4. Pipe (Validation)
export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

// 5. Controller with all layers
@Controller('users')
@UseGuards(AuthGuard)  // Protect all routes in this controller
@UseInterceptors(LoggingInterceptor)
export class UserController {
  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
```

---

## 4. Dependency Injection Explained

**The Problem (Without DI):**
```typescript
// Hard to test: UserService is tightly coupled to Database
class UserService {
  private db = new Database();  // ❌ Hard-coded dependency

  getUsers() {
    return this.db.query('SELECT * FROM users');
  }
}
```

**The Solution (With DI):**
```typescript
// UserService receives Database from outside (injected)
@Injectable()
class UserService {
  constructor(private db: Database) {}  // ✅ Injected dependency

  getUsers() {
    return this.db.query('SELECT * FROM users');
  }
}

// In tests, we can inject a MOCK database!
const mockDb = { query: jest.fn() };
const service = new UserService(mockDb);
```

**How Nest Does It Automatically:**
```typescript
@Module({
  providers: [UserService, Database],  // Nest creates instances
})
```

---

## 5. Advanced Patterns

### Global Error Handling

```typescript
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()  // Catch all exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus?.() || 500;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}

// Apply globally
app.useGlobalFilters(new AllExceptionsFilter());
```

### Custom Decorators

```typescript
// Extract user from request
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;  // Assume middleware sets this
  },
);

// Usage
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return user;
}
```

### Interceptors (Caching Example)

```typescript
import { Injectable, NestInterceptor } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map();

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const key = request.url;

    if (this.cache.has(key)) {
      return of(this.cache.get(key));  // Return cached response
    }

    return next.handle().pipe(
      tap(response => this.cache.set(key, response))
    );
  }
}
```

---

## 6. Microservices Architecture

Nest.js makes it easy to switch from a monolith to microservices.

### Monolith (Standard)
```typescript
@Get('users')
getUsers() {
  return this.userService.findAll();
}
```

### Microservice (Message Pattern)
```typescript
// user-service (Microservice)
@MessagePattern({ cmd: 'get_users' })
getUsers() {
  return this.userService.findAll();
}

// API Gateway (Client)
@Get('users')
async getUsers() {
  return this.client.send({ cmd: 'get_users' }, {});
}
```

**Transports:** TCP, Redis, RabbitMQ, MQTT, gRPC.

---

## 7. Comparison Table: Express vs Nest.js

| Feature | Express | Nest.js |
| :--- | :--- | :--- |
| **Philosophy** | Minimalist, DIY | Opinionated, Convention over Configuration |
| **TypeScript** | Optional | First-class support |
| **Structure** | You decide | Modules, Controllers, Services |
| **Validation** | Manual (express-validator) | Built-in (class-validator) |
| **Dependency Injection** | No | Yes (Angular-style) |
| **Testing** | Manual setup | Built-in test utilities |
| **Microservices** | Manual | Built-in support |
| **Learning Curve** | Low | Medium (but scales better) |
| **Best For** | MVPs, small APIs | Large teams, enterprise apps |

---

## 8. Interview Checklist

- [ ] Explain the middleware pipeline in Express.
- [ ] What is Dependency Injection and why is it useful?
- [ ] Walk through the Nest.js request lifecycle (Middleware → Guards → Pipes → Controller).
- [ ] How would you implement authentication in Express vs Nest.js?
- [ ] What is the purpose of Interceptors in Nest.js?
- [ ] How do you handle errors in async Express routes?
