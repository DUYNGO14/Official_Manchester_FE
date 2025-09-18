/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { logoutAction, makeSelectAuthData } from '@/app/stores/reduces/auth';

export interface HeaderProps {
  user: any;
  token: string | null;
  pathname: string | null;
  handleLogout: () => void;
}

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const pathname = usePathname();
  const auth = useSelector(makeSelectAuthData);
  console.log('auth', auth);
  return (
    <>
      <HeaderDesktop
        user={auth?.user}
        token={auth?.accessToken}
        pathname={pathname}
        handleLogout={handleLogout}
      />
      <HeaderMobile
        user={auth?.user}
        token={auth?.accessToken}
        pathname={pathname}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Header;