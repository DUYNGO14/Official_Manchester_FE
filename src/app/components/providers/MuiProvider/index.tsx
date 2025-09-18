'use client';

import { ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

import { CssBaseline } from '@mui/material';
import theme from './config';

interface MuiThemeProvidersProps {
  children: ReactNode;
}

const MuiThemeProviders = ({ children }: MuiThemeProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProviders;