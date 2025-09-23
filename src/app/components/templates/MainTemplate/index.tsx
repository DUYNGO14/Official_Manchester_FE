import { Footer } from "@/app/components/containers/Footer";
import Header from "@/app/components/containers/Header";
import { Box, Stack } from "@mui/material";

export default function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      {/* Header */}
      <Box component="header" flexShrink={0} sx={{ position: "fixed", top: 0, zIndex: 1000, width: '100%' }} >
        <Header />
      </Box>

      {/* Main - Chiếm không gian còn lại và đẩy footer xuống dưới */}
      <Box 
        component="main" 
        flexGrow={1} 
        sx={{ 
          pt: { md: "64px" },
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>

      {/* Footer - Luôn ở dưới cùng */}
      <Box component="footer" flexShrink={0} sx={{ mt: 'auto' }}>
        <Footer />
      </Box>
    </Stack>
  );
}