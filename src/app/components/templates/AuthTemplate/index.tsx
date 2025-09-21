"use client";
import React, { ReactNode } from "react";
import { Container, Grid, Box } from "@mui/material";

export default function AuthTemplate({ children }: { children: ReactNode }) {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          <Grid
            size={{
              xs: 12,
              md: 12,
            }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
