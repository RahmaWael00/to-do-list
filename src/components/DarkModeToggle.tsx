// DarkModeToggle.tsx
import React, { useEffect, useState } from 'react';

type DarkModeToggleProps = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ dark, setDark }) => {
  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default DarkModeToggle;
