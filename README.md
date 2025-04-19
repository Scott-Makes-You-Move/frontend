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

### 3️⃣ Running Keycloak Locally with Docker Compose

Clone the keycloak repository

```sh
git clone https://github.com/Scott-Makes-You-Move/keycloak-service
cd keycloak-service/
docker-compose up
```

### 4️⃣ Run the Development Server

```sh
npm run dev
```

## 🔎 ESLint & Design System Rules

This project uses a custom local ESLint plugin to enforce design system rules, such as disallowing inline Tailwind utility classes on components like `<Button />`.

### ✅ How It Works

We have a local plugin located in:

```bash
.eslint-plugin-ds/
```

It includes a rule that prevents you from using inline Tailwind classes on the Button component - instead, use the variant, size, and other design system props.

### 🧪 When You Might See an Error

```tsx
<Button className="bg-primary px-4 py-2 rounded">Click</Button> // ❌ Not allowed
```

Instead, do this:

```tsx
<Button variant="default" size="lg">
  Click
</Button> // ✅
```

### ⚙️ If ESLint Doesn’t Work in Your IDE

If you get errors about the plugin not being found, try the following:

**VSCode Setup**

1. Make sure you have the **ESLint** extension installed.
2. Add this to your workspace settings (if not already):

```json
// .vscode/settings.json
{
  "eslint.workingDirectories": ["./"]
}
```

3. Restart your VSCode window after cloning.

**CLI Fix (if ESLint fails to find the plugin)**

```sh
npx eslint . --resolve-plugins-relative-to .
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
