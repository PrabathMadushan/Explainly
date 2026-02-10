# Design Patterns \u0026 SOLID Principles: The Complete Guide

This guide covers essential design patterns and principles that make code maintainable, testable, and scalable.

---

## 1. SOLID Principles

### S - Single Responsibility Principle (SRP)

**Rule:** A class/function should have **one reason to change**.

#### ❌ Bad: Multiple Responsibilities
```typescript
class User {
  constructor(public name: string, public email: string) {}
  
  // Responsibility 1: User data
  save() {
    // Save to database
  }
  
  // Responsibility 2: Email notifications
  sendWelcomeEmail() {
    // Send email
  }
  
  // Responsibility 3: Reporting
  generateReport() {
    // Generate PDF
  }
}
```

**Problem:** If email service changes, we modify the User class. If reporting format changes, we modify the User class. Too many reasons to change!

#### ✅ Good: Single Responsibility
```typescript
class User {
  constructor(public name: string, public email: string) {}
}

class UserRepository {
  save(user: User) {
    // Database logic only
  }
}

class EmailService {
  sendWelcomeEmail(user: User) {
    // Email logic only
  }
}

class ReportGenerator {
  generateUserReport(user: User) {
    // Report logic only
  }
}
```

---

### O - Open/Closed Principle (OCP)

**Rule:** Open for **extension**, closed for **modification**.

#### ❌ Bad: Modifying Existing Code
```typescript
class PaymentProcessor {
  processPayment(type: string, amount: number) {
    if (type === 'credit-card') {
      // Process credit card
    } else if (type === 'paypal') {
      // Process PayPal
    } else if (type === 'crypto') {  // ← Adding crypto requires modifying this class
      // Process crypto
    }
  }
}
```

#### ✅ Good: Extending with New Classes
```typescript
interface PaymentMethod {
  process(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
  process(amount: number) {
    console.log(`Processing $${amount} via Credit Card`);
  }
}

class PayPalPayment implements PaymentMethod {
  process(amount: number) {
    console.log(`Processing $${amount} via PayPal`);
  }
}

class CryptoPayment implements PaymentMethod {  // ← New class, no modification to existing code
  process(amount: number) {
    console.log(`Processing $${amount} via Crypto`);
  }
}

class PaymentProcessor {
  processPayment(method: PaymentMethod, amount: number) {
    method.process(amount);
  }
}
```

---

### L - Liskov Substitution Principle (LSP)

**Rule:** Subtypes must be substitutable for their base types.

#### ❌ Bad: Subtype Breaks Contract
```typescript
class Bird {
  fly() {
    console.log('Flying...');
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error('Penguins cannot fly!');  // ❌ Violates LSP
  }
}

function makeBirdFly(bird: Bird) {
  bird.fly();  // Crashes if bird is a Penguin!
}
```

#### ✅ Good: Proper Abstraction
```typescript
class Bird {
  move() {
    console.log('Moving...');
  }
}

class Sparrow extends Bird {
  move() {
    console.log('Flying...');
  }
}

class Penguin extends Bird {
  move() {
    console.log('Swimming...');
  }
}
```

---

### I - Interface Segregation Principle (ISP)

**Rule:** Don't force clients to depend on interfaces they don't use.

#### ❌ Bad: Fat Interface
```typescript
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class HumanWorker implements Worker {
  work() { console.log('Working'); }
  eat() { console.log('Eating'); }
  sleep() { console.log('Sleeping'); }
}

class RobotWorker implements Worker {
  work() { console.log('Working'); }
  eat() { throw new Error('Robots do not eat'); }  // ❌ Forced to implement
  sleep() { throw new Error('Robots do not sleep'); }  // ❌ Forced to implement
}
```

#### ✅ Good: Small, Specific Interfaces
```typescript
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class HumanWorker implements Workable, Eatable, Sleepable {
  work() { console.log('Working'); }
  eat() { console.log('Eating'); }
  sleep() { console.log('Sleeping'); }
}

class RobotWorker implements Workable {
  work() { console.log('Working'); }
}
```

---

### D - Dependency Inversion Principle (DIP)

**Rule:** Depend on **abstractions**, not **concrete implementations**.

#### ❌ Bad: Tight Coupling
```typescript
class MySQLDatabase {
  save(data: string) {
    console.log('Saving to MySQL:', data);
  }
}

class UserService {
  private db = new MySQLDatabase();  // ❌ Tightly coupled to MySQL
  
  saveUser(user: string) {
    this.db.save(user);
  }
}
```

**Problem:** Can't easily switch to PostgreSQL or MongoDB. Hard to test (must connect to real MySQL).

#### ✅ Good: Depend on Abstraction
```typescript
interface Database {
  save(data: string): void;
}

class MySQLDatabase implements Database {
  save(data: string) {
    console.log('Saving to MySQL:', data);
  }
}

class PostgreSQLDatabase implements Database {
  save(data: string) {
    console.log('Saving to PostgreSQL:', data);
  }
}

class UserService {
  constructor(private db: Database) {}  // ✅ Depends on interface, not concrete class
  
  saveUser(user: string) {
    this.db.save(user);
  }
}

// Usage
const userService = new UserService(new MySQLDatabase());  // Easy to swap!

// Testing
const mockDB = { save: jest.fn() };
const testService = new UserService(mockDB);  // Easy to test!
```

---

## 2. Creational Patterns

### Singleton Pattern

**Use Case:** Ensure only **one instance** exists (Database connection, Logger).

#### Implementation
```typescript
class DatabaseConnection {
  private static instance: DatabaseConnection;
  
  private constructor() {
    // Private constructor prevents direct instantiation
    console.log('Database connected');
  }
  
  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
  
  query(sql: string) {
    console.log('Executing:', sql);
  }
}

// Usage
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2);  // true (same instance!)
```

**⚠️ Caution:** Singletons make testing harder (global state). Use Dependency Injection instead when possible.

---

### Factory Pattern

**Use Case:** Create objects without specifying exact class.

```typescript
interface Transport {
  deliver(): void;
}

class Truck implements Transport {
  deliver() {
    console.log('Delivering by land');
  }
}

class Ship implements Transport {
  deliver() {
    console.log('Delivering by sea');
  }
}

class Logistics {
  static createTransport(type: string): Transport {
    if (type === 'land') {
      return new Truck();
    } else if (type === 'sea') {
      return new Ship();
    }
    throw new Error('Unknown transport type');
  }
}

// Usage
const transport = Logistics.createTransport('sea');
transport.deliver();  // "Delivering by sea"
```

---

### Builder Pattern

**Use Case:** Construct complex objects step-by-step.

```typescript
class Pizza {
  size: string = '';
  cheese: boolean = false;
  pepperoni: boolean = false;
  veggies: boolean = false;
}

class PizzaBuilder {
  private pizza = new Pizza();
  
  setSize(size: string) {
    this.pizza.size = size;
    return this;  // Return 'this' for chaining
  }
  
  addCheese() {
    this.pizza.cheese = true;
    return this;
  }
  
  addPepperoni() {
    this.pizza.pepperoni = true;
    return this;
  }
  
  addVeggies() {
    this.pizza.veggies = true;
    return this;
  }
  
  build(): Pizza {
    return this.pizza;
  }
}

// Usage (Fluent API)
const myPizza = new PizzaBuilder()
  .setSize('large')
  .addCheese()
  .addPepperoni()
  .build();
```

---

## 3. Structural Patterns

### Adapter Pattern

**Use Case:** Make incompatible interfaces work together (wrapping 3rd party libraries).

```typescript
// Old API
class OldPaymentGateway {
  makePayment(amount: number) {
    console.log(`Old API: Paid $${amount}`);
  }
}

// New Interface
interface ModernPaymentProcessor {
  processPayment(amount: number, currency: string): void;
}

// Adapter
class PaymentAdapter implements ModernPaymentProcessor {
  constructor(private oldGateway: OldPaymentGateway) {}
  
  processPayment(amount: number, currency: string) {
    // Convert new interface to old API
    console.log(`Converting ${currency} to USD`);
    this.oldGateway.makePayment(amount);
  }
}

// Usage
const oldAPI = new OldPaymentGateway();
const adapter = new PaymentAdapter(oldAPI);
adapter.processPayment(100, 'EUR');
```

---

### Decorator Pattern

**Use Case:** Add behavior to objects dynamically (Higher-Order Components in React).

```typescript
interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost() {
    return 5;
  }
  description() {
    return 'Simple coffee';
  }
}

// Decorator
class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  
  cost() {
    return this.coffee.cost() + 2;
  }
  description() {
    return this.coffee.description() + ', milk';
  }
}

class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  
  cost() {
    return this.coffee.cost() + 1;
  }
  description() {
    return this.coffee.description() + ', sugar';
  }
}

// Usage
let myCoffee: Coffee = new SimpleCoffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);

console.log(myCoffee.description());  // "Simple coffee, milk, sugar"
console.log(myCoffee.cost());  // 8
```

**Real-World Example: Nest.js Decorators**
```typescript
@Controller('users')  // Decorator adds routing metadata
@UseGuards(AuthGuard)  // Decorator adds authentication
export class UserController {}
```

---

### Proxy Pattern

**Use Case:** Control access to an object (Lazy loading, caching, access control).

```typescript
interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private filename: string) {
    this.loadFromDisk();
  }
  
  loadFromDisk() {
    console.log(`Loading ${this.filename} from disk...`);
  }
  
  display() {
    console.log(`Displaying ${this.filename}`);
  }
}

class ProxyImage implements Image {
  private realImage?: RealImage;
  
  constructor(private filename: string) {}
  
  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);  // Lazy load
    }
    this.realImage.display();
  }
}

// Usage
const image = new ProxyImage('photo.jpg');
// No loading yet!
image.display();  // Loads now
image.display();  // Uses cached version
```

---

## 4. Behavioral Patterns

### Observer Pattern

**Use Case:** Event handling, Pub/Sub systems (EventEmitter in Node.js, RxJS).

```typescript
class Subject {
  private observers: Observer[] = [];
  
  subscribe(observer: Observer) {
    this.observers.push(observer);
  }
  
  notify(data: any) {
    this.observers.forEach(observer => observer.update(data));
  }
}

interface Observer {
  update(data: any): void;
}

class EmailNotifier implements Observer {
  update(data: any) {
    console.log(`Email sent: ${data}`);
  }
}

class SMSNotifier implements Observer {
  update(data: any) {
    console.log(`SMS sent: ${data}`);
  }
}

// Usage
const orderPlaced = new Subject();
orderPlaced.subscribe(new EmailNotifier());
orderPlaced.subscribe(new SMSNotifier());

orderPlaced.notify('Order #123 confirmed');
// Output:
// Email sent: Order #123 confirmed
// SMS sent: Order #123 confirmed
```

---

### Strategy Pattern

**Use Case:** Switch algorithms at runtime (Payment gateways, sorting algorithms).

```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardStrategy implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid $${amount} with Credit Card`);
  }
}

class PayPalStrategy implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid $${amount} with PayPal`);
  }
}

class ShoppingCart {
  private strategy?: PaymentStrategy;
  
  setPaymentStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }
  
  checkout(amount: number) {
    if (!this.strategy) {
      throw new Error('Payment strategy not set');
    }
    this.strategy.pay(amount);
  }
}

// Usage
const cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardStrategy());
cart.checkout(100);

cart.setPaymentStrategy(new PayPalStrategy());
cart.checkout(200);
```

---

### Command Pattern

**Use Case:** Encapsulate requests as objects (Undo/Redo, Redux Actions).

```typescript
interface Command {
  execute(): void;
  undo(): void;
}

class Light {
  on() {
    console.log('Light is ON');
  }
  off() {
    console.log('Light is OFF');
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  
  execute() {
    this.light.on();
  }
  
  undo() {
    this.light.off();
  }
}

class RemoteControl {
  private history: Command[] = [];
  
  executeCommand(command: Command) {
    command.execute();
    this.history.push(command);
  }
  
  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

// Usage
const light = new Light();
const remote = new RemoteControl();

remote.executeCommand(new LightOnCommand(light));  // ON
remote.undo();  // OFF
```

---

## 5. Interview Checklist: Design Patterns

- [ ] Explain the Single Responsibility Principle with an example.
- [ ] When would you use a Singleton? Why is it considered an anti-pattern in some cases?
- [ ] What is the difference between Strategy and Factory patterns?
- [ ] How does the Decorator pattern work? (Relate to React HOCs)
- [ ] Explain Dependency Injection and its benefits.
- [ ] What is the Observer pattern? (Relate to EventEmitter, Redux)
