# Next.js Deep Dive: The Senior Engineer's Guide

This guide covers modern Next.js (App Router), focusing on architectural decisions and performance.

---

## 1. The Rendering Spectrum

A Senior Engineer knows *when* to use each strategy.

| Strategy | Name | Where it runs | Data Freshness | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **CSR** | Client-Side Rendering | Browser | Real-time | Dashboards, Private User Data behind login. |
| **SSR** | Server-Side Rendering | Server (Per Request) | Real-time | Personalized feed, Dynamic data that changes every second. |
| **SSG** | Static Site Generation | Build Time | Stale (until rebuild) | Blogs, Marketing Pages, Documentation. |
| **ISR** | Incremental Static Regeneration | Server (Background) | Periodic | E-commerce Product pages (updates price every 10 mins). |

---

## 2. App Router & Server Components (RSC)

The biggest shift in React history.

### React Server Components (RSC)
*   **Concept:** Components that run **exclusively on the server**. They never ship JavaScript to the browser.
*   **Benefits:**
    1.  **Zero Bundle Size:** Large libraries (like a markdown parser) stay on the server.
    2.  **Direct DB Access:** You can query your database directly inside the component (it's async!).
    3.  **Security:** API keys and logic are hidden from the client.

### Client Components (`"use client"`)
*   These are the "Standard React Components" you know (`useState`, `useEffect`, `onClick`).
*   **The Boundary:** You must explicitly mark a file with `"use client"` to add interactivity.
*   **Rule:** Server Components can import Client Components. Client Components **cannot** import Server Components.

### The Mental Model
Think of your app as a **Server Component Tree**. The "leaves" of the tree (buttons, inputs, interactive widgets) are Client Components.

---

## 3. Data Fetching & Caching

Next.js extends the native `fetch` API.

### 1. Static Data Fetching (Default)
```javascript
// Automatically cached indefinitely (SSG behavior)
fetch('https://api.com/data', { cache: 'force-cache' });
```

### 2. Dynamic Data Fetching
```javascript
// Never cached, fetched on every request (SSR behavior)
fetch('https://api.com/data', { cache: 'no-store' });
```

### 3. Revalidation (ISR)
```javascript
// Cached for 60 seconds, then updated
fetch('https://api.com/data', { next: { revalidate: 60 } });
```

---

## 4. Optimization Features

Next.js automates many performance best practices.

### Image Optimization (`<Image />`)
*   **Lazy Loading:** Images only load when they enter the viewport.
*   **Resizing:** Server automatically generates smaller versions for mobile.
*   **Format:** Converts images to modern formats like WebP/AVIF.
*   **CLS Protection:** Forces you to define width/height to prevent layout shifts.

### Font Optimization (`next/font`)
*   **Zero Layout Shift:** Next.js downloads the font at build time and hosts it. No call to Google Fonts at runtime.
*   **Preloading:** Fonts are critical resources.

### Script Optimization (`<Script />`)
Control *when* 3rd party scripts (Analytics, Ads) load.
*   `strategy="beforeInteractive"`: Critical scripts.
*   `strategy="lazyOnload"`: Low priority (Chat widgets).

---

## 5. Routing & Navigation

### Dynamic Routes
`app/blog/[slug]/page.tsx` -> Matches `/blog/hello-world`.
The slug is passed as a prop: `params.slug`.

### Parallel Routes (`@folder`)
Allows you to render multiple pages in the same layout simultaneously (e.g., a Dashboard with `@analytics` and `@team` panels).

### Intercepting Routes (`(..)`)
Load a route within the current layout (like a Modal) while keeping the URL shareable.
*   *User clicks photo:* Opens in a modal overlay.
*   *User refreshes page:* Opens the photo as a full dedicated page.

---

## 6. Server Actions (Alpha/Beta -> Stable)

Running backend code directly from a form.

```javascript
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts'); // Refresh the UI automatically!
}
```
**Why?** No need to create a manual API Route (`/api/create-post`) and `fetch` it. It feels like PHP, but type-safe and modern.

---

## 7. Middleware

Code that runs **before** a request completes.
*   **Use Cases:**
    *   **Authentication:** Redirect unauthenticated users to `/login`.
    *   **Geolocation:** Rewrite URL based on user country (`/us/home` vs `/fr/home`).
    *   **A/B Testing:** Send 50% of traffic to a new bucket.
*   **Runtime:** Runs on the Edge (V8 isolate), so it must be fast and lightweight (no Node.js APIs like `fs`).

---

## 8. Interview Checklist: Next.js
- [ ] Explain the difference between `getStaticProps` (Pages Router) and `fetch` (App Router).
- [ ] What is the "Waterfall Problem" in data fetching and how do you solve it? (Parallel data fetching).
- [ ] When would you use a Client Component over a Server Component?
- [ ] How does Next.js handle SEO differently than a plain Create React App?
