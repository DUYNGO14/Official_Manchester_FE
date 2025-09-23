'use client';
import DropDown from '@/app/components/containers/Header/DropDown';
import { ROUTE_LIST } from '@/app/components/containers/Header/router';
import { logoutAction, makeSelectAuth } from '@/app/stores/reduces/auth';
import { makeSelectUser, makeSelectUserIsCalling } from '@/app/stores/reduces/user';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Skeleton,
  Toolbar,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HeaderMobile = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const user = useSelector(makeSelectUser);
  const isCalling = useSelector(makeSelectUserIsCalling);
  const pathname = usePathname();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const { isSuccess } = useSelector(makeSelectAuth);
  useEffect(() => {
    if (isSuccess) {
      router.push('/auth/login');
    }
  })

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
        display: { xs: 'block', md: 'none' },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side - Logo */}
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              '&:hover': { color: 'primary.dark' },
            }}
          >
            <Image src="/logomu.png" alt="Logo" width={50} height={50} />
          </Typography>
        </Link>

        {/* Hamburger Menu Button */}
        <IconButton
          onClick={() => setDrawerOpen(true)}
          color="inherit"
          size="large"
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: '80%',
              maxWidth: 300,
              display: { xs: 'block', md: 'none' },
              '& .MuiBackdrop-root': {
                display: { xs: 'block', md: 'none' },
              },
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            {/* Navigation Links */}
            <List>
              {ROUTE_LIST.map((item) => (
                <ListItem
                  key={item.name}
                  component={Link}
                  href={item.path}
                  className={clsx({ active: pathname === item.path })}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&:hover': { backgroundColor: 'action.hover' },
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Authentication Section */}
            {isCalling ? (
              // Loading user -> Skeleton
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="80%" />
                </Box>
              </Box>
            ) : user ? (
              // Logged in -> Show user
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    mb: 2,
                  }}
                >
                  <Avatar
                    alt={user?.username || 'User'}
                    src={user?.avatar?.url || './user.png'}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {user?.username || 'User'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email || 'email'}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleMenuOpen}
                  sx={{ mb: 1 }}
                >
                  Account Options
                </Button>
                <DropDown
                  anchorEl={anchorEl}
                  handleMenuClose={handleMenuClose}
                  handleLogout={handleLogout}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: 'error.main',
                    color: 'error.contrastText',
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              // Not logged in
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <MuiLink underline="none" component={Link} href="/auth/login">
                  <Button fullWidth variant="contained" sx={{ fontWeight: 600 }}>
                    Login
                  </Button>
                </MuiLink>

                <MuiLink underline="none" component={Link} href="/auth/register">
                  <Button fullWidth variant="contained" sx={{ fontWeight: 600 }}>
                    Register
                  </Button>
                </MuiLink>
              </Box>
            )}
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMobile;
