import React from 'react';
import { useTranslation } from 'react-i18next';
import useTaskStore from '../store/store';

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const search = useTaskStore((s) => s.search);
  const setSearch = useTaskStore((s) => s.setSearch);

  return (
    <input
      type="text"
      className="search-input"
      placeholder={t('search_placeholder')}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
