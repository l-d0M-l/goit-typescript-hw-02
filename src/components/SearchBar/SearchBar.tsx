import css from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import React, { useRef, MouseEvent } from "react";

interface SearchBarProps {
  onSearch: (searchInfo: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    //show the error message if the message is blank
    if (inputRef.current?.value.trim().length === 0) {
      toast.error("You have to enter something!", {
        position: "top-left",
        style: {
          fontSize: "12px",
          padding: "4px 8px",
          margin: "4px",
          borderRadius: "4px",
        },
      });
      inputRef.current.value = ""; //clear the input after
      return;
    }
    if (inputRef.current) {
      onSearch(inputRef.current.value);
      inputRef.current.value = ""; //clear the input after
    }
  }
  return (
    <header className={css.searchBar}>
      <form className={css.inputWrapper}>
        <input
          type="text"
          className={css.input}
          placeholder="Search photos and images"
          ref={inputRef}
        />
        <button type="submit" className={css.searchBtn} onClick={handleClick}>
          <CiSearch className={css.searchIcon} size="18" />
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
