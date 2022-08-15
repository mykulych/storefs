import React, { useState } from 'react';
import { Login } from '../../layout';
import { Cart } from '../../ui';
import { customHistory, ThemeToggle } from '../../../utils/helpers';
import { useModal } from '../../../hooks';
import NavButton from './navButton/navButton';
import PostAdLink from './postAdLink/postAdLink';
import { SunIcon, MoonIcon, UserIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { getLoggedInStatus } from '../../../store/auth/auth.selectors';

function HeaderNav() {
  const isLoggedIn = useSelector(getLoggedInStatus());
  const { showModal } = useModal();
  const [isDark, setIsDark] = useState(localStorage.getItem('color-theme') === 'light');

  const handleToggleTheme = () => {
    ThemeToggle();
    if (localStorage.getItem('color-theme') === 'light') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  };

  const handleUserIcon = () => {
    if (!isLoggedIn) {
      return showModal({ title: 'Sing in', closable: true, content: <Login /> });
    }
    customHistory.push('/cabinet/personal-data');
  };

  return (
    <ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-2 md:mt-0 md:text-sm md:font-medium">
      <li>
        <NavButton onClick={handleToggleTheme}>
          {isDark ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
        </NavButton>
      </li>
      <li>
        <NavButton onClick={handleUserIcon}>
          <UserIcon className="w-5 h-5" />
        </NavButton>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavButton onClick={() => customHistory.push('/cabinet/wishlist')}>
              <HeartIcon className="w-5 h-5" />
            </NavButton>
          </li>

          <li>
            <NavButton onClick={() => showModal({ title: 'Cart', closable: true, content: <Cart />, width: '1000px' })}>
              <ShoppingCartIcon className="w-5 h-5" />
            </NavButton>
          </li>
        </>
      )}
      <li>
        <PostAdLink />
      </li>
    </ul>
  );
}

export default HeaderNav;
