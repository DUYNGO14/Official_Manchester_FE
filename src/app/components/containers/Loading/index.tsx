"use client";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box className="relative w-32 h-32 flex items-center justify-center">
        {/* Vòng xoay */}
        <CircularProgress
          size={120}
          thickness={2}
          sx={{
            color: "primary.main",
            position: "absolute",
          }}
        />

        {/* Logo */}
        <Image
          src="/logo.webp" 
          alt="Logo"
          width={64}
          height={64}
          className="rounded-full"
        />
      </Box>
    </Box>
  );
}
