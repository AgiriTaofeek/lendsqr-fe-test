import { useState, useEffect } from "react";

/**
 * Custom hook to track media query matches
 * @param query - Media query string (e.g., "(min-width: 1024px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    if (matches !== mediaQuery.matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMatches(mediaQuery.matches);
    }

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
