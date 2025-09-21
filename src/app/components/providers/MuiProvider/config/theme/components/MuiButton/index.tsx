import { Theme, Components } from '@mui/material/styles';

// MuiButton Theme Override
const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: "25px", // Base cho tất cả buttons
      textTransform: "none",
      fontWeight: "600",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
    }),
    containedPrimary: ({ theme }) => ({
      marginTop: theme.spacing(3),
      padding: theme.spacing(2, 4),
      borderRadius: "25px",
      fontSize: "16px",
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      color: theme.palette.primary.contrastText,
      boxShadow: `0 8px 25px ${theme.palette.primary.main}30`,
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        transition: "left 0.5s",
      },
      "&:hover": {
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        boxShadow: `0 12px 35px ${theme.palette.primary.main}40`,
        transform: "translateY(-2px)",
        "&::before": {
          left: "100%",
        },
      },
      "&:active": {
        transform: "translateY(0px)",
      },
      "&:disabled": {
        background: `linear-gradient(135deg, ${theme.palette.grey[300]} 0%, ${theme.palette.grey[400]} 100%)`,
        color: theme.palette.text.disabled,
        boxShadow: "none",
        "&::before": {
          display: "none",
        },
      },
    }),
    // Các variants khác cũng có base styles
    outlined: ({ theme }) => ({
      borderColor: theme.palette.grey[300],
      color: theme.palette.text.primary,
      "&:hover": {
        borderColor: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main}08`,
        color: theme.palette.primary.main,
        transform: "translateY(-1px)",
      },
    }),
    text: ({ theme }) => ({
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: `${theme.palette.primary.main}08`,
        color: theme.palette.primary.main,
      },
    }),
  },
};

export default MuiButton