import React from 'react';

type Props = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

const DarkModeToggle: React.FC<Props> = ({ dark, setDark }) => (
  <button onClick={() => setDark(!dark)}>
    {dark ? '🌙 Dark' : '☀️ Light'}
  </button>
);

export default DarkModeToggle;
