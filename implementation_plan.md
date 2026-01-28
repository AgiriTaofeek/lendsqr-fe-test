# Implementation Plan: Pending Requirements & Refactoring

## Goal

Address the pending assessment requirements while integrating robust architecture patterns using TanStack Router and MSW.

## 1. Mock Service Strategy

**Proposal**: Use **Mock Service Worker (MSW)** (already installed in your `devDependencies`).

**Why?**

- **True API Simulation**: MSW allows your app to use real `fetch('/api/users')` calls. It intercepts these requests at the network level.
- **Persistence Capable**: We can write MSW handlers that read/write from `localStorage`, satisfying the requirement to "store and retrieve user details" while still acting like an API.
- **No External Dependency**: No need to rely on `mocky.io` uptime or CORS issues.

**Implementation Details**:

- Create `src/mocks/handlers.ts`: Define handlers for:
  - `GET /api/users`: Supports pagination (`?page=1&limit=10`) and filtering.
  - `GET /api/users/:id`: Get single user.
  - `POST /api/users/:id/status`: Update status (Blacklist/Activate).
- Create `src/mocks/db.ts`: A simple helper to read/write the 500 users to `localStorage`. Seed on first run using `generateMockUsers`.

## 2. TanStack Router Integration

**Goal**: Manage state via URL and load data declaratively.

### A. URL State (Search Params)

Refactor `src/routes/_protected/users` to define a Zod schema for search params:

```typescript
const usersSearchSchema = z.object({
  page: z.number().catch(1),
  limit: z.number().catch(10),
  search: z.string().optional(),
  org: z.string().optional(),
  status: z.enum(["Active", "Inactive", "Pending", "Blacklisted"]).optional(),
});
```

### B. Data Loading

Use the `loader` feature in TanStack Router:

- The loader will parse the search params.
- It will make the `fetch` call to our MSW endpoint.
- Return the data (users list + total count) to the component.
- **Benefit**: Data is fetched _before_ the component renders (no loading spinners inside the table for initial load).

## 3. UI Updates

- **Pagination**: Update the pagination controls to strictly use `<Link search={(prev) => ({ ...prev, page: newPage })} />`. This ensures the URL updates, which triggers the loader, which fetches new data.
- **Filter Form**: Update the filter form to serialize its state into the URL search params on submit.
- **User Details**: Fetch user data using a loader based on the `userId` param.

## 4. Execution Steps

1.  **Setup MSW**: Configure `handlers` and `db` adapter.
2.  **Verify MSW**: Ensure `fetch('/api/users')` returns data in the browser.
3.  **Refactor Users Route**: Add `validateSearch` and `loader`.
4.  **Update Users Component**: consume `useLoaderData` instead of local state.
5.  **Refactor User Details**: Connect logic to "Blacklist/Activate" buttons via API calls.
