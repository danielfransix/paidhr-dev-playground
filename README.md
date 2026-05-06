# PaidHR Dev Playground

Welcome to the **PaidHR Dev Playground**! This workspace is a monorepo-style collection of various tools, applications, and experiments created for PaidHR development and prototyping. 

## 📂 Workspace Structure

The repository is organized into several key directories:

### 1. `frontend-projs/`
Contains all frontend web applications and prototypes.
- **`react-nextjs-projs/playground-nextjs`**: A modern Next.js 16 application utilizing the App Router, Turbopack, and Tailwind CSS v4. This is the primary playground for building out complex React features.
- **`react-nextjs-projs/playground-reactjs`**: A pure React implementation of the Next.js playground, powered by Vite and Tailwind CSS v4. Used for testing identical features in a traditional SPA environment.
- **`vanilla-projs/proply`**: A vanilla HTML/JS project for quick, dependency-free frontend prototyping.

### 2. `csv-import-cleanup-tool/`
A Python-based utility designed to process, clean, and standardize CSV and Excel data imports (e.g., Fairmoney Paygrade sheets) before they are ingested into the main application.

### 3. `documentation/`
Contains development notes, architecture guidelines, and other project-related documentation.
- `dev-notes/`: Guides and specific notes for developers.

### 4. `pencil-dev-files/`
A directory containing design assets, mockups, image exports, and fonts (e.g., TT Commons). *Note: This directory is ignored by Git to keep the repository lightweight.*

---

## 🚀 Getting Started

Depending on what you want to work on, navigate to the respective directory.

### Frontend Playgrounds (Next.js & React)

Both the Next.js and Vite React playgrounds use modern tooling and Tailwind CSS v4.

#### Next.js Playground
```bash
cd frontend-projs/react-nextjs-projs/playground-nextjs
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Next.js app.

#### React (Vite) Playground
```bash
cd frontend-projs/react-nextjs-projs/playground-reactjs
npm install
npm run dev
```
Check the terminal output for the local Vite server URL (usually `http://localhost:5173`).

### CSV Import Cleanup Tool

Make sure you have Python installed.
```bash
cd csv-import-cleanup-tool
# Run the processor script
python main.py
```

---

## 🛠️ Technologies Used

- **Frameworks/Libraries**: Next.js 16, React 19, Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Phosphor Icons (`@phosphor-icons/react`), Lucide React (`lucide-react`)
- **Scripting**: Python 3
- **Design Assets**: Figma/Penpot exports, Custom Fonts

## 📝 Notes

- **Tailwind CSS v4**: Both React projects utilize the latest Tailwind CSS v4, meaning configuration is largely handled via CSS (`@import "tailwindcss";` and `@theme` directives) rather than a `tailwind.config.js` file.
- If you encounter missing styles during development, ensure your dev server is running, as Tailwind v4 compiles on-demand.