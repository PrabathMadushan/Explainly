# React Deep Dive: The Senior Engineer's Guide

This guide covers the **internal mechanics** of React. It moves beyond "how to use hooks" to "how React works under the hood."

---

## 1. The Core: Reconciliation & Fiber Architecture

**The Big Idea:** React doesn't update the DOM immediately. It calculates changes in memory first.

### Virtual DOM (The "Blueprint")
*   The Virtual DOM (VDOM) is a lightweight JavaScript object copy of the real DOM.
*   **Diffing Algorithm:** When state changes, React creates a *new* VDOM tree and compares it to the *old* one.
    *   **Rule 1:** Different types produce different trees. (Switching from `<div>` to `<span>` destroys the old tree entirely).
    *   **Rule 2:** Keys are crucial for lists. Without keys, React doesn't know if an item was moved, added, or deleted, leading to inefficient re-renders.

### React Fiber (The "Engine")
Before React 16 (Stack Reconciler), rendering was recursive and blocking. If the tree was deep, the browser froze.
*   **Fiber:** A new data structure (a specialized linked list) that represents a unit of work.
*   **Time Slicing:** React can "pause" work to let the browser handle user input or animations, then come back.
*   **Phases:**
    1.  **Render Phase (Async/Interruptible):** React calculates changes. (Side effects are forbidden here!).
    2.  **Commit Phase (Sync/Blocking):** React applies changes to the real DOM. (Side effects like `useEffect` run after this).

---

## 2. Component Lifecycle (Mental Model)

Even with Hooks, the lifecycle phases exist. You must map them correctly.

| Phase | Class Component | Hook Equivalent | Description |
| :--- | :--- | :--- | :--- |
| **Mounting** | `componentDidMount` | `useEffect(() => { ... }, [])` | Component appears on screen. Good for API calls, subscriptions. |
| **Updating** | `componentDidUpdate` | `useEffect(() => { ... }, [prop])` | State/Props changed. Good for syncing local state with props. |
| **Unmounting** | `componentWillUnmount` | `useEffect(() => { return () => ... }, [])` | Component removed. **Crucial** for cleanup (clear timers, remove listeners) to prevent memory leaks. |

---

## 3. Hooks Under the Hood

Hooks are not magic. They rely on **Closures** and **Call Order**.

### The "Rules of Hooks" Explained
Why can't I put a hook inside an `if` statement?
*   React stores hooks in a **Linked List** attached to the Fiber node.
*   `[useState(A)] -> [useEffect(B)] -> [useState(C)]`
*   If you skip `useEffect(B)` conditionally, React will think `useState(C)` is the second hook. The data aligns incorrectly. **Order must be stable.**

### `useState` vs `useReducer`
*   **`useState`:** Best for simple values (boolean, string). Internally implemented using `useReducer`.
*   **`useReducer`:** Best for complex state logic (objects with multiple fields) or when the next state depends on the previous one. It mimics Redux (Dispatch -> Action -> Reducer -> New State).

### `useEffect` vs `useLayoutEffect`
*   **`useEffect` (Standard):** Runs **asynchronously** after the browser has painted the screen. User sees the UI -> Effect runs.
*   **`useLayoutEffect` (Special):** Runs **synchronously** immediately after DOM mutations but *before* the browser paints.
    *   *Use Case:* Measuring DOM elements (width/height) to avoid visual flickering.

---

## 4. Advanced Patterns

### Custom Hooks (The Power of Abstraction)
Extract logic, not UI. If two components need to "fetch user data," create `useUser()`.
```javascript
function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}
```

### Higher-Order Components (HOC) vs Render Props
*   **HOC (`withAuth(Component)`):** Wraps a component to inject props. (Legacy pattern, but still seen).
*   **Render Props (`<Mouse render={pos => ...} />`):** Passing a function as a child to share logic.
*   **Modern Approach:** Custom Hooks usually replace both.

### Compound Components
Used in UI libraries (like Headless UI).
```jsx
// Instead of one giant component with 50 props:
<Select>
  <Select.Toggle />
  <Select.List>
    <Select.Item value="1">Option 1</Select.Item>
  </Select.List>
</Select>
// Parent <Select> uses Context to communicate with children implicitly.
```

---

## 5. Performance Optimization

### Memoization (`React.memo`, `useMemo`, `useCallback`)
**Don't optimize prematurely.** React is fast.
*   **`React.memo`:** Prevents a child component from re-rendering if its props haven't changed.
    *   *Gotcha:* Passing a new object/array/function reference every time breaks this.
*   **`useMemo`:** Caches a **value** (result of expensive calculation).
*   **`useCallback`:** Caches a **function definition**.
    *   *Essential:* When passing a function to a child wrapped in `React.memo`.

### Code Splitting (Lazy Loading)
Reduce initial bundle size.
```javascript
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  );
}
```

---

## 6. Concurrency (React 18+)

React can now handle multiple tasks at once (sort of).

*   **Automatic Batching:** React bundles multiple `setState` calls into one re-render for performance.
*   **`useTransition`:** Mark an update as "non-urgent."
    *   *Scenario:* Typing in a search box. The keypress (input update) is urgent. The search result filtering (list update) is non-urgent.
*   **`useDeferredValue`:** Similar to debouncing, but integrated with React's render cycle.

---

## 7. Interview Checklist: React
- [ ] Can you explain the difference between `useEffect` and `useLayoutEffect`?
- [ ] Why do we need keys in lists? (Internal mechanics answer).
- [ ] What is Prop Drilling and how do you solve it? (Context, Composition, State Management).
- [ ] Explain the Virtual DOM to a 5-year-old. (It's a sketchpad).
