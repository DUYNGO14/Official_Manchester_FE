import { Theme, Components } from '@mui/material/styles';
const MuiTextField: Components<Theme>['MuiTextField'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      "& .MuiOutlinedInput-root": {
        borderRadius: "16px",
        backgroundColor: theme.palette.grey[50],
        transition: "all 0.3s ease",
        border: "2px solid transparent",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light,
          },
        },
        "&.Mui-focused": {
          backgroundColor: theme.palette.background.paper,
          boxShadow: `0 4px 20px ${theme.palette.primary.main}15`,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
          },
        },
        "&.Mui-error": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
        },
        "&.Mui-disabled": {
          backgroundColor: theme.palette.grey[200],
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.grey[300],
          },
        },
      },
      "& .MuiInputLabel-root": {
        fontWeight: "500",
        color: theme.palette.text.secondary,
        "&.Mui-focused": {
          color: theme.palette.primary.main,
        },
        "&.Mui-error": {
          color: theme.palette.error.main,
        },
        "&.Mui-disabled": {
          color: theme.palette.text.disabled,
        },
      },
      "& .MuiFormHelperText-root": {
        fontSize: "0.75rem",
        marginLeft: theme.spacing(1),
        "&.Mui-error": {
          color: theme.palette.error.main,
        },
      },
    }),
  },
};

export default MuiTextField