import { Box, Container, Stack } from "@mui/material";
import Content from "./Content";
import Logo from "./Logo";

export default function HeroSection() {
  return (
    <Box component="section" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 8 } }}>
      <Container>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Content />
          <Logo />
        </Stack>
      </Container>
    </Box>
  );
}