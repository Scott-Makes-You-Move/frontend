# 🏃‍♂️ Scott Makes You Move - Frontend

This is the **frontend** for _Scott Makes You Move_, a movement and vitality tracking web app designed to encourage daily activity, track progress, and engage users through gamification.

🚀 **Built with:**

- **Next.js** (Hybrid Mode - App Router)
- **Tailwind CSS** (Utility-first styling)
- **Deployed on:** **Azure Static Web Apps (SWA)**

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone git@github.com:Scott-Makes-You-Move/frontend.git

cd frontend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Run the Development Server

```sh
npm run dev
```

## 📂 Project Structure

```bash
/frontend/
│── /app/                # Next.js App Router
│   │── layout.tsx       # Global layout
│   │── page.tsx         # Landing Page
│   │── /progress/       # Progress Tracking
│   │── /leaderboard/    # Leaderboard Page
│   │── /sessions/       # Daily Movement Tracking
│   │── /workouts/       # Embedded Workouts Page
│   │── /auth/           # Authentication
│
│── /components/         # Reusable UI Components
│── /lib/                # API Calls & Utility Functions
│   │── api.ts           # Handles API requests
│
│── /public/             # Static Assets (logos, images)
│── /styles/             # Tailwind CSS styles
│── next.config.js       # Next.js Config
│── tailwind.config.js   # Tailwind Config
│── package.json         # Dependencies
```

## 👥 Contribution Guidelines

### Branching Strategy

- `main` → Stable production branch
- `dev` → Active development branch
- `feature/{feature-name}` → Feature-specific branches
- `fix/{issue-name}` → Bug fixes

### Commit Message Format

- 🆕 `feat`: Added leaderboard UI
- 🔧 `fix`: Resolved API fetch issue
- 📦 `chore`: Updated dependencies

### Pull Request Guidelines

- **PR Title:** Include a concise title
- **Description:** Briefly describe the changes made
- **Reviewers:** Assign at least one reviewer
- **Labels:** Add appropriate labels
- **Checklist:** Ensure all items are checked
- **Screenshots:** Include relevant screenshots
- **Demo Link:** If applicable
- **Issue Link:** Reference the issue being addressed
- **Dependencies:** List any new dependencies
- **Testing Instructions:** Provide steps to test the changes
- **Environment Variables:** List any new environment variables
- **Database Changes:** If applicable
- **Security Implications:** If applicable
- **Performance Implications:** If applicable
