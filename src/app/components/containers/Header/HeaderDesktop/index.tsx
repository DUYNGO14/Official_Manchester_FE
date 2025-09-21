/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { HeaderProps } from '@/app/components/containers/Header';
import DropDown from '@/app/components/containers/Header/DropDown';
import { ROUTE_LIST } from '@/app/components/containers/Header/router';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Link as MuiLink,
  Skeleton,
  Toolbar,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { is } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const HeaderDesktop = ({ user, isCalling, pathname, handleLogout }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
          {/* Left side - Logo */}
          <Link href="/" passHref>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                '&:hover': { color: 'primary.dark' },
                display: 'inline-flex', // Added for proper image alignment
              }}
            >
              <Image src='/logomu.png' alt="Logo" width={50} height={50} />
            </Typography>
          </Link>

          {/* Center - Navigation Links */}
          <Box sx={{ display: 'flex', gap: 5, mx: 4 }}>
            {ROUTE_LIST.map((item) => (

              <MuiLink component={Link} href={item.path} key={item.path}
                className={clsx({ active: pathname === item.path })}
                underline="none"
              >
                {item.name}
              </MuiLink>

            ))}
          </Box>

          {/* Right side - Auth Buttons / User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {
              (!user && isCalling) ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="rectangular" width={70} height={20} />
                </Box>
              ) :
                (user && !isCalling) ? (
                  <>
                    <Button
                      onClick={handleMenuOpen}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        textTransform: 'none',
                        color: 'text.primary',
                      }}
                    >
                      <Avatar
                        src={user?.avatar?.url || '/user.png'}
                        alt={user?.username || 'User'}
                        sx={{
                          width: 40,
                          height: 40,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', fontSize: '0.875rem' }}
                      >
                        {user?.username || 'User'}
                      </Typography>
                    </Button>

                    <DropDown anchorEl={anchorEl} handleMenuClose={handleMenuClose} handleLogout={handleLogout} />
                  </>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <MuiLink component={Link} href="/auth/login" underline="none">
                      <Button
                        variant="outlined"
                        sx={{
                          fontWeight: 600,
                          borderWidth: 2,
                          '&:hover': { borderWidth: 2 },
                        }}
                      >
                        Login
                      </Button>
                    </MuiLink>
                  </Box>
                )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderDesktop;