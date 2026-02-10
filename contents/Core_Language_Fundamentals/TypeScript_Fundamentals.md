# TypeScript Fundamentals for Interviews

TypeScript is just JavaScript with **Rules**. It stops you from making silly mistakes before you run the code.

---

## 1. Types vs Interfaces

**The Big Idea:** Both describe the "Shape" of an object. They are 95% the same.

*   **Interface:** Better for Objects. Can be extended (merged).
*   **Type:** Better for complex combinations (Unions, Tuples).

### ✅ When to use Interface
Use for **Objects** and **Classes**.
```typescript
interface User {
  name: string;
  age: number;
}

// Interfaces can MERGE (Cool feature!)
interface User {
  email: string;
}
// Now User has name, age, AND email.
```

### ✅ When to use Type
Use for **Unions** or **Primitives**.
```typescript
// "Status can ONLY be one of these three strings"
type Status = "loading" | "success" | "error"; 

type ID = string | number;
```

---

## 2. Generics (The "Box" Analogy)

**The Big Idea:** Writing code that works with **any** type, without losing safety.

Think of a Generic as a **Variable for Types**. Instead of passing a value (like `5`), you pass a type (like `number`).

### Without Generics (Bad) ❌
```typescript
function wrapInArray(item: any): any[] {
  return [item];
}
const num = wrapInArray(5); // TS doesn't know this is a number array. It's 'any'.
```

### With Generics (Good) ✅
```typescript
function wrapInArray<T>(item: T): T[] {
  return [item];
}

const num = wrapInArray<number>(5); // TS knows this is number[]
const str = wrapInArray<string>("hello"); // TS knows this is string[]
```
*   `T` is just a placeholder name (like `x` in algebra). You can name it anything.

---

## 3. Union `|` & Intersection `&`

**The Big Idea:** Mixing and matching types.

*   **Union (`|`):** OR. "It can be this **OR** that."
*   **Intersection (`&`):** AND. "It must be this **AND** that combined."

### Example
```typescript
type Draggable = { drag: () => void };
type Resizable = { resize: () => void };

// Union: Can be EITHER
type UIWidget = Draggable | Resizable; 

// Intersection: Must have BOTH
type SuperWidget = Draggable & Resizable;
```

---

## 4. `any` vs `unknown`

**The Big Idea:** How to handle "I don't know what this is yet".

*   **`any`:** "I don't care. Turn off type checking." (Dangerous! Avoid.)
*   **`unknown`:** "I don't know yet. I must check before using it." (Safe.)

### ❌ The Danger of `any`
```typescript
let value: any = "hello";
value.toFixed(); // 💥 CRASH! Strings don't have toFixed(), but TS won't warn you.
```

### ✅ The Safety of `unknown`
```typescript
let value: unknown = "hello";

// value.toUpperCase(); // ❌ TS Error: "Object is of type 'unknown'."

if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Safe! TS knows it's a string now.
}
```

---

## 5. Utility Types (Built-in Helpers)

TypeScript gives you tools to transform types so you don't have to rewrite them.

### `Partial<T>`
Makes all properties optional.
```typescript
interface User {
  id: number;
  name: string;
}

// Good for "Update" functions where you might only send the name
function updateUser(id: number, changes: Partial<User>) { ... }
```

### `Pick<T, Keys>`
Pick only the fields you need.
```typescript
// Only need the name from User
type UserNameOnly = Pick<User, "name">; // { name: string }
```

### `Omit<T, Keys>`
Remove the fields you don't need.
```typescript
// Remove 'id' from User (Good for creating new users)
type NewUser = Omit<User, "id">; // { name: string }
```

### `Record<Key, Value>`
Create an object map easily.
```typescript
// An object where keys are strings and values are numbers
const salaries: Record<string, number> = {
  "Alice": 50000,
  "Bob": 60000
};
```

---

## 6. Type Narrowing (Type Guards)

**The Big Idea:** Teaching TypeScript to be smarter about what a variable is *right now*.

```typescript
function printID(id: string | number) {
  // TS: id could be string OR number here.
  
  if (typeof id === "string") {
    // TS: I know 'id' is a string here!
    console.log(id.toUpperCase()); 
  } else {
    // TS: I know 'id' MUST be a number here!
    console.log(id.toFixed(2));
  }
}
```

---

## 7. Advanced Types (Senior Level)

### Conditional Types
**Use Case:** Create types that depend on conditions.

```typescript
// "If T is string, return number, else return string"
type IsString<T> = T extends string ? number : string;

type A = IsString<string>;  // number
type B = IsString<number>;  // string

// Real-World: Extract return type of Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnwrapPromise<Promise<string>>;  // string
type Result2 = UnwrapPromise<number>;  // number
```

### Mapped Types
**Use Case:** Transform all properties of a type.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Make all properties readonly
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Make all properties nullable
type NullableUser = {
  [K in keyof User]: User[K] | null;
};

// Built-in version: Readonly<T>
type ReadonlyUser = Readonly<User>;
```

### Template Literal Types
**Use Case:** Strongly-typed string patterns.

```typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type APIPath = '/users' | '/posts' | '/comments';

// Combine to create all possible routes
type APIRoute = `${HTTPMethod} ${APIPath}`;
// "GET /users" | "POST /users" | "GET /posts" | ...

// Practical Example: CSS properties
type CSSUnit = 'px' | 'em' | 'rem' | '%';
type Spacing = `${number}${CSSUnit}`;

const margin: Spacing = '16px';  // ✅
const padding: Spacing = '2em';  // ✅
// const invalid: Spacing = '10';  // ❌ Error
```

---

## 8. TypeScript Strictness (Why It Matters)

### tsconfig.json - The Strict Settings

```json
{
  "compilerOptions": {
    "strict": true,  // Enable all strict checks
    "noImplicitAny": true,  // Error on 'any' type inference
    "strictNullChecks": true,  // null/undefined are NOT assignable to other types
    "strictFunctionTypes": true,  // Function params are checked contravariantly
    "strictPropertyInitialization": true  // Class properties must be initialized
  }
}
```

### Why Strictness Saves You in Production

```typescript
// Without strictNullChecks
function getLength(str: string) {
  return str.length;
}
getLength(null);  // 💥 Runtime error!

// With strictNullChecks
function getLength(str: string | null) {
  if (str === null) {
    return 0;
  }
  return str.length;  // ✅ Safe
}
```

---

## 9. Decorators (Experimental - Used in Nest.js, Angular)

**The Big Idea:** Add metadata or modify classes/methods at runtime.

```typescript
// Class Decorator
function Logger(constructor: Function) {
  console.log(`Creating instance of ${constructor.name}`);
}

@Logger
class User {
  constructor(public name: string) {}
}

// Method Decorator (Logging)
function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3);  // Logs: "Calling add with args: [2, 3]"
```

**Real-World Example (Nest.js):**
```typescript
@Controller('users')  // Decorator defines route
export class UserController {
  @Get(':id')  // Decorator defines HTTP method
  findOne(@Param('id') id: string) {
    return `User ${id}`;
  }
}
```

---

## 10. Common TypeScript Mistakes

### ❌ Mistake 1: Using `any` Everywhere
```typescript
// Bad: Defeats the purpose of TypeScript
function process(data: any) {  // ❌
  return data.value.toUpperCase();  // No safety!
}

// Good: Use proper types or generics
function process<T extends { value: string }>(data: T) {  // ✅
  return data.value.toUpperCase();
}
```

### ❌ Mistake 2: Type Assertions Without Verification
```typescript
// Bad: Dangerous assertion
const user = getUserData() as User;  // ❌ What if it's not a User?
user.email.toLowerCase();  // 💥 Crash if email doesn't exist

// Good: Type guard
function isUser(obj: any): obj is User {
  return obj && typeof obj.email === 'string';
}

const data = getUserData();
if (isUser(data)) {  // ✅ Safe
  data.email.toLowerCase();
}
```

### ❌ Mistake 3: Ignoring `strictNullChecks`
```typescript
// With strictNullChecks off (Bad)
interface User {
  name: string;
  age?: number;  // Optional
}

function logAge(user: User) {
  console.log(user.age.toFixed(2));  // 💥 Crash if age is undefined
}

// With strictNullChecks on (Good)
function logAge(user: User) {
  if (user.age !== undefined) {  // ✅ Safe
    console.log(user.age.toFixed(2));
  }
}
```

---

## 11. TypeScript vs JavaScript: When to Use TypeScript

| Scenario | Use TypeScript | Use JavaScript |
| :--- | :---: | :---: |
| **Large codebase** (10k+ lines) | ✅ | ❌ |
| **Team of 5+ developers** | ✅ | ❌ |
| **Frequent refactoring** | ✅ | ❌ |
| **Quick prototype/script** | ❌ | ✅ |
| **Learning React basics** | ❌ | ✅ |
| **Production application** | ✅ | ⚠️ |

**Senior Take:** In professional environments, TypeScript is the default. The upfront cost of type definitions pays off massively in maintenance.

---

## 12. Interview Checklist: TypeScript

- [ ] **Types vs Interfaces:** Explain when to use each (with examples)
- [ ] **Generics:** Write a generic function with constraints (`<T extends ...>`)
- [ ] **`any` vs `unknown`:** Explain safety implications
- [ ] **Utility Types:** Use `Partial`, `Pick`, `Omit`, `Record` in real scenarios
- [ ] **Type Narrowing:** Implement a type guard function
- [ ] **Conditional Types:** Explain `T extends U ? X : Y`
- [ ] **Strictness:** Why is `strictNullChecks` important?

### Coding Challenges to Practice

1. **Implement `Readonly<T>` utility type from scratch**
2. **Create a type-safe event emitter** (with typed events)
3. **Build a type-safe API client** (with method chaining)
4. **Implement `DeepPartial<T>`** (recursive Partial for nested objects)

### Interview Red Flags

❌ Overusing `any` type  
❌ Using `as` assertions without verification  
❌ Not understanding the difference between Types and Interfaces  
❌ Disabling strict mode without good reason  
❌ Can't explain what generics solve  

---

## 13. Quick Reference: Must-Know Concepts

```typescript
// 1. Basic Types
let name: string = "Alice";
let age: number = 25;
let active: boolean = true;

// 2. Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b"];

// 3. Objects
let user: { name: string; age: number } = { name: "Alice", age: 25 };

// 4. Functions
function greet(name: string): string {
  return `Hello ${name}`;
}

// 5. Union Types
let id: string | number = 123;

// 6. Type Aliases
type ID = string | number;

// 7. Interfaces
interface User {
  name: string;
  age: number;
}

// 8. Generics
function identity<T>(value: T): T {
  return value;
}

// 9. Enums
enum Status {
  Loading,
  Success,
  Error
}

// 10. Tuple
let tuple: [string, number] = ["Alice", 25];
```

---

**Final Tip:** TypeScript is not about writing more code—it's about catching bugs **before** they reach production. The stricter your types, the safer your code. Embrace the errors; they're helping you!
