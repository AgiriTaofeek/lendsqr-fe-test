import { FaSearch } from "react-icons/fa";

export function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search for anything"
        aria-label="Search"
      />
      <button type="button" aria-label="Submit search">
        <FaSearch />
      </button>
    </div>
  );
}
