import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (value: string) => void;
  queryText: string;
}

export default function SearchBox({ onSearch, queryText }: SearchBoxProps) {
  return (
    <input
      onChange={(e) => onSearch(e.target.value.trim())}
      defaultValue={queryText}
      className={css.input}
      type="text"
      placeholder="Search posts"
    />
  );
}
