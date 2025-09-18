// StyledSocialButton.tsx
"use client";

import { Button, styled } from "@mui/material";

const StyledSocialButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: "12px",
  textTransform: "none",
  fontWeight: "500",
  border: `2px solid ${theme.palette.grey[300]}`,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.primary.light,
    transform: "translateY(-2px)",
    boxShadow: `0 6px 20px ${theme.palette.primary.main}15`,
    color: theme.palette.primary.main,
  },
  "&:focus": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
  },
}));

export default StyledSocialButton;