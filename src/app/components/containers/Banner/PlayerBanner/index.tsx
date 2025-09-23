import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { forwardRef } from 'react';

interface Props {
  title?: string
  image?: string
  isDisabled?: boolean
  href?: string
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  overlay?: boolean
  className?: string
}

const PlayerBanner = forwardRef<HTMLDivElement, Props>(({
  title,
  image,
  href = "#",
  variant = "h1",
  maxWidth = "lg",
  className = ""
}: Props) => {

  // Default title nếu không có
  const displayTitle = title || 'United in Numbers: Senne`s saving statsNews';

  // Typography component with common styles
  const titleTypography = (
    <Typography
      variant={variant}
      component={variant}
      sx={{
        color: 'white',
        fontWeight: 600,
        letterSpacing: '0.025em',
        m: 2,
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        fontSize: {
          xs: variant === 'h1' ? '1.5rem' : undefined,
          sm: variant === 'h1' ? '2rem' : undefined,
          md: variant === 'h1' ? '2.5rem' : undefined,
          lg: variant === 'h1' ? '3rem' : undefined,
        },
        lineHeight: {
          xs: 1.2,
          md: 1.1
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'scale(1.02) translateY(-2px)',
          textShadow: '3px 3px 8px rgba(0,0,0,0.8)',
          cursor: 'pointer'
        },
        '&:active': {
          transform: 'scale(1.01) translateY(-1px)',
        }
        ,
        cursor: 'pointer'
      }}
      className={className}
    >
      {displayTitle.toUpperCase()}
    </Typography>
  );

  return (
    <Link href={href} >
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          borderRadius: 2,
          boxShadow: 3,
          aspectRatio: '16/9', // giữ tỉ lệ ảnh
        }}
      >

        <Container
          maxWidth={maxWidth}
          sx={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            pb: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 3 }
          }}
        >
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '80%' } }}>
            {titleTypography}
          </Box>
        </Container>
      </Box>
    </Link>
  );
});

PlayerBanner.displayName = 'PlayerBanner';

export default PlayerBanner;