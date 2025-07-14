import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

const DarkModeToggle: React.FC<Props> = ({ dark, setDark }) => {
  const { t } = useTranslation();
  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? `☀️ ${t('theme.light')}` : `🌙 ${t('theme.dark')}`}
    </button>
  );
};

export default DarkModeToggle;
