// StyledPaper.tsx (Bonus component)
"use client";

import { Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  boxShadow: `0px 20px 60px ${theme.palette.primary.main}08, 0px 5px 20px ${theme.palette.primary.main}04`,
  borderRadius: "24px",
  border: `1px solid ${theme.palette.grey[200]}`,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    // transform: "translateY(-8px)",
    boxShadow: `0px 30px 80px ${theme.palette.primary.main}12, 0px 8px 30px ${theme.palette.primary.main}06`,
  },
  "@keyframes shimmer": {
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
  },
}));

export default StyledPaper;