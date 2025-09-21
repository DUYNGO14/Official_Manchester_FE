import StyleBannerContainer from '@/app/components/atom/StyleBannerContainer';
import StyleTeamLogo from '@/app/components/atom/StyleTeamLogo';
import { Button, Container, Typography, Link as MuiLink, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title?: string
  image?: string
}

const NewsBanner = ({ title, image }: Props) => {
  return (
      <StyleBannerContainer backgroundImage={image}>
        <Container 
          maxWidth="lg" 
          className="relative z-10 h-full flex items-end pb-8"
        >
          <Box className="w-full">
            <MuiLink component={Link} href="#" underline="none" sx={{ cursor: 'pointer', display: 'inline-block'} }>
              <Typography
                variant="h1"
                className="text-white font-semibold tracking-wide mb-2"
                sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  '&:hover': {scale: 1.1, transition: 'all 0.3s ease-in-out' }
                 }}
              >
                {title?.toUpperCase() || 'United in Numbers: Senne`s saving statsNews'.toUpperCase()}
              </Typography>
            </MuiLink>
          </Box>
        </Container>
      </StyleBannerContainer>
  );
};

export default NewsBanner;