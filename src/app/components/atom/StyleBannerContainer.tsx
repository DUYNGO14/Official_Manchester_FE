'use client';
import { Box, styled } from "@mui/material";

interface StyleBannerContainerProps {
  backgroundImage?: string;
}

const StyleBannerContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'backgroundImage',
})<StyleBannerContainerProps>(({ theme, backgroundImage }) => ({
  position: 'relative',
  height: '80vh',
  background: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%), url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

export default StyleBannerContainer;