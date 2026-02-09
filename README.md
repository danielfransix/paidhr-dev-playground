# PaidHR Dev Playground

This repository contains the PaidHR Playground Next.js application.

## Getting Started

If you have copied this folder, follow these steps to get the project running smoothly.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (LTS version recommended, e.g., v18 or v20).
- **npm**: Comes with Node.js.

### Installation

1.  **Navigate to the project directory**:
    The actual application code is located in the `paidhr-playground` subdirectory.
    ```bash
    cd paidhr-playground
    ```

2.  **Install dependencies**:
    This will install Next.js, React, Tailwind CSS v4, and other required packages.
    ```bash
    npm install
    ```
    *Note: This project uses Tailwind CSS v4. The necessary CLI tools will be installed automatically.*

### Running the Development Server

To start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server after building:

```bash
npm start
```

### Key Features & Configuration

- **Next.js 16**: Uses the App Router and Turbopack.
- **Tailwind CSS v4**: configured with `@import "tailwindcss";` in `globals.css` and a pure CSS theme configuration.
- **Icons**: Uses `@phosphor-icons/react` and `lucide-react`.

### Troubleshooting

- **Tailwind Styles Missing?**
    Ensure the dev server is running. Tailwind v4 compiles styles on-the-fly.
    If you need to debug styles specifically, you can run:
    ```bash
    npm run tailwind:watch
    ```

- **Linting Errors?**
    Run the linter to check for code quality issues:
    ```bash
    npm run lint
    ```
