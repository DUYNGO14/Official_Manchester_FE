import { Footer } from "@/app/components/containers/Footer";
import Header from "@/app/components/containers/Header";
import { Box, Stack } from "@mui/material";

export default function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <Stack minHeight="100vh">
      {/* Header */}
      <Box component="header" flexShrink={0} sx={{ position: "fixed", top: 0, zIndex: 1 }} >
        <Header />
      </Box>

      {/* Main */}
      <Box 
        component="main" 
        flexGrow={1} 
        overflow="auto"
        sx={{ pt: { md: "64px" } }} // Điều chỉnh giá trị này cho khớp với chiều cao header
      >
        {children}
      </Box>

      {/* Footer */}
      <Box component="footer" flexShrink={0}>
        <Footer />
      </Box>
    </Stack>
  );
}
