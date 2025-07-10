import React from 'react';
import useTaskStore from '../store/store';

const SearchBar: React.FC = () => {
  const search = useTaskStore((state) => state.search);
  const setSearch = useTaskStore((state) => state.setSearch);

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search tasks…"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
