"use client";

import { SearchIcon } from "@/design-system";
import { useState } from "react";

/**
 * Props for the SearchBar component.
 */
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

/**
 * SearchBar component that provides an input field for user search queries,
 * accompanied by a search icon.
 *
 * @component
 * @param {SearchBarProps} props - The component props.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
export function SearchBar({
  placeholder = "Search",
  onSearch,
}: SearchBarProps): JSX.Element {
  const [query, setQuery] = useState(""); // State to store the search query

  return (
    <div className="relative flex items-center bg-[#F3F4F6] border border-[#CACACA] px-4 py-2 min-w-sm rounded-xl min-w-[12rem] w-[20rem]">
      {/* Search Icon */}
      <SearchIcon className="w-5 h-5" />

      {/* Search Input Field */}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="ml-2 text-[0.9rem] bg-transparent focus:outline-none w-full"
      />
    </div>
  );
}
