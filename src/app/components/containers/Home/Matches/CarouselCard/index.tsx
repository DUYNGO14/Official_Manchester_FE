/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import CardMatch from '@/app/components/containers/matches/CardMatch';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  PlayArrow,
  Pause,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

const CardMatchCarousel = ({ matches }: { matches: any[] }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Calculate items visible based on screen size
  const getItemsVisible = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 4;
  };

  const itemsVisible = getItemsVisible();
  const totalItems = matches.length;
  const maxIndex = Math.max(0, totalItems - itemsVisible);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalItems <= itemsVisible) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000); // Tăng thời gian lên 4s cho mượt hơn
    
    return () => clearInterval(timer);
  }, [autoPlay, totalItems, itemsVisible, maxIndex]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
    setAutoPlay(false);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
    setAutoPlay(false);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(prev => !prev);
  };

  // Don't show carousel if there are no matches
  if (matches.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No matches available
        </Typography>
      </Box>
    );
  }

  // If not enough items to scroll, just display them
  if (matches.length <= itemsVisible) {
    return (
      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: 'repeat(1, 1fr)', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)' 
            },
            gap: 3,
            maxWidth: '1400px',
            mx: 'auto',
            px: 2
          }}
        >
          {matches.map((match) => (
            <Box key={match.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardMatch match={match} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        py: 2,
        px: 2
      }}
    >
      {/* Carousel Container */}
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: `translateX(-${activeIndex * (100 / itemsVisible)}%)`,
          willChange: 'transform',
        }}
      >
        {matches.map((match, index) => (
          <Box
            key={index}
            sx={{
              flex: `0 0 ${100 / itemsVisible}%`,
              minWidth: 0,
              px: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CardMatch match={match} />
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'background.paper',
          boxShadow: 3,
          zIndex: 2,
          '&:hover': {
            backgroundColor: 'background.default',
          },
          display: { xs: 'none', sm: 'flex' },
        }}
        size="large"
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'background.paper',
          boxShadow: 3,
          zIndex: 2,
          '&:hover': {
            backgroundColor: 'background.default',
          },
          display: { xs: 'none', sm: 'flex' },
        }}
        size="large"
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

export default CardMatchCarousel;