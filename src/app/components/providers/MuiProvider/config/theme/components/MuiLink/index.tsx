import { Theme, Components } from '@mui/material/styles';

const MuiLink: Components<Theme>['MuiLink'] = {
  defaultProps: {
    underline: 'hover',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.primary,
      textDecoration: "none",
      fontWeight: "600",
      cursor: "pointer",
      position: "relative",
      transition: "color 0.3s ease",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-2px",
        left: 0,
        width: "0%",
        height: "2px",
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        transition: "width 0.3s ease",
      },
      "&:hover": {
        color: theme.palette.primary.main,
        "&::after": {
          width: "100%",
        },
      },

      // 👇 Thêm style cho active
      "&.active": {
        color: theme.palette.primary.main,
        "&::after": {
          width: "100%",
        },
      },

      "&.MuiLink-underlineNone": {
        textDecoration: "none",
      },
      "&.MuiLink-underlineHover": {
        textDecoration: "none",
      },
      "&.MuiLink-underlineAlways": {
        "&::after": {
          width: "100%",
        },
      },
    }),
  },
};


export default MuiLink;