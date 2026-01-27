# How to Stand Out: Lendsqr Frontend Assessment

This guide outlines specific actions to take your implementation from "functional" to "world-class," directly addressing the assessment criteria.

## 🚨 Critical Missing Requirements (Must Do First)

The assessment has specific technical requirements we haven't fully met yet:

1.  **LocalStorage / IndexedDB Persistence**:
    - **Requirement**: "Use local storage or IndexedDB to store and retrieve user details on the user details page."
    - **Action**: Currently we generate fresh data on reload. We must persist the user list (especially status changes like 'Blacklist') to `localStorage`.
    - **Standout Move**: Create a custom hook `useLocalStorageState` that seamlessly syncs your data.
2.  **Unit Testing**:
    - **Requirement**: "You must apply positive and negative scenario testing."
    - **Action**: Add Vitest + React Testing Library.
    - **Test Cases**:
      - Login form validation (empty fields, wrong password).
      - Filtering logic (check if correct users are returned).
      - Status badge rendering (Active = green, etc.).
3.  **Mock API**:
    - **Requirement**: "Mock your APIs using common tools such as mocky.io or json-generator.com."
    - **Action**: Instead of `data.ts`, fetch the initial list from a URL (e.g., Mocky.io) and _then_ cache it in LocalStorage.
    - **Standout Move**: Handle loading states and error states gracefully (e.g., retry button).

## 🎨 Visual Fidelity & UX (The "Premium" Feel)

"Visual fidelity... must be picture and pixel-perfect" is a huge emphasis.

1.  **Font Accuracy**:
    - Verify the font family is `Work Sans` (common in Lendsqr designs) or exactly what Figma uses.
    - Check line-heights and letter-spacing.
2.  **Micro-Interactions**:
    - Add subtle hover states to _everything_ clickable (rows, buttons, icons).
    - Add a transition to the Sidebar collapse (we have a basic one, smooth it out).
    - **Standout Move**: Animate the "User Details" page entry (slide in or fade in).
3.  **Loading Skeletons**:
    - Instead of a spinner, use **Skeleton Loaders** (gray bars pulsing) that match the table row layout. This screams "professional polish."
4.  **Empty States**:
    - What happens if a filter returns 0 users? Design a beautiful "No Users Found" state with an illustration.

## 💻 Code Quality & Architecture

1.  **Accessibility (a11y)**:
    - Ensure all `<img>` have meaningful `alt` text.
    - Ensure buttons have `aria-label` where text isn't visible (like the filter icon).
    - **Standout Move**: Verify you can navigate the entire table and filter menu using _only_ the keyboard.
2.  **Error Boundaries**:
    - Wrap the app in an Error Boundary component to show a nice "Something went wrong" page instead of a white screen crash.
3.  **Performance**:
    - Run a Lighthouse audit. Aim for 100/100.
    - Lazy load the `UserDetailsPage` route (`component: () => import(...)`).

## 🧙‍♂️ Code Mastery & Best Practices

1.  **Custom Hooks**:
    - Don't just write 50 lines of `useEffect` in your component.
    - **Standout Move**: Extract `useUsers`, `useFilter`, `usePagination` into `src/hooks`. This shows architectural maturity.
2.  **Immutability**:
    - When updating state (like blacklisting), ensure you create a _new_ array/object. Show you understand React rendering.
3.  **Environment Variables**:
    - Store your API URL in `.env` (`VITE_API_URL`). Never hardcode mocked URLs.
4.  **Responsive Tables (Advanced)**:
    - On mobile, a scrolled table is "ok".
    - **Standout Move**: Use CSS Grid or Flex to transform the table row into a "Card" layout on mobile. This is much harder but very impressive.

## 🤖 DevOps & Workflow

1.  **Conventional Commits**:
    - Use commit messages like `feat: add user details page` or `fix: resolve sidebar z-index`.
2.  **Linting & Formatting**:
    - Ensure there are no console warnings.
    - Add a `pre-commit` hook (husky) if you want to be fancy.
3.  **CI/CD (Bonus)**:
    - Add a simple `.github/workflows/test.yml` that runs `npm test` on push. Even if it just runs 1 test, it shows you know how pipelines work.

## 🧠 Seniority Signals & Scalability

These are the things that make an interviewer nod and think "Ah, they've worked on real complex apps."

1.  **Virtualization for Large Lists**:
    - **The Problem**: Rendering 500 rows is fine. Rendering 5,000 crashes the browser.
    - **The Standout Move**: Mention in your README (or implement!) `react-window` or `tanstack-virtual` for the user table. Even if you don't implement it, acknowledging the scaling limit shows foresight.
2.  **Robust Form Handling (Zod)**:
    - **The Problem**: `useState` for forms is messy.
    - **The Fix**: Use `react-hook-form` + `zod` for the filter inputs. Validate that "Phone Number" is actually digits, or "Email" is valid.
    - **Why it stands out**: Data integrity is huge in Fintech (Lendsqr).
3.  **Component Driven Development (Storybook)**:
    - **The Standout Move**: Add Storybook and create a story for just the `StatusBadge` or `UserCard`.
    - **Why?**: It shows you think about components in isolation, not just page-soup.
4.  **Security Awareness**:
    - **The Standout Move**: In your README, write a "Security" section.
    - Mention how you would handle Auth Tokens (HttpOnly cookies vs LocalStorage).
    - Mention sanitizing inputs against XSS.
    - Even if you mock it, _talking about it_ sets you apart.
    * Even if you mock it, _talking about it_ sets you apart.

## 🚀 The "Overachiever" Extras (Enterprise Grade)

1.  **Internationalization (i18n)**:
    - **The Standout Move**: Use `react-i18next`. Even if you only support English, wrapping strings in `t('login.email_placeholder')` shows you're building for a global product, not a school project.
2.  **Offline Support (PWA)**:
    - **The Standout Move**: Add `vite-plugin-pwa`. It's almost zero config.
    - **Why?**: Shows you care about users with bad internet (common in emerging markets like Nigeria).
3.  **Bundle Analysis**:
    - **The Standout Move**: Run `npx vide-bundle-visualizer` and include a screenshot in your PR.
    - Explain how you code-split the Dashboard from the Landing Page.
4.  **State Machines (XState)**:
    - **The Standout Move**: Instead of complex boolean flags for the filter form (`isLoading`, `isError`, `data`), model it as a state machine. It eliminates impossible states.

## 📝 Documentation (The Secret Weapon)

The assessment explicitly asks for a "Review of your work" document.

1.  **README.md**:
    - Bad: "Usage: npm start".
    - Good: detailed architectural decisions, folder structure explanation, and "Why I chose X over Y".
2.  **Technical Decisions Log**:
    - Explaining _why_ you chose TanStack Router (type safety!) vs React Router.
    - Explaining _why_ you used SCSS modules vs Tailwind (per requirement).
    - Addressing the "Mock Data vs API" trade-off explicitly.
3.  **The Video**:
    - Record a Loom. **Show your face**.
    - Walk through the _code_ briefly, but focus on the _user experience_.
    - Show off the responsiveness (resize the window live).
    - Mention the "Standout" features you added (Sustainability, Accessibility).

## 🚀 Recommended Next Steps Order

1.  **Persistence**: Implement `localStorage` for the Users Context.
2.  **Mock API**: Move the initial data generation to a `fetch` call.
3.  **Testing**: Write 3-5 high-value tests.
4.  **Polish**: Add the Skeleton loaders and Empty states.
5.  **Docs**: Write the killer README.
