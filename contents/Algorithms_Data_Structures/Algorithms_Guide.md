# Algorithms & Data Structures: The Interview Preparation Guide

This guide covers essential data structures and algorithmic patterns for coding interviews, with simple explanations and real-world applications.

---

## 1. Big O Notation: Understanding Time Complexity

**The Big Idea:** How does runtime grow as input size increases?

### Common Complexities (From Best to Worst)

| Big O | Name | Example | When N = 1000 |
| :--- | :--- | :--- | :--- |
| **O(1)** | Constant | Array access: `arr[5]` | 1 operation |
| **O(log n)** | Logarithmic | Binary Search | ~10 operations |
| **O(n)** | Linear | Loop through array | 1,000 operations |
| **O(n log n)** | Linearithmic | Merge Sort, Quick Sort | ~10,000 operations |
| **O(n²)** | Quadratic | Nested loops | 1,000,000 operations |
| **O(2^n)** | Exponential | Fibonacci (naive recursion) | 💥 Impractical |

### Example: Comparing Algorithms

```javascript
// O(n²) - Bad for large arrays
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

// O(n) - Much better!
function findDuplicatesFast(arr) {
  const seen = new Set();
  const duplicates = new Set();
  
  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    }
    seen.add(num);
  }
  return Array.from(duplicates);
}
```

---

## 2. Essential Data Structures

### Arrays

**Big O:**
- Access: O(1) - `arr[5]`
- Search: O(n) - Must check each element
- Insert/Delete (end): O(1) - `arr.push()`, `arr.pop()`
- Insert/Delete (middle): O(n) - Must shift elements

**Interview Tip:** Arrays are great for **indexed access** and **iteration**.

### Hash Maps (Objects/Maps)

**Big O:**
- Insert/Delete/Search: **O(1) average** (O(n) worst case with hash collisions)

**Use Cases:**
- **Counting frequency:** "How many times does each word appear?"
- **Fast lookups:** "Does this user ID exist?"
- **Caching:** Store expensive computation results

```javascript
// Example: Two Sum Problem
// Given [2, 7, 11, 15], target = 9, return [0, 1] (2 + 7 = 9)

// ❌ Brute Force O(n²)
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

// ✅ Hash Map O(n)
function twoSumFast(nums, target) {
  const map = new Map();  // { value: index }
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}
```

### Stacks (LIFO - Last In, First Out)

**Operations:**
- `push(item)` - Add to top: O(1)
- `pop()` - Remove from top: O(1)
- `peek()` - View top: O(1)

**Use Cases:**
- Function call stack
- Undo/Redo functionality
- Browser history (back button)
- Parentheses matching

```javascript
// Example: Valid Parentheses
// "({[]})" → true
// "([)]" → false

function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  
  for (const char of s) {
    if (char in pairs) {
      stack.push(char);  // Opening bracket
    } else {
      const last = stack.pop();
      if (pairs[last] !== char) {
        return false;  // Mismatch
      }
    }
  }
  
  return stack.length === 0;  // All brackets matched
}
```

### Queues (FIFO - First In, First Out)

**Operations:**
- `enqueue(item)` - Add to back: O(1)
- `dequeue()` - Remove from front: O(1)

**Use Cases:**
- BFS (Breadth-First Search)
- Task scheduling
- Message queues

```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    this.items.push(item);
  }
  
  dequeue() {
    return this.items.shift();  // Remove first element
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}
```

### Linked Lists

**Structure:**
```
[1] -> [2] -> [3] -> null
```

**Big O:**
- Access: O(n) - Must traverse from head
- Insert/Delete (at head): O(1)
- Insert/Delete (at tail): O(n) without tail pointer

**When to Use:** Frequent insertions/deletions at the beginning.

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  // Add to front: O(1)
  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }
  
  // Reverse the list
  reverse() {
    let prev = null;
    let current = this.head;
    
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    
    this.head = prev;
  }
}
```

### Trees

#### Binary Tree
```
       1
      / \
     2   3
    / \
   4   5
```

#### Binary Search Tree (BST)
**Property:** Left < Parent < Right

```
       5
      / \
     3   7
    / \   \
   1   4   9
```

**Big O (Balanced):**
- Search/Insert/Delete: O(log n)

**Big O (Unbalanced - becomes linked list):**
- O(n)

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Search in BST
function search(root, target) {
  if (!root) return false;
  
  if (root.value === target) return true;
  
  if (target < root.value) {
    return search(root.left, target);  // Go left
  } else {
    return search(root.right, target);  // Go right
  }
}
```

### Graphs

**Representations:**

1. **Adjacency List** (Most common)
```javascript
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D'],
  'C': ['A', 'D'],
  'D': ['B', 'C']
};
```

2. **Adjacency Matrix**
```javascript
const graph = [
  [0, 1, 1, 0],  // A connects to B, C
  [1, 0, 0, 1],  // B connects to A, D
  [1, 0, 0, 1],  // C connects to A, D
  [0, 1, 1, 0]   // D connects to B, C
];
```

---

## 3. Common Algorithmic Patterns

### Pattern 1: Two Pointers

**Use Case:** Working with **sorted arrays** or **linked lists**.

#### Example: Pair with Target Sum (Sorted Array)
```javascript
// Given sorted array [1, 2, 3, 4, 6], target = 6
// Return [1, 3] (indices of 2 and 4)

function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;  // Need bigger sum
    } else {
      right--;  // Need smaller sum
    }
  }
  
  return [-1, -1];
}
```

**Time:** O(n), **Space:** O(1)

### Pattern 2: Sliding Window

**Use Case:** Subarray/substring problems.

#### Example: Max Sum of Subarray of Size K
```javascript
// Given [2, 1, 5, 1, 3, 2], K = 3
// Return 9 (5 + 1 + 3)

function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // Calculate first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];  // Remove left, add right
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}
```

**Time:** O(n), **Space:** O(1)

### Pattern 3: Fast & Slow Pointers (Floyd's Cycle Detection)

**Use Case:** Detect cycles in **linked lists**.

```javascript
function hasCycle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;        // Move 1 step
    fast = fast.next.next;   // Move 2 steps
    
    if (slow === fast) {
      return true;  // Cycle detected!
    }
  }
  
  return false;
}
```

**Time:** O(n), **Space:** O(1)

### Pattern 4: Merge Intervals

**Use Case:** Overlapping intervals (meeting rooms, calendars).

#### Example: Merge Overlapping Intervals
```javascript
// Input: [[1,3], [2,6], [8,10], [15,18]]
// Output: [[1,6], [8,10], [15,18]]

function merge(intervals) {
  if (intervals.length === 0) return [];
  
  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);
  
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];
    
    if (current[0] <= lastMerged[1]) {
      // Overlapping, merge
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      // No overlap
      merged.push(current);
    }
  }
  
  return merged;
}
```

**Time:** O(n log n) - sorting, **Space:** O(n)

### Pattern 5: Top K Elements (Using Heap)

**Use Case:** Find K largest/smallest elements.

```javascript
// Find K largest elements (using Min Heap)
function findKLargest(nums, k) {
  // Use built-in sort for simplicity (or implement Min Heap)
  nums.sort((a, b) => b - a);
  return nums.slice(0, k);
}
```

---

## 4. Graph Algorithms

### BFS (Breadth-First Search)

**Use Case:** Shortest path in **unweighted graph**, level-order traversal.

```javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();  // Dequeue
    console.log(node);
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);  // Enqueue
      }
    }
  }
}
```

**Time:** O(V + E) - Vertices + Edges

### DFS (Depth-First Search)

**Use Case:** Pathfinding, cycle detection, topological sort.

```javascript
function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}
```

**Time:** O(V + E)

### When to Use BFS vs DFS?

| Problem | Use |
| :--- | :--- |
| Shortest path (unweighted) | BFS |
| Any path exists? | DFS (uses less memory) |
| Cycle detection | DFS |
| Level-order traversal (trees) | BFS |

---

## 5. Sorting Algorithms

### Quick Reference

| Algorithm | Best | Average | Worst | Space | Stable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

### Merge Sort (Most Important)

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

---

## 6. Dynamic Programming (DP)

**The Big Idea:** Break problem into **overlapping subproblems** and **memoize** (cache) results.

### Example: Fibonacci

#### ❌ Naive Recursion: O(2^n)
```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);  // Recalculates same values many times!
}
```

#### ✅ Memoization (Top-Down DP): O(n)
```javascript
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];  // Return cached result
  
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
```

#### ✅ Tabulation (Bottom-Up DP): O(n)
```javascript
function fib(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
```

---

## 7. Interview Preparation Strategy

### Week 1-2: Foundations
- [ ] Master Big O notation
- [ ] Arrays, Hash Maps, Stacks, Queues
- [ ] Two Pointers, Sliding Window

### Week 3-4: Trees & Graphs
- [ ] Binary Trees (traversals: inorder, preorder, postorder)
- [ ] Binary Search Trees
- [ ] BFS, DFS

### Week 5-6: Advanced
- [ ] Dynamic Programming (Fibonacci, Knapsack)
- [ ] Backtracking (Permutations, Subsets)
- [ ] Sorting algorithms

### LeetCode Practice
- **Easy:** 20 problems (Build confidence)
- **Medium:** 50 problems (Interview level)
- **Hard:** 10 problems (Bonus, not always asked)

---

## 8. Interview Checklist: Algorithms

- [ ] Can you explain Big O notation with examples?
- [ ] Implement a function to reverse a linked list.
- [ ] Find the longest substring without repeating characters (Sliding Window).
- [ ] Check if a binary tree is balanced.
- [ ] Implement BFS and DFS on a graph.
- [ ] Solve the "Two Sum" problem in O(n) time.
- [ ] Explain when you would use a Stack vs a Queue.
