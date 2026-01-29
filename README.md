# Lendsqr Frontend Engineer Assessment

## Project Overview

This is a frontend engineering assessment for Lendsqr. The application is a user management dashboard that allows viewing users, filtering, and seeing detailed user profiles.

It is built to be **pixel-perfect** according to the Figma design and implements a responsive design using SCSS.

## 🚀 Live Demo & Resources

- **Deployment URL**: [https://agiri-taofeek-lendsqr-fe-test.netlify.app](https://agiri-taofeek-lendsqr-fe-test.netlify.app)
- **Video Review**: [Watch on Loom](https://www.loom.com/share/5b2f8577b2a64ba79f7e11eeb94802fa)
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

## 📖 How to Use

### Login

The application uses a **Mock Authentication** system. You do not need real credentials.

1. **Email**: Enter any valid email address (e.g., `test@lendsqr.com`).
2. **Password**: Enter any password (min 6 characters).
3. Click **LOG IN**.

> **Note**: The app will derive a user profile based on the email you enter.

### Dashboard

Once logged in, you can access the dashboard to:

- **View Users**: Browse the list of users fetched from the mock database.
- **Filter Users**: Use the filter panel to search by organization, status, or distinct criteria.
- **View User Details**: Click on a user row to see their full profile and detailed information.
- **Manage User Status**: Activate or blacklist users from the user details page.

## 🏃‍♂️ Running Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/AgiriTaofeek/lendsqr-fe-test.git
cd lendsqr-fe-test
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Start the Development Server

Start the local development server. This will also initialize the Mock Service Worker (MSW) for API mocking.

```bash
npm run dev
```

> **Note**: The application will run at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

To create a production-ready build:

```bash
npm run build
```

### 5. Run Tests

Execute the test suite to ensure everything is working correctly:

```bash
npm run test
```

## 🧪 Testing

The project includes unit tests for critical flows using Vitest.

- **Positive & Negative Testing**: Validating success states and error handling (e.g., invalid login, network errors).

## 📱 Responsiveness

The application is fully responsive, adapting to mobile, tablet, and desktop viewports using SCSS media queries and flexible layouts.
