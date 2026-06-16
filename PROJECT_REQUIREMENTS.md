## Project Overview

Explainly is a **web + mobile learning and practice platform** built around a **hierarchical topic tree** (subject → sub‑topic → leaf node). Each leaf node represents a focused, study‑ready unit that can contain:

- **Study content** (text, links, videos, resources)
- **Flashcards** (question + answer pairs)
- **Exam questions** (MCQ + written answers)

The platform has:

- **Admin web app** for authoring the content tree and all learning materials.
- **Student clients** on **web and mobile** for navigating the tree, studying, and practicing.

Later phases introduce **AI agents** for:

- Validating student answers (especially free‑text and spoken answers).
- Assisting admins with course creation and content refinement.

---

## Goals and Non‑Goals

- **Goals**
  - Provide a **structured, navigable learning tree** that breaks large subjects into small, study‑ready sections.
  - Support **rich study content** and **multiple practice modes** (flashcards, practice exams, full exams).
  - Track **answer versions over time** (text + audio) to show improvement.
  - Offer **web + mobile experiences** with a consistent feature set.
  - Provide an **admin experience** that makes it easy to create and maintain courses at scale.
  - Be **AI‑ready** for automated feedback and semi‑automated course creation.

- **Non‑Goals (initially)**
  - Full LMS features such as payments, certifications, and complex grading schemes.
  - Public marketplace for courses (initially focused on internal / controlled content).
  - Real‑time collaboration between students (chat, pair practice, etc.).

---

## User Roles & Personas

- **Student / Learner**
  - Consumes study content via the topic tree.
  - Practices via flashcards and exams.
  - Records answers (text + voice) and views progress over time.

- **Content Author / Instructor**
  - Designs the topic tree (subjects → modules → topics → leaf nodes).
  - Creates and edits study content, flashcards, and exam questions.
  - Reviews analytics to improve course content.

- **Admin / Super Admin**
  - Manages authors, roles, and permissions.
  - Manages global settings (AI features, feature flags).
  - Oversees data privacy, compliance, and content quality.

- **AI Agents (System Role, future)**
  - Assist authors in designing and populating course content.
  - Evaluate and give feedback on student answers.

---

## High‑Level System Architecture (Conceptual)

- **Clients**
  - `Web Student App`
    - Browser‑based, responsive UI.
    - Full navigation of topic tree, study mode, practice modes.
  - `Mobile Student App`
    - Flutter / cross‑platform.
    - Mostly parity with web features; enhanced for offline usage where possible.
  - `Admin Web App`
    - Browser‑based management console for content, users, and analytics.

- **Backend API Layer**
  - REST / GraphQL API for:
    - Topic tree operations.
    - Content (articles, flashcards, exam questions).
    - Study sessions and practice sessions.
    - Answer submissions and version history.
    - Authentication & authorization.
  - (Later) Separate **AI Services layer** for:
    - Automatic scoring / validation of answers.
    - Course generation and suggestion pipelines.

- **Data Storage**
  - **Relational DB (e.g., Postgres/Supabase)**
    - Users, roles, permissions.
    - Topic tree structure and metadata.
    - Study content, flashcards, exam questions.
    - Answer versions and analytics events.
  - **Object Storage**
    - Audio recordings (voice answers).
    - Images, PDFs, and other rich media attachments.

---

## Domain Model & Content Tree

- **Subject**
  - Represents a high‑level course or domain (e.g. “Software Engineering”, “Math – Calculus I”).
  - Attributes:
    - `id`, `title`, `description`, `icon`, `category`, `tags`.
    - `isPublished`, `createdAt`, `updatedAt`.

- **Node (Topic / Subtopic / Leaf)**
  - Generic node in the tree; can represent any level (module, chapter, lesson, concept).
  - Attributes:
    - `id`, `parentId` (nullable for root nodes).
    - `subjectId`.
    - `title`, `slug`, `shortDescription`, `fullDescription`.
    - `order` (for display ordering under parent).
    - `difficulty` (e.g. Intro / Intermediate / Advanced).
    - `estimatedDurationMinutes`.
    - `tags` (e.g. “Recursion”, “React Hooks”).
    - `isLeaf` flag (true when it is a study/practice unit).
    - `prerequisiteNodeIds` (list).
    - `status` (`draft`, `in_review`, `published`, `archived`).

- **Content Attachment**
  - Associates various resource types with a given node.
  - Types:
    - `article` (main study text).
    - `link` (external URL, docs, blog posts).
    - `video` (embed or hosted video).
    - `file` (PDF, slides, etc.).
  - Attributes:
    - `id`, `nodeId`, `type`.
    - `title`, `description`.
    - `url` or storage reference.
    - `order`.
    - `metadata` (platform‑specific info, duration, etc.).

---

## Study Content Requirements

- **Article Content**
  - Rich text (headings, lists, code blocks, images).
  - Support internal cross‑links (e.g., link to other nodes in the tree).
  - Versioning:
    - Maintain history of changes with `version`, `authorId`, `changeSummary`.
    - Show last updated date and optionally changelog in admin.
  - Localization (optional / future):
    - Ability to store translations per locale for title, description, and article body.

- **Media Embeds**
  - Inline support for:
    - YouTube/Vimeo or custom video players.
    - External docs (e.g. Google Docs link, GitHub repo).
  - Fallbacks:
    - Graceful degradation if external embeds fail.
    - Clear indication when content is unavailable.

---

## Flashcards Requirements

- **Flashcard Model**
  - Attributes:
    - `id`, `nodeId`.
    - `questionText` (supports markdown).
    - `answerText` (ideal answer, markdown).
    - `explanations` (optional additional notes).
    - `tags` (e.g. “definition”, “concept check”).
    - `difficulty`.
    - `status` (`draft`, `published`).

- **Flashcard Practice Session**
  - Initiation:
    - From any node, the user can tap **Practice**.
    - System collects flashcards from that node and all nested child nodes.
    - Student can filter:
      - By difficulty range.
      - By tag(s).
      - By “unseen only”, “needs review”, or “all”.
  - Flow:
    - Card is shown with question only.
    - Student can:
      - Reveal model answer.
      - Input their own answer as **text** or **voice recording** (or both).
    - Allow self‑rating:
      - “I knew this”, “I was unsure”, “I got it wrong”.
    - Use ratings and answer history to drive:
      - Simple spaced repetition scheduling (future).
  - Answer capture:
    - Each attempt stored as an **Answer Version** (see below).
    - Support quick retry from within the same session.

---

## Exam Questions & Practice Exams

- **Question Types**
  - **MCQ (Multiple Choice)**
    - Attributes:
      - `id`, `nodeId`.
      - `stem` (question text).
      - `options` (array of text).
      - `correctOptionIndex` or multiple correct options.
      - `explanation`.
      - `difficulty`, `tags`.
  - **Written / Free‑Text**
    - Attributes:
      - `id`, `nodeId`.
      - `prompt` (question text).
      - `idealAnswer` (for AI/manual comparison).
      - `rubric` or evaluation notes (future AI).
      - `difficulty`, `tags`.
  - (Optional Future) Other formats: code input, matching, ordering.

- **Exam Templates**
  - Define exams at node or subject level:
    - `id`, `title`, `description`, `nodeId or subjectId`.
    - Rules:
      - Number of questions or selection by tags/difficulty.
      - Time limit (optional).
      - Passing score.
  - Question selection:
    - Fixed set (curated by author).
    - Or dynamic pool (e.g. 20 random questions from node subtree).

- **Exam Session Flow**
  - Start:
    - Student selects **Practice Exam** or **Real Exam** mode from a node/subject.
  - During exam:
    - Timer (if configured).
    - Navigation between questions (next/previous, index view).
    - Auto‑save of responses after each question.
  - Submission:
    - Immediate scoring for MCQs.
    - Written answers stored for later review and AI scoring.
  - Review:
    - Show correct answers for MCQs and explanations.
    - Show student responses for written questions.
    - Provide summary:
      - Score, time taken, strengths/weaknesses by topic/tag.

---

## Answer Capture & Versioning

- **Answer Version Model**
  - Attributes:
    - `id`, `userId`, `questionId`, `mode` (`flashcard` | `exam` | `practice`).
    - `nodeId` (resolved at attempt time).
    - `attemptNumber` (per question per user).
    - `submittedAt`.
    - `answerText` (optional).
    - `audioUrl` (optional, reference in object storage).
    - `transcript` (optional; from STT).
    - `selfRating` (e.g. 1–5 or buckets).
    - `aiScore` and `aiFeedback` (future).
    - `manualScore` and `reviewerId` (optional).
    - `metadata` (device, platform, language).

- **Versioning Behavior**
  - Every submission creates a new immutable version (no overwriting).
  - Students can see:
    - History of attempts for a question.
    - Differences between text answers (basic diff view).
    - Trends over time (accuracy, self‑confidence).
  - For audio:
    - List of previous recordings with duration and date.
    - Playback controls.

---

## Student Experience (Web & Mobile)

- **Authentication & Profile**
  - Email/password or OAuth (Google, GitHub, etc.).
  - Profile:
    - Name, avatar, preferred language, time zone.
    - Learning goals (optional).
  - Onboarding flow:
    - Choose subject(s) of interest.
    - Suggest initial starting node based on level.

- **Topic Tree Navigation**
  - Hierarchical, collapsible tree view.
  - Breadcrumbs to show position in tree.
  - Indicators:
    - Completed / in progress / not started per node.
    - Difficulty and estimated duration.
  - Search:
    - By title, tags, or question text.

- **Study Mode**
  - For a node:
    - Show article content and associated media.
    - List related flashcards and exam questions.
    - “Start Practice” button (flashcards) and “Start Exam/Quiz” button.
  - Reading experience:
    - Responsive layout, dark/light mode.
    - Keyboard shortcuts on web for faster navigation.

- **Practice Mode**
  - Flashcard practice:
    - See question → think/answer → reveal → self‑rate.
    - Optional typed or spoken answer capture.
  - Practice quiz:
    - Mixed MCQ + short written questions.
    - Non‑graded or lightly graded, with immediate feedback.

- **Progress & Analytics for Students**
  - Dashboard:
    - Overall progress by subject and node subtree.
    - Recent activity (last studied nodes, recent exams).
    - Streaks (optional).
  - Per‑node stats:
    - Number of flashcards practiced.
    - Average self‑rating.
    - Exam performance.
  - Per‑question history:
    - Answer versions with timestamps and scores.

---

## Admin / Authoring Experience

- **Authentication & Permissions**
  - Role‑based access control:
    - `Admin`, `Author`, `Reviewer`, `ReadOnly`.
  - Permissions:
    - Create/edit/delete nodes and content.
    - Publish/unpublish and archive.
    - Manage user roles and course access.

- **Topic Tree Management**
  - UI:
    - Tree view showing entire subject structure.
    - Drag‑and‑drop reordering within a parent.
    - Create new nodes (choose type: module/topic/lesson).
  - Node editing:
    - Set metadata (title, slug, difficulty, duration, tags).
    - Set prerequisites (select other nodes).
    - Toggle `isLeaf`, publish status.

- **Content Authoring**
  - Article editor:
    - Rich text with markdown support.
    - Preview mode.
    - Support for internal links to other nodes.
  - Flashcard editor:
    - Bulk creation (e.g., table format).
    - Reuse / clone cards between nodes.
  - Question bank editor:
    - Create MCQ and written questions.
    - Tag by difficulty, topic, and exam use.
    - Reuse questions across multiple exams or nodes.

- **Workflow & Review**
  - Draft → In Review → Published lifecycle.
  - Reviewer can comment on content.
  - Change history:
    - See who edited what, when.
    - Option to revert to previous version.

- **Analytics & Monitoring**
  - Content usage:
    - Which nodes are most/least visited.
    - Which questions have high error rates.
  - Student performance:
    - Aggregated stats per subject and per node.
    - Identify weak areas across the cohort.
  - System health (basic):
    - Error logs, API usage, storage usage (surfaced in simple dashboards).

---

## AI Features (Future Phases)

- **AI Answer Validation**
  - Scope:
    - Free‑text answers.
    - Spoken answers (via transcription).
  - Behavior:
    - Compare student answer to ideal answer and rubric.
    - Score along dimensions:
      - Correctness, completeness, clarity, structure, terminology usage.
    - Provide textual feedback:
      - What was good.
      - What is missing or incorrect.
      - Hints for improvement.
  - Constraints:
    - Transparent to user: indicate when AI is used.
    - Allow toggle on/off at exam or course level.

- **AI Course Creation Assistants**
  - Capabilities:
    - Given a **subject description** or **reference documents**, propose:
      - A topic tree structure.
      - Draft study articles per node.
      - Draft flashcards and exam questions.
    - Suggest improvements:
      - Identify gaps in coverage.
      - Rebalance difficulty distribution.
  - Workflow:
    - AI outputs are always **drafts** requiring author approval.
    - Authors can accept, edit, or discard suggestions.

---

## Non‑Functional Requirements

- **Performance**
  - Topic tree navigation should feel instantaneous for typical course sizes (e.g. up to tens of thousands of nodes).
  - Practice and exam sessions must autosave answers with low latency.
  - APIs designed for pagination and incremental loading (tree, questions, history).

- **Scalability**
  - Support:
    - Thousands of concurrent students.
    - Multiple large subjects and courses.
  - Design data model and APIs to work for multi‑tenant scenarios (future).

- **Availability & Reliability**
  - Target high uptime for learning workflows.
  - Graceful degradation:
    - If AI services fail, core study/practice still works.
    - If audio upload fails, save text and allow retry.

- **Security & Privacy**
  - JWT‑based authentication, secure session management.
  - Role‑based authorization for admin features.
  - Protect student data (answers, audio) with proper access control.
  - Data retention policies for audio and analytics.
  - Compliance readiness (e.g. GDPR, right to be forgotten).

- **Accessibility**
  - WCAG‑compliant web UI:
    - Keyboard navigable.
    - Screen reader friendly.
  - Captioning / transcripts for audio and video content.

- **Internationalization**
  - Support multi‑language UI strings.
  - Content can be localized per node and question.

- **Observability**
  - Logging for key events (logins, content changes, answer submissions).
  - Metrics:
    - Request rates, error rates, latency.
  - Basic alerting for failures in critical paths (auth, answer save, exam submission).

---

## Open Questions & Assumptions

- **Assumptions**
  - Initial deployment is for controlled/internal use (not a public marketplace).
  - Web and mobile feature sets will aim for near parity, but mobile may lag slightly.
  - AI capabilities will be integrated after core learning and practice flows are stable.

- **Open Questions**
  - Do we need full offline support on mobile (read content + practice) or just limited caching?
  - How strict should exam conditions be (e.g., anti‑cheat, lockdown mode)?
  - Do we support collaborative authoring in real time or only sequential edits?
  - How will pricing / licensing work if used by external institutions?

