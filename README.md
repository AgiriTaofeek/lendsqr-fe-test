# Lendsqr Frontend Engineer Assessment

<div align="center">
  <img src="public/logo.svg" alt="Lendsqr Logo" width="150" />
</div>

## Project Overview

This is a frontend engineering assessment for Lendsqr. The application is a user management dashboard that allows viewing users, filtering, and seeing detailed user profiles.

It is built to be **pixel-perfect** according to the [Figma Design](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Frontend) and implements a responsive design using SCSS.

## 🚀 Live Demo & Resources

- **Deployment URL**: [INSERT DEPLOYMENT URL HERE]
- **Video Review**: [INSERT LOOM/VIDEO URL HERE]
- **Repository**: [https://github.com/AgiriTaofeek/lendsqr-fe-test](https://github.com/AgiriTaofeek/lendsqr-fe-test)

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [SCSS](https://sass-lang.com/) (Modular architecture with BEM naming)
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based routing)
- **Testing**: [Vitest](https://vitest.dev/) & React Testing Library
- **Mocking**: [MSW (Mock Service Worker)](https://mswjs.io/)

## 🏗️ Architecture & Decisions

### 1. Feature-Based Folder Structure

The project uses a feature-based structure (`src/features/`) to colocate related components, hooks, and logic. This ensures scalability and maintainability.

### 2. Data Persistence (LocalStorage & MSW)

**Requirement**: "Use local storage or IndexedDB to store and retrieve user details."

**Implementation**:
Instead of cluttering UI components with raw `localStorage` calls, I implemented a **persistence layer within the Mock API (MSW)**.

- `src/mocks/db.ts`: Acts as a database abstraction over `localStorage`.
- `src/mocks/handlers.ts`: Intercepts network requests and CRUDs data to `db.ts`.
- **Benfit**: The UI components remain pure and agnostic of the storage mechanism, simply fetching from `/api/users`. This simulates a real-world application architecture while fulfilling the assessment requirement.

### 3. Styling Strategy

SCSS is organized in a `src/styles` directory with the 7-1 pattern:

- `abstracts/`: Variables, mixins
- `base/`: Reset, typography
- `components/`: Component-specific styles
- `layout/`: Layout grids
- `pages/`: Page-specific overrides

## 🏃‍♂️ Running Locally

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

3. **Run Tests**
   ```bash
   npm run test
   ```

## 🧪 Testing

The project includes unit tests for critical flows using Vitest.

- **Positive & Negative Testing**: Validating success states and error handling (e.g., invalid login, network errors).

## 📱 Responsiveness

The application is fully responsive, adapting to mobile, tablet, and desktop viewports using SCSS media queries and flexible layouts.
