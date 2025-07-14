import React from 'react';
import { useTranslation } from 'react-i18next';
import useTaskStore from '../store/store';

const FilterControls: React.FC = () => {
  const { t } = useTranslation();

  const filterStatus   = useTaskStore((s) => s.filterStatus);
  const filterPriority = useTaskStore((s) => s.filterPriority);
  const filterCategory = useTaskStore((s) => s.filterCategory);
  const categories     = useTaskStore((s) => s.categories);

  const setFilterStatus   = useTaskStore((s) => s.setFilterStatus);
  const setFilterPriority = useTaskStore((s) => s.setFilterPriority);
  const setFilterCategory = useTaskStore((s) => s.setFilterCategory);

  const statusOptions   = ['all', 'complete', 'incomplete'] as const;
  const priorityOptions = ['all', 'Low', 'Medium', 'High'] as const;

  return (
    <div className="filterControls">
      {/* Status */}
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {t(`filters.status.${status}`)}
          </option>
        ))}
      </select>

      {/* Priority */}
      <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value as any)}>
        {priorityOptions.map((p) => (
          <option key={p} value={p}>
            {p === 'all' ? t('filters.priority.all') : t(`taskform.${p.toLowerCase()}`)}
          </option>
        ))}
      </select>

      {/* Category */}
      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="all">{t('filters.category.all')}</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterControls;
