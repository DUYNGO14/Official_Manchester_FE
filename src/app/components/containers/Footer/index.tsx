'use client';

import {
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  LocationOn,
  Phone,
  Twitter,
  WhatsApp,
  YouTube,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';


export function Footer() {
  const socialLinks = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com',
      icon: <Facebook />,
    },
    {
      label: 'Twitter',
      href: 'https://www.twitter.com',
      icon: <Twitter />,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com',
      icon: <Instagram />,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com',
      icon: <LinkedIn />,
    },
    {
      label: 'GitHub',
      href: 'https://www.github.com',
      icon: <GitHub />,
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com',
      icon: <YouTube />,
    },
    {
      label: 'WhatsApp',
      href: 'https://www.whatsapp.com',
      icon: <WhatsApp />,
    },
    {
      label: 'Email',
      href: 'mailto:KZ2kM@example.com',
      icon: <Email />,
    },
    {
      label: 'Phone',
      href: 'tel:+1234567890',
      icon: <Phone />,
    },
  ]
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.800',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" spacing={{ sx: 2, md: 4 }} display={'flex'} justifyContent={'center'} >
          {
            socialLinks.map((link, index) => (
              <IconButton
                key={index}
                aria-label={link.label}
                sx={{
                  color: 'white',
                  transition: 'all 0.3s ease-in-out',  
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    transform: 'translateY(-10px)',    
                  },
                }}
              >
                {link.icon}
              </IconButton>

            ))
          }
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={5} display={'flex'} justifyContent={'center'} >
          <Typography variant="body2" sx={{ mt: 2 }} >
            Copyright © 2023 Manchester United Fan Page.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}