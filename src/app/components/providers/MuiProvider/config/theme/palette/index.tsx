import { PaletteOptions } from "@mui/material";

const palette: PaletteOptions = {
  mode: "light",
  primary: {
    main: '#c60100',      // Coral Red - màu chủ đạo
    light: '#ff9a9e',     // Lighter coral
    dark: '#ff5252',      // Darker coral
    contrastText: '#ffffff'
  },
  secondary: {
    main: '#4ecdc4',      // Teal - màu bổ trợ
    light: '#80deea',     // Light teal
    dark: '#26a69a',      // Dark teal
    contrastText: '#ffffff'
  },
  error: {
    main: '#E43636',      // Red error
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#ffffff'
  },
  warning: {
    main: '#ffb74d',      // Orange warning
    light: '#ffcc02',
    dark: '#f57c00',
    contrastText: '#000000'
  },
  info: {
    main: '#42a5f5',      // Blue info
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: '#ffffff'
  },
  success: {
    main: '#66bb6a',      // Green success
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff'
  },
  text: {
    primary: '#21243D',    // Dark blue-gray cho text chính
    secondary: '#6c757d',  // Medium gray cho text phụ
    disabled: '#adb5bd',   // Light gray cho disabled text
  },
  background: {
    default: '#fafbfc',    // Very light gray background
    paper: '#ffffff',      // White paper background
  },
  divider: '#e9ecef',      // Light gray divider
  grey: {
    50: '#f8f9fa',
    100: '#f1f3f4',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
  // Custom colors cho brand
  tonalOffset: 0.2,
};

export default palette;