# JavaScript Fundamentals for Interviews

This guide uses **simple English** and **clear examples** to explain the most important concepts you need for a Senior Engineer interview.

---

## 1. Variables & Scoping (`var` vs `let` vs `const`)

**The Big Idea:** How long does a variable live, and where can I see it?

*   **Scope:** The area in code where a variable is visible.
*   **Hoisting:** JavaScript moves declarations to the top before running code.

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function Scope (Visible inside the whole function) | Block Scope (Visible only inside `{ }`) | Block Scope (Visible only inside `{ }`) |
| **Can change?** | Yes | Yes | No (But objects inside can change) |
| **Hoisting** | Yes (Initialized as `undefined`) | Yes (But strictly unreachable - "Temporal Dead Zone") | Yes (Strictly unreachable) |

### ❌ Bad Example (Using `var`)
```javascript
if (true) {
  var x = 10;
}
console.log(x); // Outputs: 10 (Leaked out of the if block!)
```

### ✅ Good Example (Using `let` / `const`)
```javascript
if (true) {
  let y = 10;
}
console.log(y); // Error: y is not defined (Safe!)
```

---

## 2. Closures

**The Big Idea:** A function remembers variables from where it was created, even after that place is gone.

Think of it like a **Backpack**. When a function is created, it takes a backpack with all the variables around it. It keeps this backpack forever.

### Why is it useful?
1.  **Data Privacy:** Hiding variables so no one else can touch them.
2.  **Factory Functions:** Creating functions with specific settings.

### Example: Private Counter
```javascript
function createCounter() {
  let count = 0; // 🔒 This variable is private inside the closure

  return {
    increment: () => {
      count++;
      return count;
    },
    getCount: () => count
  };
}

const myCounter = createCounter();
console.log(myCounter.increment()); // 1
console.log(myCounter.increment()); // 2
// console.log(myCounter.count); // ❌ Undefined (Cannot access directly)
```

---

## 3. The `this` Keyword

**The Big Idea:** `this` changes based on **who called the function**.

1.  **Global Context:** `this` is the global object (window).
2.  **Object Method:** `this` is the object itself.
3.  **Arrow Function:** `this` is **stuck** from where it was created (lexical). It does not care who calls it.

### Example: Arrow vs Regular Function

```javascript
const user = {
  name: "Alice",
  
  // Regular function: 'this' depends on who calls it
  sayHi: function() {
    console.log("Hi, I am " + this.name);
  },

  // Arrow function: 'this' comes from the outside (Global/Window)
  sayHiArrow: () => {
    console.log("Hi, I am " + this.name);
  }
};

user.sayHi();      // ✅ "Hi, I am Alice" (Called by user)
user.sayHiArrow(); // ❌ "Hi, I am undefined" (Arrow functions don't have their own 'this')
```

---

## 4. The Event Loop (How JS works)

**The Big Idea:** JavaScript can only do **one thing at a time** (Single Threaded). But it can cheat by offloading tasks (like timers or API calls) to the browser.

### The Actors:
1.  **Call Stack:** The "To-Do Now" list. JS executes whatever is here immediately.
2.  **Web APIs:** The "Waiting Room". Timers (`setTimeout`) and API calls wait here.
3.  **Queue:** The "Line to get back in". When a timer finishes, it stands in line here.
4.  **Event Loop:** The "Bouncer". It checks: **Is the Call Stack empty?** If yes, let the first person in the Queue into the Stack.

### Interview Question: What is the order?
```javascript
console.log("1"); // Step 1: Goes to Stack -> Runs immediately

setTimeout(() => {
  console.log("2"); // Step 3: Goes to Web API -> Wait -> Queue
}, 0);

console.log("3"); // Step 2: Goes to Stack -> Runs immediately

// Output:
// 1
// 3
// 2  (Even with 0ms, it must wait for the Stack to be empty!)
```

---

## 5. Promises & Async/Await

**The Big Idea:** Handling things that take time (like fetching data) without freezing the app.

*   **Promise:** A receipt. "I don't have the data yet, but I promise to tell you when I do (Success) or if I fail (Error)."
*   **Async/Await:** A cleaner way to read Promises. It looks like normal synchronous code.

### Example: Fetching Data

```javascript
// Old way (Promise Chains) 😫
function getData() {
  fetch('/api/user')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

// New way (Async/Await) 🤩
async function getDataModern() {
  try {
    const response = await fetch('/api/user'); // "Pause here until done"
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
```

---

## 6. Equality (`==` vs `===`)

**The Big Idea:** Always check type AND value.

*   `==` (Loose Equality): Tries to **convert types** to match. (Dangerous!)
*   `===` (Strict Equality): Checks **Value** AND **Type**. (Safe!)

### Example
```javascript
console.log(5 == "5");  // ✅ True (String "5" becomes Number 5)
console.log(5 === "5"); // ❌ False (Number is not String)

console.log(null == undefined);  // ✅ True
console.log(null === undefined); // ❌ False
```

**Rule:** Always use `===`.

---

## 7. Prototypal Inheritance

**The Big Idea:** Objects can borrow methods from other objects.

In JavaScript, we don't strictly have "Classes" (until recently). We have a **Chain**. If you ask an object for a property, it looks at itself. If it doesn't have it, it looks at its parent (Prototype). Then the parent's parent.

### Example
```javascript
const animal = {
  eat: true
};

const rabbit = {
  jump: true
};

// Set rabbit's parent to animal
rabbit.__proto__ = animal; 

console.log(rabbit.jump); // True (Found in rabbit)
console.log(rabbit.eat);  // True (Not in rabbit, found in animal!)
```

---

## 8. Explicit `this` Binding (call, apply, bind)

**The Big Idea:** Manually control what `this` points to.

### `call()` - Invoke immediately with arguments individually
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, I am ${this.name}${punctuation}`);
}

const person = { name: 'Alice' };
greet.call(person, 'Hello', '!');  // "Hello, I am Alice!"
```

### `apply()` - Invoke immediately with arguments as array
```javascript
greet.apply(person, ['Hi', '?']);  // "Hi, I am Alice?"
```

### `bind()` - Create new function with fixed `this` (doesn't invoke)
```javascript
const greetAlice = greet.bind(person);
greetAlice('Hey', '.');  // "Hey, I am Alice."

// Practical Use Case: Event Handlers
class Counter {
  constructor() {
    this.count = 0;
    // Without bind, 'this' would be the button, not Counter!
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.count++;
    console.log(this.count);
  }
}
```

---

## 9. Array Methods (Essential for Interviews)

### Map, Filter, Reduce (The Holy Trinity)

```javascript
const numbers = [1, 2, 3, 4, 5];

// map: Transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter: Keep only elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce: Combine all elements into single value
const sum = numbers.reduce((total, n) => total + n, 0);
// 15
```

### Real Interview Question: Group by Property
```javascript
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' }
];

// Group by role
const grouped = users.reduce((acc, user) => {
  (acc[user.role] = acc[user.role] || []).push(user);
  return acc;
}, {});

// Result: { admin: [Alice, Charlie], user: [Bob] }
```

---

## 10. Debounce \u0026 Throttle (Performance Patterns)

### Debounce: Wait until action stops
**Use Case:** Search input (don't search on every keystroke, wait until user stops typing)

```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);  // Cancel previous timer
    timeoutId = setTimeout(() => {
      func.apply(this, args);  // Execute after delay
    }, delay);
  };
}

// Usage
const searchAPI = debounce((query) => {
  console.log('Searching for:', query);
}, 500);  // Wait 500ms after last keystroke

searchAPI('a');
searchAPI('ab');
searchAPI('abc');  // Only this executes (after 500ms)
```

### Throttle: Limit execution frequency
**Use Case:** Scroll events (execute at most once every N milliseconds)

```javascript
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const handleScroll = throttle(() => {
  console.log('Scroll event');
}, 1000);  // Execute at most once per second

window.addEventListener('scroll', handleScroll);
```

---

## 11. Common Interview Mistakes \u0026 Red Flags

### ❌ Mistake 1: Mutating Arrays
```javascript
// Bad: Mutates original array
const nums = [1, 2, 3];
nums.push(4);  // ❌ Original array changed

// Good: Immutable operations
const newNums = [...nums, 4];  // ✅ Creates new array
```

### ❌ Mistake 2: Forgetting `return` in Arrow Functions
```javascript
// Bad: Returns undefined
const double = numbers.map(n => { n * 2 });  // ❌ Forgot return!

// Good: Implicit return (no braces) or explicit return
const double = numbers.map(n => n * 2);  // ✅
const double = numbers.map(n => { return n * 2 });  // ✅
```

### ❌ Mistake 3: Not Understanding Falsy Values
```javascript
// Falsy values: false, 0, "", null, undefined, NaN

const count = 0;
if (count) {  // ❌ This won't execute! 0 is falsy
  console.log('Has count');
}

// Good: Explicit check
if (count !== undefined) {  // ✅
  console.log('Has count');
}
```

---

## 12. Interview Checklist: JavaScript

Interviewers expect you to explain these concepts clearly:

- [ ] **Scoping:** Explain `var` vs `let` vs `const` with hoisting examples
- [ ] **Closures:** Provide 3 real-world use cases (data privacy, partial application, memoization)
- [ ] **`this` keyword:** Explain all 4 binding rules (implicit, explicit, new, arrow)
- [ ] **Event Loop:** Draw the execution flow (Call Stack → Microtasks → Macrotasks)
- [ ] **Promises:** Handle errors with `.catch()` and `async/await` with `try/catch`
- [ ] **Prototypes:** Explain the prototype chain and `Object.create()`
- [ ] **call/apply/bind:** When would you use each?

### Coding Challenges to Practice

1. **Implement `debounce` from scratch** (Asked at Google, Facebook)
2. **Implement `Promise.all` from scratch**
3. **Deep clone an object** (handle nested objects and arrays)
4. **Flatten a nested array** `[1, [2, [3, 4]]]` → `[1, 2, 3, 4]`
5. **Explain the output of async code** (Event Loop questions)

### Red Flags Interviewers Watch For

❌ Using `var` in modern code  
❌ Not understanding the difference between `==` and `===`  
❌ Mutating function arguments  
❌ Not knowing when to use closures  
❌ Can't explain the Event Loop execution order  

---

**Final Tip:** The best way to learn JavaScript is to **build things**. Theory is important, but practical experience is what makes you a senior engineer.
