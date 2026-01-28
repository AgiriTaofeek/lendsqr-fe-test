# Pending Changes for Lendsqr Frontend Assessment

Based on the assessment requirements and a review of the current codebase, the following items are pending/incomplete:

## 1. Dashboard Page Implementation

- **Status**: 🔴 **Missing**
- **Current State**: The `src/routes/_protected/index.tsx` file is currently a placeholder (`<div>Hello "/_protected/"!</div>`).
- **Requirement**: "Build the 3 pages: Login, Dashboard, User page, User details page".
- **Action Required**: Implement the Dashboard page according to the Figma design, including the stats cards (if any on dashboard) and any specific layout required by the design.

## 2. Data Persistence (Local Storage / IndexedDB)

- **Status**: 🔴 **Missing**
- **Current State**:
  - `Users` page generates 500 mock users on-the-fly in memory (`src/features/users/components/data.ts`) every time it loads.
  - `UserDetails` page uses hardcoded static data (`src/features/users/components/user-details.tsx`).
- **Requirement**: "User details page: Use local storage or IndexedDB to store and retrieve user details on the user details page."
- **Action Required**:
  - Implement a service to fetch user data (mock API).
  - Store this data in `localStorage` or `IndexedDB` upon first load.
  - Update `UsersTable` to read from this persistent storage.
  - Update `UserDetails` to find the specific user by ID from this persistent storage instead of using hardcoded mock data.

## 3. Mock API Integration

- **Status**: 🟡 **Partial / Incorrect Approach**
- **Current State**: Data is generated via a local function `utils/data.ts`.
- **Requirement**: "Mock your APIs using common tools such as mocky.io or json-generator.com".
- **Action Required**:
  - Generate a JSON dataset (matching the structure in `data.ts`) and host it on Mocky.io or a similar service.
  - Replace the local `MOCK_USERS` generation with an actual HTTP `fetch` (or `axios`) call to this endpoint.

## 4. Unit Testing Coverage

- **Status**: 🟡 **Partial / Insufficient**
- **Current State**: Only `src/features/auth/login/components/login-form.test.tsx` exists.
- **Requirement**: "Unit testing - you must apply positive and negative scenario testing".
- **Action Required**: Add unit tests for:
  - `UsersTable` (rendering, filtering logic).
  - `FilterForm` (interaction, state changes).
  - `UserDetails` components (rendering correct data).
  - `ActionMenu` (Kebab menu interactions).
  - New `Dashboard` component.

## 5. User Details Logic

- **Status**: 🟡 **Incomplete**
- **Current State**: The `UserDetails` screen is visually refactored but logically disconnected.
- **Action Required**: Connect the "Blacklist User" and "Activate User" buttons to update the user's status in `localStorage` (and reflect this change when navigating back to the users list).

## 6. Access & Submission

- **Status**: ⚪ **To Do**
- **Action Required**:
  - Ensure `README.md` is comprehensive (tech stack, setup instructions, architecture decisions).
  - Deploy to Vercel/Netlify.
  - Record Loom video (max 3 mins).
