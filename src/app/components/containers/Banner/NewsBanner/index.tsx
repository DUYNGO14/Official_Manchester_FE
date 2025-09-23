import StyleBannerContainer from '@/app/components/atom/StyleBannerContainer';
import { Container, Typography, Link as MuiLink, Box } from '@mui/material';
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

const NewsBanner = forwardRef<HTMLDivElement, Props>(({ 
  title, 
  image, 
  isDisabled = true, 
  href = "#",
  variant = "h1",
  maxWidth = "lg",
  overlay = true,
  className = ""
}: Props, ref) => {
  
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
        mb: 2,
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        fontSize: {
          xs: variant === 'h1' ? '2rem' : undefined,
          sm: variant === 'h1' ? '2.5rem' : undefined,
          md: variant === 'h1' ? '3rem' : undefined,
          lg: variant === 'h1' ? '3.5rem' : undefined,
        },
        lineHeight: {
          xs: 1.2,
          md: 1.1
        },
        // Hover effect chỉ khi không disabled
        ...(!isDisabled && {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.02) translateY(-2px)',
            textShadow: '3px 3px 8px rgba(0,0,0,0.8)',
            cursor: 'pointer'
          },
          '&:active': {
            transform: 'scale(1.01) translateY(-1px)',
          }
        }),
        // Disabled state
        ...(isDisabled && {
          cursor: 'default'
        })
      }}
      className={className}
    >
      {displayTitle.toUpperCase()}
    </Typography>
  );

  return (
    <StyleBannerContainer backgroundImage={image} ref={ref}>
      {/* Optional overlay for better text readability */}
      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
            zIndex: 1
          }}
        />
      )}
      
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
          {isDisabled ? (
            // Disabled state: Typography only
            titleTypography
          ) : (
            // Enabled state: Clickable link
            <MuiLink 
              component={Link} 
              href={href}
              underline="none"
              sx={{ 
                display: 'inline-block',
                width: 'fit-content',
                '&:focus-visible': {
                  outline: '2px solid white',
                  outlineOffset: '4px',
                  borderRadius: 1
                }
              }}
              aria-label={`Read article: ${displayTitle}`}
            >
              {titleTypography}
            </MuiLink>
          )}
          
          {/* Optional subtitle or breadcrumb can be added here */}
        </Box>
      </Container>
    </StyleBannerContainer>
  );
});

NewsBanner.displayName = 'NewsBanner';

export default NewsBanner;