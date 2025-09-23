'use client';

import { IPlayer } from "@/app/types/IPlayer";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface PlayerCardProps {
  player: IPlayer;
}

export default function PlayerCard({ player }: PlayerCardProps) {

  return (
    <Link href={`/players/detail/${player.slug}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          maxHeight: 400,
          boxShadow: 3,
          cursor: "pointer",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        {/* Background image */}
        <Box
          sx={{
            backgroundImage: ` url(${player.image})`,
            backgroundColor: "grey.700",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            width: "100%",
            aspectRatio: "3/4",
          }}
        />

        {/* Overlay + info */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            p: 2,
            background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "start", gap: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: "0.875rem",
                mb: 0.5,
              }}
            >
              NUMBER : {player.jerseyNumber || 10}
            </Typography>
            <Typography
            variant="body2"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "0.875rem",
              mb: 0.5,
            }}
          >
             POSITION: {player.position || "Position"}
          </Typography>
          </Box>


          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 700,
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            {player.fullName || "Player Name"}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
