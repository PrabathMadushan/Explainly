## Explainly – Mobile App UI Screen Spec

This document defines **all mobile (Android/iOS) screens** for the first version of the Explainly app.

Scope is limited to:

- **Authentication & onboarding**
- **Tree‑based navigation of study content**
- **Study mode for reading content**
- **Practice mode**:
  - Flashcards
  - Exams / quizzes
- **Text + voice answers**:
  - Record audio
  - Play back
  - Delete and re‑record
  - Submit to create an **answer version**
- **Basic profile & settings**

The focus is on a **simple, user‑friendly, modern** experience that is fast to use on a phone.

---

## 1. Mobile Design System & Theme

### 1.1 Visual Theme

- **Overall style**
  - Clean, minimal, friendly, and calm.
  - Avoid visual noise; emphasize content and practice interactions.

- **Color palette (light theme)**
  - **Primary**: Indigo or blue (e.g. `#4F46E5` / `#3B82F6`) for main actions and highlights.
  - **Secondary / Accent**: Teal or mint (e.g. `#14B8A6`) for success states and secondary highlights.
  - **Background**: Very light gray or off‑white (e.g. `#F3F4F6`) behind main surfaces.
  - **Surface / Cards**: White (`#FFFFFF`) with subtle shadows or borders (`#E5E7EB`).
  - **Text primary**: Dark gray (`#111827`).
  - **Text secondary**: Medium gray (`#6B7280`).
  - **Error**: Soft red (`#EF4444`).
  - **Warning**: Amber (`#F59E0B`).
  - **Success**: Green (`#10B981`).

- **Dark theme (optional future)**
  - Invert to dark surfaces (e.g. `#020617`, `#0F172A`) with primary colors used sparingly.

### 1.2 Typography & Components

- **Typography**
  - Use a clean sans‑serif typeface (e.g. Inter, SF Pro, Roboto).
  - Sizes:
    - Headline (H1): 24–28 pt, medium/bold.
    - Section titles (H2): 20 pt, medium.
    - Body: 14–16 pt, regular.
    - Caption / meta: 12–13 pt.

- **Components**
  - Buttons:
    - Primary: filled, rounded corners (8–12 px radius).
    - Secondary: outline or ghost.
  - Cards:
    - Rounded, subtle shadow or 1px border.
    - Used for subjects, nodes, practice sessions, and summaries.
  - Inputs:
    - Rounded corners, clear labels, helpful placeholders.
  - Navigation:
    - Bottom tab bar (4 tabs max).
    - Stack navigation per tab.

### 1.3 Interaction & UX Principles

- Thumb‑friendly controls (minimum touch targets 44x44 pt).
- Clear feedback for taps, long presses, and disabled states.
- Avoid deep navigation chains: max 3–4 levels before reaching content.
- Always show context: breadcrumbs or title + subject where possible.

---

## 2. Navigation Structure (Mobile)

- **Bottom Tab Bar**
  - `Home`
  - `Subjects`
  - `Practice`
  - `Profile`

- **Navigation pattern**
  - Each tab uses stack navigation:
    - Home → Node details / Study / Practice screens.
    - Subjects → Subject Detail → Topic Tree → Node → Study / Practice.
    - Practice → Config screens → Session screens.
    - Profile → Settings, Answer history, etc.

---

## 3. Onboarding & Authentication Flow

### 3.1 Splash Screen

- **Purpose**
  - Show brand briefly while app loads and checks auth state.

- **Content**
  - App logo centered.
  - Small tagline (“Practice smarter, not harder”).
  - Background in primary color or gradient.

- **States**
  - Loading state (spinner or subtle progress indicator).
  - If authenticated → auto‑navigate to Home.
  - If not authenticated → navigate to Onboarding/Welcome.

---

### 3.2 Onboarding / Welcome Screens

- **Purpose**
  - Introduce the value of Explainly in 2–3 short screens.
  - Drive users to Login / Sign up.

- **Content per screen**
  - Screen 1: Structured topic tree, easy navigation.
  - Screen 2: Practice with flashcards and exams.
  - Screen 3: Record answers and track progress over time.

- **UI Elements**
  - Illustration or icon.
  - Short headline + 1–2 sentence description.
  - Progress dots at bottom.
  - “Skip” text button (top right).
  - “Next” / “Get Started” primary button.

---

### 3.3 Login Screen

- **Purpose**
  - Allow existing users to sign in.

- **Data / Fields**
  - Email input.
  - Password input (with show/hide toggle).

- **Actions**
  - Primary button: “Log in”.
  - Link: “Forgot password?” → Password Reset screen.
  - Link: “Don’t have an account? Sign up”.
  - Optional: social login buttons (Google, GitHub).

- **States**
  - Empty / pristine.
  - Validation errors (invalid email format, required fields).
  - Loading state when submitting.
  - Error banner for incorrect credentials.

---

### 3.4 Signup Screen

- **Purpose**
  - Allow new users to create an account.

- **Data / Fields**
  - Full name.
  - Email.
  - Password.
  - Confirm password.
  - Checkbox: “I agree to the Terms & Privacy Policy”.

- **Actions**
  - Primary: “Create account”.
  - Link: “Already have an account? Log in”.

- **States**
  - Validation: passwords match, strength hints, required fields.
  - Loading during registration.
  - Error if email already in use.

---

### 3.5 Password Reset Screen

- **Purpose**
  - Trigger password reset email.

- **Data / Fields**
  - Email.

- **Actions**
  - Primary: “Send reset link”.
  - link: “Back to login”.

- **States**
  - Success message: “If an account exists, we sent a reset link”.
  - Error for invalid email format.

---

## 4. Home & Subject Navigation

### 4.1 Home Screen (Dashboard)

- **Purpose**
  - Central entry point after login.
  - Show “Continue learning” and quick access to subjects and practice.

- **Content**
  - Top section:
    - Greeting: “Hi, [Name]”.
    - “Continue learning” card:
      - Last node title.
      - Subject name.
      - Small progress pill (“In progress”).
      - “Resume” button.
  - Section: “Your subjects”
    - Horizontal carousel or vertical list of subject cards:
      - Subject name, icon.
      - Progress bar.
      - Tap → Subject Detail screen.
  - Section: “Quick practice”
    - Buttons:
      - “Start flashcards”
      - “Start quick quiz”

- **Actions**
  - Tap “Resume” → Node Study or Practice depending on last activity.
  - Tap a subject → Subject Detail / Topic Tree.
  - Tap Quick practice → Practice setup screen.

---

### 4.2 Subjects List Screen

- **Purpose**
  - Show all subjects available to the user.

- **Content**
  - AppBar title: “Subjects”.
  - Search bar (filter by name/tag).
  - List of subject cards:
    - Icon/emoji.
    - Name.
    - Short description or tag line.
    - Progress bar.

- **Actions**
  - Tap subject card → Subject Detail / Topic Tree.

---

### 4.3 Subject Detail – Single‑Depth Topic Level Screen

- **Purpose**
  - Provide **one depth level at a time** for topic navigation (no big expandable tree).
  - Make it easy to step through hierarchy: Subject → Level 1 topics → Level 2 → … → Leaf node.

- **Concept**
  - Each screen only shows the **children of a single parent node** as a list of **cards**.
  - The student drills down level by level until they reach a **leaf node**, then opens Study / Practice.

- **Content**
  - Header:
    - Title:
      - For the first level under a subject: subject name.
      - For deeper levels: current parent node title.
    - Optional breadcrumb in small text (e.g. “Subject / Module / Topic”).
    - Subject icon if at root level.
  - Optional description text just under the title (subject description or parent node description).
  - Search bar (filters children of the current parent).
  - List of **topic cards** (one per child node of the current parent):
    - Main title: child node title.
    - Subtitle / description: shortDescription if available.
    - Meta row with:
      - Difficulty badge (Intro / Medium / Advanced) if defined.
      - Estimated duration (“10 min”, etc.).
      - Progress indicator for this node subtree (e.g. “3/10 topics done” or small bar).
    - Small label indicating type:
      - “Section” / “Module” for non‑leaf nodes.
      - “Lesson” or “Practice unit” for leaf nodes.
    - For **leaf node cards**, also show:
      - Count of included items:
        - “Study sections: X”
        - “Flashcards: Y”
        - “Questions: Z”
      - Tiny chips/icons for available practice types (e.g., card icon for flashcards, checkmark icon for exams).

- **Actions**
  - Tap **non‑leaf node card**:
    - Navigate to a **new screen instance** of this same layout,
      now listing that node’s children (one level deeper).
  - Tap **leaf node card**:
    - Navigate to **Node Overview / Study Screen** (5.1).
  - (Optional future) Long press or overflow menu on any card:
    - Mark as “Favorite”.
    - “Add to quick practice”.

- **Navigation behavior**
  - Back button in the AppBar always goes **one level up**:
    - From Level N to Level N‑1.
    - From first level under subject back to Subjects List (or Subject overview).
  - The depth is limited only by how many nested topics exist, but each screen remains **simple**: only one list depth at a time.

---

## 5. Study Content Screens

### 5.1 Node Overview / Study Screen

- **Purpose**
  - Let the student read study content and see practice options for a node.

- **Content**
  - AppBar:
    - Back button.
    - Node title (truncated if long).
    - Optional ellipsis menu (mark as completed, favorite).
  - Subheader:
    - Small breadcrumb: Subject / Module / Topic (single line).
    - Badges: Difficulty, duration.
  - Main body:
    - Scrollable article content:
      - Headings, paragraphs, lists, code, images.
    - Section: “Resources”
      - List of links, videos, files (with icons).
    - Section: “Practice”
      - Buttons:
        - “Flashcards”
        - “Quiz / Exam”
  - Footer / sticky bar (optional):
    - “Mark as completed” toggle.

- **Actions**
  - Scroll to read entire article.
  - Tap resource item → open in webview / external app.
  - Tap Flashcards → Flashcard Practice Config.
  - Tap Quiz / Exam → Exam Config.
  - Tap “Mark as completed” → toggles state.

---

## 6. Practice – Flashcards (Mobile)

### 6.1 Flashcard Practice Configuration Screen

- **Purpose**
  - Configure which cards to include before starting a session.

- **Entry points**
  - From Node Study screen (“Flashcards” button).
  - From Practice tab (choosing node/subject first).

- **Content**
  - Header:
    - Title: “Flashcard practice”.
    - Node context (Subject / Node name).
  - Config sections:
    - Scope:
      - Radio buttons:
        - “This node only”
        - “This node + subtopics”
    - Difficulty:
      - Multi‑select chips: Intro, Medium, Advanced.
    - Status:
      - Radio: “Unseen only”, “Needs review”, “All”.
    - Tags (optional):
      - Chip list (e.g. “definitions”, “concepts”, “examples”).
  - Summary card:
    - Estimated number of cards (e.g. “About 32 cards”).
    - Note if few or no cards match.

- **Actions**
  - Primary button: “Start practice”.
  - Secondary: “Reset filters”.

---

### 6.2 Flashcard Session Screen

- **Purpose**
- Provide an **interactive, swipe‑friendly flashcard experience**.
- Allow answering via text and/or voice, with versioning on submit.

- **Layout & Content**
  - AppBar:
    - Back / exit icon (with “End session?” confirmation).
    - Progress indicator: “5 / 30” and a small progress bar.
  - Card area:
    - Large centered card.
    - Top: Node/subject label in small text.
    - Middle: Question text (rich formatting allowed).
    - Button: “Show answer” when answer hidden.
    - Once answer shown:
      - Section: “Model answer” in smaller font area.
  - Answer capture area (bottom sheet style):
    - Tabs or combined area for:
      - **Typed answer**:
        - Multiline text field labeled “Your answer (optional)”.
      - **Voice answer**:
        - Microphone button with states:
          - Idle: “Hold or tap to record”.
          - Recording: timer, “Tap to stop”, visual waveform or simple bar.
          - Recorded:
            - Playback controls: play/pause, scrubber, duration.
            - Buttons: “Delete” and “Re‑record”.
    - Self‑rating buttons:
      - Three large buttons or segmented control:
        - “I knew this”
        - “Unsure”
        - “Got it wrong”
  - Navigation:
    - Primary: “Submit & next” / “Next card”.
    - Optional: “Previous” card (if behavior allows).

- **Behavior & States**
  - **Before reveal**:
    - Show only question + “Show answer”.
  - **After reveal**:
    - Show model answer and enable rating + answer capture (text + audio).
  - **Recording behavior**:
    - Recording limited to a configurable max duration (e.g. 3–5 minutes).
    - If recording is “not good”, user can tap “Delete” → returns to idle state.
    - User can record again arbitrarily until they are satisfied.
  - **Submit behavior**:
    - When user taps “Submit & next”:
      - Validate: at least a self‑rating selected (text/audio optional, but configurable).
      - Create an **answer version** with:
        - Text (if entered).
        - Audio file reference (if recorded).
        - Self‑rating.
      - Move to next card.
  - **End session**:
    - Confirmation dialog: “End practice? You’ve answered X of Y cards.”

---

### 6.3 Flashcard Session Summary Screen (Optional v1)

- **Purpose**
  - Quick summary after session ends.

- **Content**
  - Title: “Session summary”.
  - Stats:
    - Cards practiced.
    - Distribution of self‑ratings.
  - List (optional):
    - Cards marked as “Got it wrong” with quick “Review” buttons.

- **Actions**
  - “Review weak cards”.
  - “Back to node”.
  - “Back to Home”.

---

## 7. Practice – Exams / Quizzes (Mobile)

### 7.1 Exam Configuration Screen

- **Purpose**
  - Configure and preview exam/quiz before starting.

- **Entry points**
  - From Node Study screen (“Quiz / Exam” button).
  - From Practice tab.

- **Content**
  - Header:
    - Title: “Quiz / Exam setup”.
    - Node context.
  - Exam template card:
    - Exam title.
    - Description.
    - Number of questions.
    - Estimated duration or time limit.
    - Passing score (if defined).
  - Mode selection:
    - Segmented control or two big cards:
      - “Practice mode” (immediate feedback).
      - “Real exam” (scored, saved).
  - Optional scope/filters (if multiple templates):
    - Node/subtree, difficulty, tags.

- **Actions**
  - Primary: “Start exam”.
  - Secondary: link “View instructions”.

---

### 7.2 Exam Session Screen

- **Purpose**
  - Deliver question‑by‑question exam/quiz.
  - Capture answers (MCQ + free‑text) and handle timing.

- **Layout & Content**
  - AppBar:
    - Back arrow (confirm before leaving).
    - Exam title.
    - Timer (if timed), digital countdown.
  - Body:
    - Question number: “Question 3 of 20”.
    - Question stem text (support rich text).
    - For **MCQ**:
      - List of options as large tappable cards or radio/checkbox rows.
      - Multi‑select allowed for multi‑answer questions.
    - For **Written**:
      - Multiline text field for typed answer.
    - Optional: flag button (icon) to mark this question for review later.
  - Bottom bar:
    - Buttons:
      - “Previous” (if q > 1).
      - “Next” (or “Finish” on last question).
      - “Question list” icon to open sheet with overview.

- **Question Overview Sheet**
  - Modal / bottom sheet:
    - Grid or list of question numbers with icons/colors:
      - Answered.
      - Unanswered.
      - Flagged.
    - Tap number → jump to that question.

- **States / Behavior**
  - Auto‑save on each change/tap.
  - Warn when time is nearly up.
  - On submit:
    - Confirm: “Submit exam? You will not be able to change answers.”
    - After submit → navigate to Results/Review (or simple summary in v1).

---

### 7.3 Exam Results (Mobile Simple)

- **Purpose**
  - Show core exam results; detailed review can be web or later phase.

- **Content**
  - Exam title.
  - Score (percentage or points).
  - Pass/fail status.
  - Basic stats: correct / incorrect / skipped, time taken.

- **Actions**
  - “Review answers” (optional v1).
  - “Retake as practice”.
  - “Back to node”.

---

## 8. Answer Version & History Screens

### 8.1 Question Answer History Screen

- **Purpose**
  - Let the student see all versions of their answers for a specific question.

- **Entry points**
  - From Node Study → “View my attempts” (for this question, if available).
  - From Profile → “Answer history” → select question.

- **Content**
  - Header:
    - Question text (truncated) + back.
  - Section: Ideal/model answer.
  - List of attempts:
    - Each item shows:
      - Attempt number.
      - Mode (Flashcard / Exam).
      - Date/time.
      - Self‑rating.
      - Score (future AI/manual; may show “Pending”).
    - Tapping an item opens **Attempt detail**.

---

### 8.2 Attempt Detail Screen

- **Purpose**
  - Show text + audio answer for a particular attempt.

- **Content**
  - Header:
    - “Attempt #3 – [Date]”.
  - Top:
    - Question text.
  - Middle:
    - Model answer (collapsible panel).
  - Student answer:
    - Text answer area (read‑only).
    - Audio player:
      - Playback controls.
      - Duration.
  - Meta:
    - Self‑rating.
    - Any AI/manual feedback if available.

- **Actions**
  - “Practice again” button → Flashcard session starting from this question.

---

## 9. Profile & Settings

### 9.1 Profile Screen

- **Purpose**
  - Show basic user info and entry to account‑related screens.

- **Content**
  - Avatar (initials or image).
  - Name and email.
  - Mini cards / list items:
    - “Study progress” (may open progress screen in future).
    - “Answer history”.
    - “Settings”.
    - “Help & feedback”.
    - “Log out”.

- **Actions**
  - Tap “Answer history” → list of recent questions or filter by node.
  - Tap “Settings” → Settings screen.

---

### 9.2 Settings Screen

- **Purpose**
  - Basic preferences for the mobile app.

- **Content**
  - Sections:
    - **General**
      - Theme: Light / Dark / System (if implemented).
      - Language (if multiple).
    - **Practice**
      - Default flashcard session size (e.g. 10, 20, 30).
      - Ask for self‑rating required? (toggle).
    - **Audio**
      - Max recording length hint.
      - Network usage: “Upload audio only on Wi‑Fi” (optional).
    - **Account**
      - Manage email/password (or link to web).
      - Log out button (with confirmation).

---

## 10. Practice Tab (Shortcut Flows)

### 10.1 Practice Hub Screen

- **Purpose**
  - Allow quick access to practice experiences without going through node screen.

- **Content**
  - Header: “Practice”.
  - Sections:
    - “Continue practice”:
      - Last flashcard session / exam, with “Resume” if supported.
    - “Start new”:
      - Cards:
        - “Flashcards from a subject”
        - “Quick quiz”
    - Shortcuts:
      - Recently used nodes/topics with small “Flashcards” / “Quiz” buttons.

- **Actions**
  - Tapping a card flows into:
    - Subject picker → Node picker → Config screen.

---

## 11. Audio Recording UI Requirements (Global)

These requirements apply anywhere the user can record voice answers (primarily flashcards, future written questions).

- **States**
  - Idle:
    - Mic button label: “Record answer”.
  - Recording:
    - Clear red/pulsing indicator.
    - Timer showing seconds elapsed.
    - Text hint: “Tap to stop”.
  - Recorded:
    - Playback bar with play/pause and duration.
    - Buttons: “Delete” and “Re‑record”.

- **Behavior**
  - If user taps **Record** when already having a recording:
    - Either force user to delete first, or show confirmation: “Replace existing recording?”.
  - Deleting resets state to Idle.
  - Recording should handle:
    - Permission request (OS dialog).
    - Error states if permission denied (show friendly message and link to settings).
  - All recordings are associated with the **current question and attempt**; on submit, they are uploaded/saved as part of the **answer version**.

---

## 12. Error, Empty & Loading States (Global)

- **Loading**
  - Use skeleton cards or shimmer for lists (subjects, nodes).
  - Indeterminate spinners for initial screen loads.

- **Empty States**
  - No subjects:
    - “No subjects assigned yet” with guidance or placeholder.
  - No nodes in a subject:
    - “No topics available yet. Check back soon.”
  - No flashcards for a node:
    - “No flashcards created for this topic” with suggestion to read content.

- **Errors**
  - Network errors:
    - Compact banner at top or inline message: “Couldn’t load content. Check your connection.”
    - “Retry” button.
  - Save/submit errors:
    - Persistent toast/banner for practice/exam submissions.

---

## 13. Accessibility & UX Notes (Mobile)

- Ensure:
  - Adequate tap targets.
  - High contrast for text on backgrounds.
  - Clear focus/selection states.
  - VoiceOver/TalkBack readable labels on:
    - Mic button.
    - Self‑rating controls.
    - Navigation controls.
- Avoid:
  - Overly long text on small screens without good line height.
  - Tiny icons without labels where meaning is not obvious.

---

This spec should be sufficient to drive:

- **Design of all core Explainly mobile screens** in Figma or similar tools.
- **Implementation of first mobile release**: login, tree navigation, study mode, flashcards and exams with text + voice answers, and basic answer history and settings.

