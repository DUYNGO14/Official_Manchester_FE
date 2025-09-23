/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { logoutAction, makeSelectAuth } from '@/app/stores/reduces/auth';
import { makeSelectUser, makeSelectUserIsCalling } from '@/app/stores/reduces/user';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import UserProfile from '@/app/components/common/UserProfile';

export interface HeaderProps {
  user: any;
  isCalling: boolean;
  pathname: string | null;
  handleLogout: () => void;
}

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector(makeSelectAuth);
  const user = useSelector(makeSelectUser);
  const isCalling = useSelector(makeSelectUserIsCalling);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (auth.isSuccess && auth.type === 'logout') {
      router.push('/auth/login');
    }
  }, [router, auth]);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  // Show loading placeholder during hydration
  if (!mounted) {
    return (
      <Box
        sx={{
          height: '64px',
          width: '100%',
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      />
    );
  }

  return (
    <>
      <UserProfile />
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