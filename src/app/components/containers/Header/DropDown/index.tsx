'use client';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

// Better type definitions
interface DropDownProps {
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
  handleLogout: () => void;
}

interface MenuItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

const DropDown: React.FC<DropDownProps> = ({
  anchorEl,
  handleMenuClose,
  handleLogout,
}) => {
  const router = useRouter();
  const listMenu: MenuItem[] = [
    {
      title: 'Profile',
      path: '/profile',
      icon: <ManageAccountsIcon />,
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <SettingsIcon />,
    },
  ];

  const handleMenuItemClick = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    handleLogout();
  };

  // Common menu item styles
  const menuItemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    py: 1,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'primary.light',
      color: 'white',
      '& .MuiSvgIcon-root': {
        color: 'white',
      },
    },
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1.5,
          minWidth: 250,
          borderRadius: 2,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {listMenu.map((item) => (
        <MenuItem
          key={item.title}
          sx={menuItemStyles}
          onClick={() => handleMenuItemClick(item.path)}
        >
          <Typography variant="body2">{item.title}</Typography>
          {item.icon && (
            <IconButton
              size="small"
              sx={{ pointerEvents: 'none' }}
              aria-hidden="true"
            >
              {item.icon}
            </IconButton>
          )}
        </MenuItem>
      ))}

      {/* Divider for visual separation */}
      <MenuItem
        sx={{
          ...menuItemStyles,
          borderTop: '1px solid',
          borderColor: 'divider',
          mt: 0.5,
        }}
        onClick={handleLogoutClick}
      >
        <Typography variant="body2">Logout</Typography>
        <IconButton
          size="small"
          sx={{ pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <LogoutIcon />
        </IconButton>
      </MenuItem>
    </Menu>
  );
};

export default DropDown;