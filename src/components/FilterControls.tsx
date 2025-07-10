// src/components/FilterControls.tsx
import React from 'react';
import useTaskStore from '../store/store';

const FilterControls: React.FC = () => {
  const filterStatus = useTaskStore(state => state.filterStatus);
  const filterPriority = useTaskStore(state => state.filterPriority);
  const filterCategory = useTaskStore(state => state.filterCategory);
  const categories = useTaskStore(state => state.categories);

  const setFilterStatus = useTaskStore(state => state.setFilterStatus);
  const setFilterPriority = useTaskStore(state => state.setFilterPriority);
  const setFilterCategory = useTaskStore(state => state.setFilterCategory);

  const statusOptions = ['all', 'complete', 'incomplete'] as const;
  const priorityOptions = ['all', 'Low', 'Medium', 'High'] as const;

  return (
    <div className="filterControls">
      {/* Status Filter */}
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
        {statusOptions.map(status => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      {/* Priority Filter */}
      <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value as any)}>
        {priorityOptions.map(priority => (
          <option key={priority} value={priority}>
            {priority === 'all' ? 'All Priorities' : priority}
          </option>
        ))}
      </select>

      {/* Category Filter */}
      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterControls;
