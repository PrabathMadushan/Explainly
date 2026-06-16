# Explainly – Interview Practice Coach

Explainly is a **web + mobile** app designed to help engineers practice interview answers in a realistic, structured way.

This repository currently focuses on **my own Senior Software Engineer interview preparation** using a hard‑coded content library, with a clear path to later scale into a general product for others (students, juniors, non‑native English speakers, etc.).

---

## Core Idea

- **Structured topic tree**
  - Software Engineering
  - Frontend, Backend, OOP, DevOps, Security, System Design
  - Deep drill‑down, e.g.:
    - Frontend → React → `useEffect` → Interview questions

- **Two modes**
  - **Study Mode**
    - Question + structured ideal answer
    - Content sourced from my curated guides in `contents/`
  - **Practice Mode** (planned)
    - Record audio answers on mobile / web
    - Save multiple attempts (versions) per question
      - `Version 01`, `Version 02`, … to track iteration
    - Audio playback & history
    - Optional speech‑to‑text transcription
    - Track improvement over time (graphs + AI feedback later)

- **Audience (initially just me, later others)**
  - Students
  - Junior / mid engineers
  - Non‑native English speakers
  - Anyone preparing for senior‑level interviews (especially React / Node / system design)

---

## Current State of the Project

Right now, this repo is mainly:

- **Content library** (hard‑coded, text‑only for now)
  - Located under `contents/`
  - Includes:
    - `INTERVIEW_PREPARATION_GUIDE.md` (main high‑level guide)
    - Topic‑specific deep dives:
      - `Behavioral_Leadership/Behavioral_Leadership_Guide.md`
      - `Core_Language_Fundamentals/JavaScript_Fundamentals.md`
      - `Core_Language_Fundamentals/TypeScript_Fundamentals.md`
      - `Frontend_Architecture/React_Deep_Dive.md`
      - `Frontend_Architecture/NextJS_Deep_Dive.md`
      - `Backend_Engineering/NodeJS_Deep_Dive.md`
      - `Backend_Engineering/Express_NestJS_Guide.md`
      - `System_Design_Architecture/System_Design_Guide.md`
      - `System_Design_Architecture/Database_Design_Guide.md`
      - `DevOps_Infrastructure/DevOps_Guide.md`
      - `Design_Patterns_Principles/Design_Patterns_Guide.md`
      - `Algorithms_Data_Structures/Algorithms_Guide.md`
    - Additional stories and progress tracking docs:
      - `stories/Behavioral_Stories.md`
      - `PROGRESS_TRACKER.md`
      - `README_STUDY_GUIDE.md` (index for all study docs)

- **Web app skeleton** (`web/`)
  - Next.js 14 app (App Router) created with `create-next-app`
  - Currently still using the default starter page (`app/page.tsx`)
  - Will evolve into:
    - Topic tree navigation UI (Study Mode)
    - Web Practice Mode: recording (where supported), text entry, and history

- **Mobile app skeleton** (`mobile/`)
  - Flutter starter project (counter app in `lib/main.dart`)
  - Will evolve into:
    - Offline‑first practice app
    - Recording + versioned answers
    - Sync with Supabase backend when online

The **first milestone** is to build the app just for my own use, wired directly to this hard‑coded content. After that, I’ll generalize and clean it up for other users.

---

## Tech Stack

- **Web**: Next.js (React, App Router, TypeScript)
- **Mobile**: Flutter (cross‑platform for iOS, Android, desktop, web)
- **Backend (planned)**: Supabase
  - Postgres (questions, topics, answer versions, users)
  - Auth (email / OAuth)
  - Storage (audio files)
- **Audio & AI (planned)**
  - Client‑side recording (web + mobile)
  - Server‑side transcription (STT)
  - AI scoring & feedback for answers (LLM‑based)

---

## Project Structure

At the top level:

- `contents/` – All interview preparation guides (Markdown)
  - Acts as the **single source of truth** for Study Mode content.
- `web/` – Next.js web app
- `mobile/` – Flutter mobile app
- `index.html` – Simple static entry (legacy / experiments)
- `README_STUDY_GUIDE.md` – Index + study plan for the content library
- `PROGRESS_TRACKER.md` – Manual tracking of what I’ve studied so far

Inside `web/`:

- `app/`
  - `page.tsx` – current home page (Next.js starter content)
  - `layout.tsx` – root layout
  - `globals.css` – global styles
- `public/` – static assets
- `tsconfig.json`, `eslint.config.mjs`, `next.config.ts` – tooling & config

Inside `mobile/`:

- `lib/main.dart` – current Flutter counter demo (to be replaced)
- `android/`, `ios/`, `windows/`, `macos/`, `linux/`, `web/` – platform boilerplate
- `pubspec.yaml` – Flutter dependencies & assets

---

## Running the Apps Locally

### Prerequisites

- **Node.js + npm** for the web app
- **Flutter SDK** (with Android/iOS tooling) for the mobile app

### Web (Next.js)

From the repo root:

```bash
cd web
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

> Note: The web UI is still the default Next.js starter. Future iterations will:
> - Render the topic tree from `contents/`
> - Provide Study Mode views for each topic
> - Add Practice Mode (answer versions, history)

### Mobile (Flutter)

From the repo root:

```bash
cd mobile
flutter pub get
flutter run
```

This will run the current Flutter demo app on your connected device or emulator.

> Note: The mobile UI is still the default Flutter counter app. Future iterations will:
> - Replace this with Explainly’s home screen
> - Add topic selection, question view, and recording
> - Support offline‑first storage of answers

---

## Roadmap

- **Phase 1 – Personal MVP (offline / hard‑coded)**
  - Map `contents/` structure into an in‑app topic tree
  - Build Study Mode (read answers from local markdown / JSON)
  - Basic Practice Mode:
    - Text answers
    - Local version history per question

- **Phase 2 – Audio & Progress**
  - Audio recording on mobile (and web where supported)
  - Store multiple audio versions per question
  - Simple progress views (attempt count, time spent)

- **Phase 3 – Supabase Backend**
  - Migrate content and answers into Postgres
  - User accounts (login, multiple devices)
  - Audio storage in Supabase
  - Sync local offline data when online

- **Phase 4 – AI‑Powered Coaching**
  - Speech‑to‑text transcription of answers
  - AI scoring (clarity, depth, structure, seniority)
  - Feedback + suggestions for improvement
  - Progress analytics (per topic, per time range)

---

## Goals & Principles

- **Practice realism**: Answers should feel like real interviews, not just flashcards.
- **Communication first**: Focus on structure, clarity, and trade‑offs, not just raw facts.
- **Start personal, then scale**: First version is optimized for my own use; later generalized for others.
- **Content‑driven**: The `contents/` folder remains the canonical source for questions and ideal answers.

If you’re reading this as a future collaborator, the early commits will likely be messy and biased toward my personal workflow. Over time, the goal is to clean up the architecture, separate content from code, and make Explainly a polished interview practice platform for everyone.

