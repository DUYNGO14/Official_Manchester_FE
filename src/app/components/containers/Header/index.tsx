/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { logoutAction, makeSelectAuthData } from '@/app/stores/reduces/auth';
import { makeSelectUser, makeSelectUserIsCalling } from '@/app/stores/reduces/user';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

export interface HeaderProps {
  user: any;
  isCalling: boolean;
  pathname: string | null;
  handleLogout: () => void;
}

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(makeSelectUser);
  const isCalling = useSelector(makeSelectUserIsCalling);
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const pathname = usePathname();
  return (
    <>
      <HeaderDesktop
        user={user}
        isCalling={isCalling}
        pathname={pathname}
        handleLogout={handleLogout}
      />
      <HeaderMobile
        user={user}
        isCalling={isCalling}
        pathname={pathname}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Header;