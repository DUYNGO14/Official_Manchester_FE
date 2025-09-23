/* eslint-disable @typescript-eslint/no-explicit-any */
// ProfilePage component
'use client'
import Loading from '@/app/components/containers/Loading';
import { getPlayerAction, makeSelectData } from '@/app/stores/reduces/player';
import { IPlayer } from '@/app/types/IPlayer';
import { Box, Button, Typography, IconButton, Tooltip } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calcAge } from '@/app/common/utils/calcAge';
import LightTooltip from '@/app/components/atom/StyleTooltips';

export default function DetailPlayer() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isCalling } = useSelector(makeSelectData);

  useEffect(() => {
    if (!data) {
      dispatch(getPlayerAction({}));
    }
  }, []);

  const players: any = data || [];
  const currentIndex = players.findIndex((p: IPlayer) => p.slug === slug);

  const currentPlayer = players[currentIndex];
  const prevPlayer = players[currentIndex - 1];
  console.log("prevPlayer", prevPlayer);
  const nextPlayer = players[currentIndex + 1];

  const handlePrevious = () => {
    if (prevPlayer) {
      router.push(`/players/detail/${prevPlayer.slug}`);
    }
  };

  const handleNext = () => {
    if (nextPlayer) {
      router.push(`/players/detail/${nextPlayer.slug}`);
    }
  };

  if (isCalling && !data) {
    return <Loading />;
  }
  return (
    <Box className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 relative overflow-hidden w-full" >
      {/* Navigation Arrows */}
      <LightTooltip title={prevPlayer?.fullName} placement="left">
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'background.paper',
            boxShadow: 3,
            zIndex: 2,
            '&:hover': {
              backgroundColor: 'gray.900',
              color: 'white',
            },
            display: { xs: 'none', sm: 'flex' },
          }}
          size="large"
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
      </LightTooltip>
      <LightTooltip title={nextPlayer?.fullName} placement="left">
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
              backgroundColor: 'gray.900',
              color: 'white',
            },
            display: { xs: 'none', sm: 'flex' },
          }}
          size="large"
        >
          <ChevronRight fontSize="large" />
        </IconButton>
      </LightTooltip>
      {/* Main Content Container */}
      <Box className="h-screen flex items-center justify-between px-8 lg:px-16">

        {/* Left Section - Player Info and Quote */}
        <Box className="flex-1 max-w-2xl">
          <Box sx={{ mb: 4 }}>
            <Typography
              component="div"
              className="text-6xl md:text-8xl font-bold text-white mb-2"
              sx={{
                fontSize: { xs: '3rem', md: '6rem' },
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1,
                mb: 1
              }}
            >
              {currentPlayer?.jerseyNumber}
            </Typography>

            <Typography
              component="div"
              sx={{
                maxWidth: 400,
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                mb: 3
              }}
            >
              {currentPlayer?.fullName?.toUpperCase()}
            </Typography>

            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
              sx={{
                backgroundColor: '#dc2626',
                color: 'white',
                px: 3,
                py: 1.5,
                borderRadius: 6,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: '#b91c1c',
                  color: 'white'
                },
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
              BUY SHIRT
            </Button>
          </Box>

          {/* Quote */}
          <Box className="text-white text-xl md:text-2xl font-light leading-relaxed max-w-xl">
            <Typography
              component="div"
              sx={{
                color: 'white',
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                fontWeight: 300,
                lineHeight: 1.6,
                maxWidth: '36rem',
                position: 'relative'
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: '3rem',
                  lineHeight: 1,
                  position: 'absolute',
                  left: '-1rem',
                  top: '-0.5rem'
                }}
              >
                &quot;
              </Typography>
              <span className="ml-4">
                {currentPlayer?.biography?.replace(/"/g, '').toUpperCase()}
              </span>
              <Typography
                component="span"
                sx={{
                  fontSize: '3rem',
                  lineHeight: 1,
                  ml: 1
                }}
              >
                &quot;
              </Typography>
            </Typography>
          </Box>
        </Box>

        {/* Center - Player Image */}
        <Box className="flex-1 flex justify-center items-center relative">
          <Box className="relative">
            {/* Background gradient circle */}
            <Box className="absolute inset-0  blur-3xl scale-150" />

            {/* Player image */}
            <Box
              className="relative"
              sx={{
                width: { xs: 280, md: 350, lg: 400 },
                height: { xs: 350, md: 550, lg: 550 }
              }}
            >
              <Image
                src={currentPlayer?.image}
                alt={currentPlayer?.fullName || 'Player'}
                fill
                className="object-cover"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Box>
        </Box>

        {/* Right Section - Stats */}
        <Box className="flex-1 flex flex-col items-end text-right z-10 max-w-xs">
          <Box className="mb-8">
            <Typography
              variant="body2"
              className="text-gray-400 text-sm md:text-base font-medium mb-2"
              sx={{
                color: '#9ca3af',
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 500,
                mb: 1
              }}
            >
              AGE
            </Typography>
            <Typography
              component="div"
              className="text-white text-4xl md:text-6xl font-bold"
              sx={{
                color: 'white',
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 'bold',
                lineHeight: 1
              }}
            >
              {calcAge(currentPlayer?.dateOfBirth || '')}
            </Typography>
          </Box>

          <Box className="mb-8">
            <Typography
              variant="body2"
              className="text-gray-400 text-sm md:text-base font-medium mb-2"
              sx={{
                color: '#9ca3af',
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 500,
                mb: 1
              }}
            >
              APPEARANCES
            </Typography>
            <Typography
              component="div"
              className="text-white text-4xl md:text-6xl font-bold"
              sx={{
                color: 'white',
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 'bold',
                lineHeight: 1
              }}
            >
              60
            </Typography>
          </Box>

          <Box className="mb-8">
            <Typography
              variant="body2"
              className="text-gray-400 text-sm md:text-base font-medium mb-2"
              sx={{
                color: '#9ca3af',
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 500,
                mb: 1
              }}
            >
              WEIGHT
            </Typography>
            <Typography
              component="div"
              className="text-white text-2xl md:text-3xl font-bold"
              sx={{
                color: 'white',
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 'bold',
                lineHeight: 1
              }}
            >
              {currentPlayer?.weight}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body2"
              className="text-gray-400 text-sm md:text-base font-medium mb-2"
              sx={{
                color: '#9ca3af',
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 500,
                mb: 1
              }}
            >
              HEIGHT
            </Typography>
            <Typography
              component="div"
              className="text-white text-2xl md:text-3xl font-bold"
              sx={{
                color: 'white',
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 'bold',
                lineHeight: 1
              }}
            >
              {currentPlayer?.height}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Background Pattern */}
      <Box className="absolute inset-0 opacity-5 pointer-events-none">
        <Box className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <Box className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
      </Box>
    </Box>
  );
}