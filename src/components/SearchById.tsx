import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../store/store';      // غيّري المسار لو مختلف

const SearchById: React.FC = () => {
  const [id, setId] = useState('');
  const navigate    = useNavigate();

  /* ابحث فى المصفوفة عن أول ID يطابق القيمة المكتوبة */
  const task = useTaskStore(
    (s) => s.tasks.find((t) => t.id === id.trim())
  );

  /* إن أردتِ فتح صفحة تعديل المهمة مباشرة */
  const handleJump = () => {
    if (task) navigate(`/editTask/${task.id}`);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        type="text"
        placeholder="Search by ID…"
        value={id}
        onChange={(e) => setId(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleJump()}
        style={{
          padding: '0.45rem 0.75rem',
          border: '2px solid #ccc',
          borderRadius: 6,
          width: 140,
        }}
      />

      {/* اختياري: زر Go لفتح المهمة مباشرة */}
      <button
        disabled={!task}
        onClick={handleJump}
        style={{
          padding: '0.45rem 0.9rem',
          borderRadius: 6,
          border: 'none',
          background: task ? '#61dafb' : '#999',
          color: '#fff',
          cursor: task ? 'pointer' : 'not-allowed',
        }}
      >
        Go
      </button>

      {/* رسالة حالة البحث */}
      {id && (
        <span style={{ marginLeft: 8 }}>
          {task ? (
            <span style={{ color: 'green' }}>✅ {task.title}</span>
          ) : (
            <span style={{ color: 'red' }}>❌ Not found</span>
          )}
        </span>
      )}
    </div>
  );
};

export default SearchById;
