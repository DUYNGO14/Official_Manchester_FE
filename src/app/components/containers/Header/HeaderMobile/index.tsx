/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { HeaderProps } from '@/app/components/containers/Header';
import { ROUTE_LIST } from '@/app/components/containers/Header/router';
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
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Link as MuiLink
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const HeaderMobile = ({
  token,
  user,
  pathname,
  handleLogout
}: HeaderProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
        display: { xs: 'block', md: 'none' }
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
            <Image src='/logomu.png' alt="Logo" width={50} height={50} />
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
              width: '80%', maxWidth: 300, display: { xs: 'block', md: 'none' },
              '& .MuiBackdrop-root': {
                display: { xs: 'block', md: 'none' }
              }
            }
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
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&:hover': { backgroundColor: 'action.hover' }
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
            {token && user ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'primary.main',
                      fontSize: '1rem',
                    }}
                  >
                    {user?.username.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {user?.email || 'User'}
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
               
                  <Button fullWidth variant="outlined" sx={{backgroundColor: 'error.main',  color: 'error.contrastText'}} onClick={handleLogout}>
                    Logout
                  </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1,
                      minWidth: 200,
                    },
                  }}
                >
                  <MenuItem onClick={() => { handleMenuClose(); setDrawerOpen(false); }}>
                    <Typography variant="body2">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); setDrawerOpen(false); }}>
                    <Typography variant="body2">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); setDrawerOpen(false); }}>
                    <Typography variant="body2">Settings</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem >
                    <Typography variant="body2" color="error">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                <MuiLink underline="none" component={Link} href="/auth/login">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      fontWeight: 600,
                    }}
                  >Login</Button>
                </MuiLink>

                <Link href="/auth/register" passHref style={{ textDecoration: 'none' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMobile;