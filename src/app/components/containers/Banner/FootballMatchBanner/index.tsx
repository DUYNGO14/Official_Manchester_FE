import StyleBannerContainer from '@/app/components/atom/StyleBannerContainer';
import StyleTeamLogo from '@/app/components/atom/StyleTeamLogo';
import { Button, Container, Typography } from '@mui/material';
import Image from 'next/image';

interface MatchDataType {
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  kickOff: string;
  location: string;
  league: string;
  infoButton: string;
}
interface Props {
  matchData?: MatchDataType
  image?: string
}
const FootballMatchBanner = ({ matchData, image }: Props) => {
  return (
    <div className="w-full">
      <StyleBannerContainer backgroundImage={image}>
        <Container maxWidth="lg" className="relative z-10">
          {/* Premier League Header */}
          <div className="text-center mb-6">
            <Typography 
              variant="h6" 
              className="text-white font-semibold tracking-wide mb-2"
              sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
             {matchData?.league|| 'Premier League'}
            </Typography>
          </div>

          {/* Match Info */}
          <div className="text-center mb-8">
            <Typography 
              variant="h6" 
              className="text-gray-200 mb-1"
              sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              Saturday 20 September 2025
            </Typography>
            <Typography 
              variant="body1" 
              className="text-gray-300"
              sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              Kick Off 23:30
            </Typography>
          </div>

          {/* Teams Section */}
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {/* Manchester United */}
            <div className="text-center">
              <StyleTeamLogo className="mx-auto mb-4 bg-gradient-to-br from-red-600 to-red-800">
                <Image src="/Manchester_United.png" alt="Manchester United" width={100} height={100} style={{ objectFit: 'cover' }} />
              </StyleTeamLogo>
              <Typography 
                variant="h4" 
                className="text-white font-bold tracking-wider"
                sx={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  fontSize: { xs: '1.5rem', md: '2.5rem' }
                }}
              >
                MAN UTD
              </Typography>
              <Typography 
                variant="body2" 
                className="text-red-300 mt-1"
                sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                Manchester United
              </Typography>
            </div>

            {/* VS */}
            <div className="text-center px-4">
              <Typography 
                variant="h3" 
                className="text-white font-bold"
                sx={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                VS
              </Typography>
            </div>

            {/* Chelsea */}
            <div className="text-center">
              <StyleTeamLogo className="mx-auto mb-4">
                 <Image src="/Chelsea.png" alt="Manchester United" width={100} height={100} style={{ objectFit: 'cover' }} />
              </StyleTeamLogo>
              <Typography 
                variant="h4" 
                className="text-white font-bold tracking-wider"
                sx={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  fontSize: { xs: '1.5rem', md: '2.5rem' }
                }}
              >
                CHELSEA
              </Typography>
              <Typography 
                variant="body2" 
                className="text-blue-300 mt-1"
                sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                Chelsea FC
              </Typography>
            </div>
          </div>

          {/* Match Centre Button */}
          <div className="text-center">
            <Button variant="contained">
              MATCH CENTRE
            </Button>
          </div>
        </Container>
      </StyleBannerContainer>
    </div>
  );
};

export default FootballMatchBanner;