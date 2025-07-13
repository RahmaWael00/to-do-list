import { useEffect, useState } from 'react';
export default function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return { dark, setDark };
}
