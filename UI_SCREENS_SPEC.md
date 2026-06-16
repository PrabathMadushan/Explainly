## Explainly UI Screens & Prompts

This document lists **all planned UI screens** for:

- Student Web App
- Student Mobile App
- Admin Web App

For each screen it specifies:

- **Purpose & user flows**
- **Key data/information to show**
- **Interactions & states**
- A **detailed prompt** you can use with a UI design tool / AI to generate the UI.

---

## 1. Student Web App – Screens

### 1.1 Landing / Marketing Page (Optional for v1)

- **Purpose**
  - Public entry point explaining Explainly’s value.
  - Encourage sign‑ups and logins.

- **Key Information**
  - Product value proposition and hero text.
  - High‑level features: topic tree, flashcards, practice exams, AI feedback (coming soon).
  - CTAs: “Sign Up”, “Log In”.

- **States**
  - Not logged in only.

- **Prompt to Generate UI**

> Design a responsive web landing page for a learning and practice platform called "Explainly". Use a clean, modern layout with a top navigation bar containing the logo on the left and links for "Features", "How it works", "Pricing" (optional), and CTAs for "Log in" and a primary button "Get started". The hero section should have a bold headline explaining that Explainly helps students practice with a structured topic tree, flashcards, and exams, with supporting text and an illustration or abstract graphic on the right. Below the hero, add sections that briefly describe the topic tree navigation, flashcard practice, exam practice, and progress tracking, each with an icon and short description. Use generous white space, a friendly but professional color palette, and clear CTAs that lead to sign up or login. Ensure accessibility with large, legible text and strong color contrast.

---

### 1.2 Authentication Screens (Login, Signup, Forgot Password)

- **Purpose**
  - Allow students to create accounts and log in securely.

- **Key Information**
  - Login: email, password, OAuth options (e.g., Google, GitHub icons/buttons).
  - Signup: name, email, password, confirm password, optional agreement to terms.
  - Forgot password: email input, success message.

- **States**
  - Validation errors, loading, success messages, wrong credentials.

- **Prompt to Generate UI**

> Design a set of authentication screens for a modern learning app: a login screen, signup screen, and forgot password screen. Use a centered card layout with a subtle background illustration and the Explainly logo at the top of the card. The login card should have fields for email and password, a primary "Log in" button, a secondary button or row of icons for "Continue with Google/GitHub", and a link for "Forgot your password?" plus a subtle link to "Don't have an account? Sign up". The signup card should collect name, email, password, confirm password, with password strength hints and a checkbox to agree to terms. The forgot password screen should be a simpler card asking only for email, with clear success and error states. Include inline validation messages, disabled states for buttons during loading, and accessible labels. Keep the design consistent with the landing page style: rounded corners, shadowed cards, soft colors, and clear hierarchy.

---

### 1.3 Student Dashboard

- **Purpose**
  - Provide an overview of the student’s learning progress and quick access to key areas.

- **Key Information**
  - Welcome message with student name.
  - List of enrolled or available subjects (cards or tiles).
  - Progress summary per subject (percentage complete or status).
  - Recent activity (recent nodes studied, recent exams or practice sessions).
  - Quick links: “Continue where you left off”, “Start new practice”, “View progress”.

- **States**
  - New user (no activity yet).
  - Active user with rich history.

- **Prompt to Generate UI**

> Design a student dashboard screen for Explainly’s web app. Use a layout with a persistent top navigation (logo, subject switcher, profile menu) and a main content area. At the top of the main area, show a greeting like "Welcome back, [Name]" and a card that highlights "Continue where you left off" with the last studied node title, subject, and a "Resume" button. Below, include a grid or list of subject cards, each showing the subject name, a small icon, a progress bar, and a "Go to subject" button. Add a right-side or lower section called "Recent activity" that lists the last 5 nodes or exams interacted with, showing timestamps, type (study, flashcards, exam), and small status indicators. Also provide a tile or button for "View detailed progress" and "Start quick practice" (opens practice config). Design for desktop first but ensure the card layout can stack vertically on smaller screens. Maintain a clean, learning-focused aesthetic.

---

### 1.4 Subject Overview & Topic Tree Screen

- **Purpose**
  - Show the full hierarchical topic tree for a selected subject.
  - Let students navigate to specific nodes for study or practice.

- **Key Information**
  - Subject title, description, overall progress.
  - Collapsible tree of nodes (modules → topics → leaf nodes).
  - Per‑node indicators: completed / in progress / not started, difficulty, estimated duration.

- **States**
  - Expanded vs collapsed branches.
  - Filter/search results.

- **Prompt to Generate UI**

> Design a subject overview page with a hierarchical topic tree for Explainly. At the top, display the subject name, a brief description, and a progress bar summarizing completion for that subject. Below, on the left side, present a collapsible tree view showing modules, topics, and leaf nodes. Each node entry should include the title, a small difficulty badge (e.g., Intro/Intermediate/Advanced), an estimated duration, and a small status icon or pill indicating "Not started", "In progress", or "Completed". Leaf nodes should have quick action buttons or icons for "Study" and "Practice". Above the tree, provide a search bar that filters nodes by title or tag, and optional filters for difficulty and status. On the right side (or in a side panel), show details for the currently selected node: title, short description, prerequisites, and buttons to "Open in Study mode", "Start Flashcard practice", and "Start exam/quiz" if available. Ensure the tree is scrollable and supports expanding/collapsing deep hierarchies while keeping the header and search bar pinned.

---

### 1.5 Node – Study Mode Screen

- **Purpose**
  - Allow students to read study content and see associated resources for a specific node (leaf).

- **Key Information**
  - Node title, breadcrumb (subject → module → topic → node).
  - Article content (rich text, headings, code blocks, images).
  - Attached resources: links, videos, files.
  - Related flashcards and exam questions summary.
  - Action buttons: “Start Practice” (flashcards), “Start Quiz/Exam”, “Mark as completed”.

- **States**
  - Loading content.
  - Content with/without media attachments.
  - Completed vs in progress indicators.

- **Prompt to Generate UI**

> Design a Study Mode screen for a specific learning node in Explainly’s web app. Use a layout with a top breadcrumb bar showing Subject → Module → Topic → Node, with the node title and a small badge for difficulty and duration. The main content area should display the article content in a readable, blog-style format with clear headings, bullet lists, code blocks, and embedded media such as videos or external resource links. A right-hand side panel (or a section beneath on smaller screens) should show "Resources" (links, files, videos) and "Practice options". The Practice options area should contain buttons: "Start Flashcard Practice", "Start Quiz/Exam" (if available), and a toggle or button to "Mark as completed". Also show a small summary of how many flashcards and exam questions are attached to this node and its subtree. Include navigation controls to move to the "Previous node" and "Next node" in the learning path. Prioritize readability: comfortable line length, spacing, and support for dark/light mode.

---

### 1.6 Flashcard Practice – Configuration Screen

- **Purpose**
  - Let students configure which flashcards to practice before starting a session.

- **Key Information**
  - Current node context (tree entry point).
  - Options:
    - Include only this node vs entire subtree.
    - Difficulty range.
    - Tags / question types.
    - Include only unseen / needs review / all.
  - Estimated number of cards.

- **States**
  - Different filter combinations.
  - Edge case: no cards available (show message).

- **Prompt to Generate UI**

> Design a Flashcard Practice configuration screen for Explainly. The top area should show the current node context (subject + node breadcrumb) and a short description. Below, present a configuration panel with grouped controls: a toggle or radio buttons for "Only this node" vs "This node + all subtopics", a multi-select or pill-based filter for difficulty levels, tag filters (e.g., "definitions", "conceptual", "examples"), and a radio group for card status: "Unseen only", "Needs review", or "All cards". On the right side or at the bottom, display a card summarizing the estimated number of flashcards matching the current filters and a primary button "Start practice". Include a secondary "Reset filters" action and a warning/notifier state when no cards match, with guidance to broaden filters. Maintain a simple, focused layout that prepares the user to enter an immersive flashcard session.

---

### 1.7 Flashcard Practice – Session Screen

- **Purpose**
  - Interactive flashcard practice experience with answer capture and self‑rating.

- **Key Information**
  - Current question text, possibly rich text.
  - Controls to:
    - Reveal model answer.
    - Enter text answer (optional).
    - Record voice answer.
    - Self‑rate (I knew this / Unsure / Got it wrong).
  - Session progress: card index (e.g., 5 of 30), remaining cards, elapsed time (optional).

- **States**
  - Before reveal vs after reveal.
  - Recording in progress vs idle.
  - Submitting self‑rating.

- **Prompt to Generate UI**

> Design an interactive Flashcard Practice session screen for Explainly. The layout should center on a large flashcard area showing the question text. At the top of the card, show the node or subject context and a progress indicator such as "Card 5 of 30" plus a slim progress bar. Initially, only the question is visible, with a prominent "Show answer" button. Once the answer is revealed, show the model answer below the question, and present a section for the student’s own response: a multi-line text input labeled "Your typed answer (optional)" and a voice recording control with a "Record" button, timer, and playback of the last recording. Beneath this, include self-rating buttons styled as three large, clear options: "I knew this", "I was unsure", "I got it wrong". Provide controls to navigate to the "Next card" and possibly "Previous card" (if allowed), and an "End session" link or button. Keep distractions minimal, using a focus mode style with a clean background and clear typography, suitable for repeated use.

---

### 1.8 Exam / Quiz Configuration Screen

- **Purpose**
  - Configure exam or quiz parameters before starting.

- **Key Information**
  - Exam template preview:
    - Title, description, number of questions, time limit, passing score.
  - Selection between:
    - Practice exam (with instant feedback).
    - Real exam (scored, stricter conditions).

- **States**
  - Practice vs real mode selected.
  - Optional additional filters or attempts left.

- **Prompt to Generate UI**

> Design an Exam/Quiz configuration screen for Explainly. At the top, show the exam title, a brief description, and key stats displayed as small badges or chips: number of questions, estimated duration or time limit, passing score. Below, offer two large selectable cards: "Practice mode" and "Real exam mode". The Practice card should describe features such as immediate feedback and ability to retry questions; the Real exam card should highlight scoring, saved attempt, and limited retries. Optionally include a selector for which node/subtree or tag set to focus on if multiple templates exist. At the bottom, provide a primary "Start exam" button that reflects the chosen mode, plus a link for "View exam instructions". The layout should feel similar to modern assessment platforms, with clear hierarchy and no clutter.

---

### 1.9 Exam Session Screen

- **Purpose**
  - Run an exam with MCQ and written questions, autosaving answers and timing.

- **Key Information**
  - Timer (if applicable).
  - Question area:
    - Question text.
    - For MCQ: option list with single or multiple selection.
    - For written: rich text area or simple text area.
  - Navigation:
    - Next/Previous.
    - Question index panel showing answered/unanswered/flagged.
  - Submission controls.

- **States**
  - Exam in progress.
  - Question flagged for review.
  - Auto‑save in progress.
  - Exam submitted (navigates to results screen).

- **Prompt to Generate UI**

> Design an exam-taking screen for Explainly that supports both multiple-choice and written questions. Use a three-panel layout on desktop: a top bar with the exam title and a countdown timer; a main center panel with the current question text, and below it either a list of selectable options (for MCQ) or a multi-line text area (for written answers); and a right-side panel showing a grid or list of question numbers with status indicators (answered, unanswered, flagged). Include controls in the question area for "Flag this question" and show a small auto-save status indicator near the answer input (e.g., "All changes saved" or "Saving..."). At the bottom of the screen, provide "Previous", "Next", and a prominent "Submit exam" button (with a confirmation step). On smaller screens, ensure the question index collapses into a drawer or bottom sheet. The overall design should communicate focus and seriousness while still matching Explainly’s visual language.

---

### 1.10 Exam Results & Review Screen

- **Purpose**
  - Show exam results, per‑question breakdown, and allow answer review.

- **Key Information**
  - Overall score, pass/fail status.
  - Summary: number of correct/incorrect/skipped questions, time taken.
  - Section/topic breakdown (e.g., by node or tag).
  - Per question:
    - Question text.
    - Correct answer(s).
    - Student’s answer.
    - Explanation.
    - For written answers: placeholder for AI/manual feedback (if available).

- **States**
  - Practice vs real exam results (practice may show more hints).
  - Some questions awaiting AI/manual scoring (pending status).

- **Prompt to Generate UI**

> Design an Exam Results and Review screen for Explainly. At the top, display the exam name, the student’s overall score as a large percentage or points, and a clear pass/fail indicator, along with key stats like number of questions, correct, incorrect, skipped, and time taken. Below, include a horizontal bar or donut charts that break performance down by topic or tag (e.g., "React Hooks", "Data Structures"). The main body should offer a tabbed or expandable list of all questions; each question entry should show the question text, the student’s answer, the correct answer, and an explanation. Use clear color-coding for correct, partially correct, and incorrect responses. For written questions, reserve a space for AI or manual feedback, indicating if feedback is pending. Provide navigation controls to quickly jump between questions, and buttons or links for "Retake as practice", "View flashcards for weak areas", and "Back to dashboard". The design should balance rich information with readability, supporting long review sessions.

---

### 1.11 Student Progress Dashboard (Detailed)

- **Purpose**
  - Deep view into a student’s progress and trends over time.

- **Key Information**
  - Overall stats:
    - Study time, cards reviewed, exams completed.
  - Charts:
    - Progress over time.
    - Performance per node/subject.
  - Lists:
    - Weakest topics.
    - Recent answer versions.

- **States**
  - Filter by subject, date range.
  - No data (new user).

- **Prompt to Generate UI**

> Design a detailed Progress dashboard screen for a student in Explainly. The layout should start with high-level summary cards across the top: "Total study time", "Flashcards reviewed", "Exams completed", and "Current streak" if applicable. Below, include a chart area with at least two visualizations: (1) a line chart or area chart showing progress over time (e.g., number of questions answered or average score per week), and (2) a bar chart or heatmap showing performance across topics or tags. Add a filter bar at the top of the page for selecting subject and date range. Lower on the page, show a list of "Weakest topics" with a small sparkline or mini-progress bar and quick links to "Review this topic". Also include a table or list for "Recent attempts" showing question/topic, mode (flashcard/exam), score or self-rating, and timestamp. Ensure the design remains readable and not cluttered, with consistent use of color for performance (e.g., green good, yellow medium, red weak).

---

### 1.12 Question History & Answer Versions Screen

- **Purpose**
  - Show all answer versions for a specific question for the current student.

- **Key Information**
  - Question text and ideal answer.
  - List of attempts:
    - Attempt number, date/time.
    - Mode (flashcard vs exam).
    - Self‑rating, AI/manual scores (if present).
    - Answer text and audio recording link.
    - Transcript (if available).

- **States**
  - Expand/collapse attempt details.
  - Audio playback.

- **Prompt to Generate UI**

> Design a Question History screen in Explainly that focuses on one specific question and all of a student’s attempts. At the top, show the question text and the ideal/model answer in a clear panel. Below, list each attempt as a collapsible card with a header that includes the attempt number, date/time, mode (Flashcard or Exam), and badges for self-rating and any AI or manual score. When expanded, each attempt card should display the student’s text answer, a voice recording player (if an audioUrl exists) with play/pause and duration, and any AI/manual feedback or comments. Optionally show a simple visual diff highlight if the text answer has evolved over attempts. Include filters to show only exam attempts, only flashcard attempts, or all. Provide breadcrumbs back to the node and subject, plus a button to "Practice this question again". Keep the design focused on reflection and improvement over time.

---

## 2. Student Mobile App – Screens

For mobile, we reuse almost all of the above flows, optimized for small screens and native patterns.

### 2.1 Mobile Onboarding & Auth Flow

- **Purpose**
  - Guide new users through short onboarding and then login/signup.

- **Key Information**
  - App value proposition.
  - Basic subject preference selection.
  - Auth fields as above.

- **Prompt to Generate UI**

> Design a mobile onboarding and authentication flow for Explainly (Android/iOS). Start with 2–3 swipeable onboarding screens showing illustrations and short captions about structured topic trees, flashcards, and exams. Include a final screen with primary buttons "Get started" and "Log in". The "Get started" path should lead to a lightweight subject preference selection screen where users can choose one or more subjects via tappable chips or cards, followed by a signup screen (name, email, password). The login screen should mirror the web design but optimized for vertical layout: logo at top, form fields, primary button, OAuth buttons, and small text links for "Forgot password?" and "Sign up". Use platform-native controls where appropriate, generous touch targets, and ensure all content looks good on small screens.

---

### 2.2 Mobile Home / Dashboard

- **Purpose**
  - Quick entry to subjects, continue learning, and see key metrics.

- **Key Information**
  - Continue learning card.
  - Subject list (scrollable).
  - Basic stats.

- **Prompt to Generate UI**

> Design a mobile home screen for Explainly using a vertically scrollable layout. At the top, show a greeting and a "Continue learning" card that displays the last node studied with a "Resume" button. Below, show a horizontal carousel or vertical list of subject cards with progress bars. Further down, add a "Quick actions" section with buttons such as "Start flashcard practice" and "View progress". Include a bottom navigation bar with icons/tabs for "Home", "Subjects", "Practice", and "Profile". Emphasize thumb-friendly tap areas and clear hierarchy for quick scanning.

---

### 2.3 Mobile Subject & Topic Tree

- **Purpose**
  - Provide compact yet navigable view of the subject tree.

- **Prompt to Generate UI**

> Design a mobile subject detail screen for Explainly that focuses on the topic tree. The top of the screen should show the subject name and a progress indicator. Below, use an expandable list or nested accordions to represent modules, topics, and leaf nodes. Each row should show the node title, difficulty icon, and a small status dot or tag. Tapping on a node opens either the Study screen (for leaf nodes) or expands/collapses its children. Include an in-page search bar at the top of the list to quickly filter nodes by name. Provide overflow actions or secondary buttons on leaf node rows for "Study" and "Practice".

---

### 2.4 Mobile Study Mode, Flashcards, Exams

- **Purpose**
  - Adapt Study Mode, Flashcard session, and Exam session to mobile patterns.

- **Prompt to Generate UI**

> Design mobile versions of three core screens for Explainly: Study Mode, Flashcard session, and Exam session. For Study Mode, use a scrollable article view with a sticky header showing the node title and breadcrumbs; place "Practice" and "Quiz" buttons within the header or a bottom action bar. For Flashcards, use a swipeable card interface where each card shows the question on the front; tapping "Show answer" flips or reveals the answer, with buttons for self-rating and a slide-up panel for typed/voice answer input. For Exams, use a single-question-per-screen layout with a sticky header containing the timer and question index indicator, answer inputs in the middle, and "Next"/"Previous" buttons plus a "Submit" button (with confirmation) in a bottom action bar. Ensure all interactive elements are comfortably tappable and optimized for both portrait and landscape.

---

## 3. Admin Web App – Screens

### 3.1 Admin Login Screen

- **Purpose**
  - Secure access for admins and authors.

- **Key Information**
  - Email, password, role hint (optional).

- **Prompt to Generate UI**

> Design an Admin login screen for Explainly’s back office. Use a more neutral and professional theme compared to the student app, while still aligned visually. The screen should feature the Explainly logo and a title "Admin Console". Center a login card that asks for email and password, with a primary "Log in" button and optional small text describing that only authorized users can access. Include subtle error states for invalid credentials and links for "Back to main site" and "Forgot password?". Keep the layout simple and focused on security.

---

### 3.2 Admin Main Layout (Shell)

- **Purpose**
  - Provide a consistent navigation frame for all admin tools.

- **Key Information**
  - Global navigation items:
    - Dashboard
    - Subjects & Topic Tree
    - Content Library (articles, flashcards, questions)
    - Exams
    - Users & Roles
    - Analytics
    - Settings

- **Prompt to Generate UI**

> Design the overall layout shell for the Explainly Admin console. Use a left-hand vertical sidebar for primary navigation with icons and labels for sections like "Dashboard", "Subjects", "Content", "Exams", "Users", "Analytics", and "Settings". The top of the main content area should include a breadcrumb and page title. Provide a profile menu in the top-right corner for the logged-in admin with options such as "Profile", "Organization", and "Sign out". The design should support complex data tables and forms in the main content area, with a clean, enterprise-style look and clear separation between navigation and content.

---

### 3.3 Admin Dashboard

- **Purpose**
  - High-level overview of content and usage metrics for admins.

- **Key Information**
  - Cards: number of subjects, nodes, questions, active students.
  - Charts: activity over time, most visited nodes, common weak topics.
  - Quick links to manage content or view detailed analytics.

- **Prompt to Generate UI**

> Design an Admin dashboard screen for Explainly. Use a grid of summary cards at the top showing key metrics such as total subjects, total nodes, total questions, and active students this week. Below, add charts and tables: a line chart for daily active students, a bar chart for most visited nodes or subjects, and a table for "Weakest topics" based on aggregate exam results. Include quick action buttons such as "Create subject", "Add flashcards", and "Create exam". The look and feel should support data-heavy visualization while remaining clean and scannable.

---

### 3.4 Subject & Topic Tree Management Screen

- **Purpose**
  - Create, organize, and manage the hierarchical topic tree.

- **Key Information**
  - Tree view of all subjects and nodes.
  - Controls to create/edit/delete nodes, reorder, and change status.
  - Node metadata editor.

- **States**
  - Drag-and-drop reorder.
  - Draft vs published indicators.

- **Prompt to Generate UI**

> Design a Subject & Topic Tree management screen for the Explainly Admin console. Use a split-pane layout: on the left, show a detailed tree view of subjects, modules, topics, and leaf nodes with drag-and-drop support to reorder within a parent and clear icons indicating node type and publish status (draft, in review, published, archived). On the right, display a Node Details panel that updates when a node is selected; this panel should include editable fields for title, slug, difficulty, estimated duration, tags, prerequisites (with multi-select of other nodes), and status toggles. Include buttons or icons in the tree to quickly add child nodes, duplicate nodes, or delete (with confirmation). Provide search and filters at the top of the tree to quickly find nodes. Aim for a powerful but intuitive interface for curriculum designers.

---

### 3.5 Node Content Authoring Screen (Article)

- **Purpose**
  - Author and edit the main study article for a node.

- **Key Information**
  - Rich text editor with markdown support.
  - Metadata: version, author, last updated.
  - Attachments: links, videos, files.

- **States**
  - Draft vs published.
  - Save in progress, autosave, validation errors.

- **Prompt to Generate UI**

> Design a Node Content Authoring screen for Explainly’s Admin console, focused on writing the main article for a node. The top of the screen should show the node title, breadcrumb in the tree, and status (draft/in review/published). Below, provide a large content area with a rich text/markdown editor on the left and a live preview panel on the right (or a toggle between Edit and Preview modes). Above the editor, include a toolbar for headings, lists, code blocks, callouts, links, and inline formatting. On the right side (or in a collapsible sidebar), display metadata: current version, last updated timestamp, author, tags, associated attachments (links, videos, files) with add/edit/remove controls. Include primary actions like "Save draft", "Submit for review", and "Publish", with clear feedback on autosave status. Keep the editing experience distraction-free but powerful.

---

### 3.6 Flashcard Management Screen

- **Purpose**
  - Create and manage flashcards for a given node or across the course.

- **Key Information**
  - Flashcard list (question, tags, difficulty, status).
  - Editor for a single card.
  - Bulk operations (import, clone, tag, delete).

- **Prompt to Generate UI**

> Design a Flashcard Management screen for the Explainly Admin console. Use a two-part layout: a table or list of flashcards on the left, and a detailed editor panel on the right. The table should show columns for Question (truncated), Node/Topic, Tags, Difficulty, and Status (draft/published). Allow multi-select for bulk actions like "Publish", "Archive", "Tag", and "Delete". When a flashcard is selected, the right panel should allow editing of the question text (markdown), answer text, optional explanations, tags, difficulty, and status. Include controls to clone an existing card, assign it to additional nodes, and see where it is reused. Provide a quick filter bar to narrow by node, tag, or status. The design should support managing hundreds of cards efficiently.

---

### 3.7 Question Bank & Exam Builder Screen

- **Purpose**
  - Manage MCQ and written questions and assemble exam templates.

- **Key Information**
  - Question bank table with filters.
  - Question editor.
  - Exam template builder:
    - Selected questions list or rules (random selection).

- **Prompt to Generate UI**

> Design a Question Bank and Exam Builder screen for Explainly’s Admin console. The Question Bank section should present a table with search and filtering tools, columns for Question text (truncated), Type (MCQ/Written), Node/Topic, Difficulty, Tags, and Usage count. Selecting a question opens an editor side panel where admins can edit the stem, options and correct answers (for MCQ), or prompt, ideal answer, and rubric (for written). The Exam Builder section should allow admins to create or edit exam templates: show a panel with exam metadata (title, description, associated subject/node, time limit, passing score) and below that either (a) a drag-and-drop list of selected questions, or (b) configuration for random selection rules (e.g., "20 questions from tags X and Y, difficulty between A and B"). Provide clear controls to test/preview an exam and to publish it. Emphasize clarity and control in the layout for constructing robust assessments.

---

### 3.8 Workflow & Review Screen

- **Purpose**
  - Facilitate content review lifecycle (Draft → In Review → Published).

- **Key Information**
  - List of content items awaiting review.
  - Filters by type, author, subject.
  - Review actions: add comments, approve, request changes.

- **Prompt to Generate UI**

> Design a Workflow & Review screen for Explainly’s Admin console. Present a kanban board-style layout or a tabbed table, with columns or tabs for "Draft", "In review", and "Published" (plus "Archived" if needed). Each card or row should represent a content item (node article, flashcard set, exam, etc.) and show title, type, author, last updated, and subject. For items in "In review", provide quick actions such as "Open for review", "Approve", and "Request changes". When opening an item, show a side panel or modal with key content details and a comment thread where reviewers can leave feedback. Include filters at the top for content type, subject, author, and status, allowing teams to triage work. The design should feel similar to modern review workflows used in docs and code review tools.

---

### 3.9 Admin Analytics & Monitoring Screen

- **Purpose**
  - Visualize usage and performance metrics across students and content.

- **Key Information**
  - Charts: active users over time, content usage, exam performance distribution.
  - Tables: most visited nodes, questions with highest error rates.

- **Prompt to Generate UI**

> Design an Analytics & Monitoring screen for Explainly’s Admin console. Include a filter bar at the top to select date range, subject, and cohort (if applicable). Below, arrange several visual components: a line chart of daily active students, a bar chart of most-viewed subjects or nodes, a stacked bar chart or histogram of exam scores, and a table listing "Top problem questions" with columns for question text, incorrect answer rate, attempts, and associated topic. Provide export/download buttons and deep-link actions from charts/tables to the underlying content or users. Use a data visualization style that is consistent with the Admin dashboard, with clear axes, legends, and tooltips.

---

### 3.10 Users & Roles Management Screen

- **Purpose**
  - Manage student and admin accounts, assign roles and access.

- **Key Information**
  - User list with search, filters.
  - User detail view with roles and permissions.

- **Prompt to Generate UI**

> Design a Users & Roles management screen for Explainly’s Admin console. Use a table listing users with columns for Name, Email, Role(s), Status (active/suspended), and last active date. Provide search and filters (by role, status, organization). Selecting a user opens a detail drawer or page with profile info, enrolled subjects, activity summary, and a section for role and permission management with checkboxes or chips. Include actions to invite new users (authors/admins), change roles, deactivate accounts, and reset passwords. Keep the interface clear and safe, with confirmations for destructive actions.

---

### 3.11 Settings & AI Configuration Screen

- **Purpose**
  - Configure global settings, feature flags, and AI options.

- **Key Information**
  - Toggles for enabling/disabling AI answer validation and course creation.
  - Controls for privacy, data retention, localization.

- **Prompt to Generate UI**

> Design a Settings and AI Configuration screen for Explainly’s Admin console. Organize settings into categorized sections with tabs or an in-page navigation sidebar: "General", "AI & Automation", "Localization", "Privacy & Data". In the "AI & Automation" section, include toggles or dropdowns to enable AI answer validation globally or per subject, configure default scoring dimensions, and set whether AI-generated content requires manual approval by default. Provide explanatory text and warning banners for sensitive settings. In "Privacy & Data", include data retention controls for audio and analytics, with clear information on their impact. The overall design should be calm and trustworthy, with careful use of color for potentially risky options.

---

## 4. Notes on Design System & Consistency

- **General**
  - Use a unified design system across student and admin apps:
    - Consistent typography scale and spacing.
    - Shared components: buttons, inputs, cards, tables, modals, tabs.
  - Ensure dark/light mode compatibility for student app; admin can start with light mode only.

- **Accessibility**
  - Minimum contrast ratios for text.
  - Clear focus states for all interactive elements.
  - ARIA landmarks and proper semantic structure in layouts.

- **Responsive Behavior**
  - Web student app: primarily desktop + tablet, but responsive down to mobile widths.
  - Admin console: optimized for desktop, with tablet support; mobile is optional.

