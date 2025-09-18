'use client'
import { Box, Button, Typography } from '@mui/material'
import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap';
const Content = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
   useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-section", {
        opacity: 0,
        x: -50,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <Box sx={{ textAlign: { xs: "center", md: "left" }, maxWidth: 600 }} ref={sectionRef}>
      <Typography
        className="hero-section"
        component="h1"
        variant="h3"
        fontWeight="bold"
        mb={3}
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          lineHeight: 1.2
        }}
      >
        Welcome to Official Manchester United Page.
      </Typography>
      <Typography
        className="hero-section"
        variant="h6"
        mb={4}
        color="text.secondary"
        sx={{
          fontSize: { xs: '1rem', md: '1.25rem' },
          px: { xs: 2, sm: 0 }
        }}
      >
        Manchester United is a professional football club based in Old Trafford, Manchester, England. The club competes in the Premier League, the top flight of English football.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1.1rem'
        }}
      >
        Learn more
      </Button>
    </Box>
  )
}

export default Content
