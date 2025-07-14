import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTaskStore from '../store/store';

const SearchById: React.FC = () => {
  const { t } = useTranslation();
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const task = useTaskStore((s) => s.tasks.find((t) => String(t.id) === id.trim()));

  const handleJump = () => {
    if (task) navigate(`/editTask/${task.id}`);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        type="text"
        placeholder={t('search_id_placeholder')}
        value={id}
        onChange={(e) => setId(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleJump()}
        style={{ padding: '0.45rem 0.75rem', border: '2px solid #ccc', borderRadius: 6, width: 140 }}
      />
      <button
        disabled={!task}
        onClick={handleJump}
        style={{ padding: '0.45rem 0.9rem', borderRadius: 6, border: 'none',
                 background: task ? '#61dafb' : '#999', color: '#fff',
                 cursor: task ? 'pointer' : 'not-allowed' }}
      >
        {t('go')}
      </button>
      {id && (
        <span style={{ marginLeft: 8 }}>
          {task ? (
            <span style={{ color: 'green' }}>✅ {t('found')}</span>
          ) : (
            <span style={{ color: 'red' }}>❌ {t('not_found')}</span>
          )}
        </span>
      )}
    </div>
  );
};

export default SearchById;
