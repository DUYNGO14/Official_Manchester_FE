
import { Box } from "@mui/material";
import { Metadata } from "next";
export const metadata : Metadata = {
  title: "Home Page",
  description: "This is the home page layout",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      {children}
    </Box>
  );
}
