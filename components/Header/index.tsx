import { FC, useEffect, useState } from 'react';

import useCustomColor from 'hooks/useCustomColor';
import Nav from '../Nav';
import style from './style.module.css';

const Header: FC<{}> = () => {
  const [darkModeActive, setDarkModeActive] = useState<boolean>(false);
  useEffect(() => {
    const updateDarkModeState = () => {
      const isActive = JSON.parse(window.localStorage.getItem('darkModeActive') || 'false');
      setDarkModeActive(isActive);

      const fg = isActive ? 'white' : 'dark';
      const bg = isActive ? 'dark' : 'white';
      document.body.setAttribute('style', `--fg: var(--${fg}); --bg: var(--${bg});`);
    };

    window.addEventListener('updateDarkMode', updateDarkModeState);
    updateDarkModeState();

    return () => {
      window.removeEventListener('updateDarkMode', updateDarkModeState);
    };
  }, []);

  const toggleDarkMode = () => {
    const isActive = JSON.parse(window.localStorage.getItem('darkModeActive') || 'false');
    window.localStorage.setItem('darkModeActive', JSON.stringify(!isActive));
    window.dispatchEvent(new CustomEvent('updateDarkMode'));
  }

  return <header className={style.header} id="header">
    <div className={`${style.header__inner} contain-width`}>
      <Nav darkModeActive={darkModeActive} onDarkModeToggle={toggleDarkMode} />
      <div className={useCustomColor(style.header__logo)}></div>
    </div>
  </header>;
};

export default Header;
