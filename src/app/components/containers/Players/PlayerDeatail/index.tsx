'use client'
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import Loading from '@/app/components/containers/Loading';
import LightTooltip from '@/app/components/atom/StyleTooltips';
import { getPlayerAction, makeSelectData } from '@/app/stores/reduces/player';
import { IPlayer } from '@/app/types/IPlayer';
import { calcAge } from '@/app/common/utils/calcAge';
import HeaderBack from '@/app/components/containers/Header/HedearBack';

// Constants
const STAT_STYLES = {
  label: {
    color: '#9ca3af',
    fontSize: { xs: '0.875rem', md: '1rem' },
    fontWeight: 500,
    mb: 1
  },
  value: {
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 1
  },
  largeValue: {
    fontSize: { xs: '2.5rem', md: '4rem' }
  },
  mediumValue: {
    fontSize: { xs: '1.5rem', md: '2rem' }
  }
};

const NAVIGATION_STYLES = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'background.paper',
  boxShadow: 3,
  zIndex: 2,
  display: { xs: 'none', sm: 'flex' },
  '&:hover': {
    backgroundColor: 'gray.900',
    color: 'white',
  }
};

// Memoized components
const NavigationButton = memo(({
  direction,
  player,
  onClick,
  disabled
}: {
  direction: 'prev' | 'next';
  player?: IPlayer;
  onClick: () => void;
  disabled: boolean;
}) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const position = direction === 'prev' ? { left: 10 } : { right: 10 };

  if (disabled) return null;

  return (
    <LightTooltip title={player?.fullName || ''} placement="left">
      <IconButton
        onClick={onClick}
        sx={{ ...NAVIGATION_STYLES, ...position }}
        size="large"
        aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} player`}
      >
        <Icon fontSize="large" />
      </IconButton>
    </LightTooltip>
  );
});

NavigationButton.displayName = 'NavigationButton';

const PlayerStats = memo(({ player }: { player: IPlayer }) => {
  const age = useMemo(() => calcAge(player.dateOfBirth || ''), [player.dateOfBirth]);

  const stats = useMemo(() => [
    { label: 'AGE', value: age, isLarge: true },
    { label: 'APPEARANCES', value: '60', isLarge: true }, // TODO: Get from player data
    { label: 'WEIGHT', value: player.weight, isLarge: false },
    { label: 'HEIGHT', value: player.height, isLarge: false }
  ], [age, player.weight, player.height]);

  return (
    <Box className="flex-1 flex flex-col items-end text-right z-10 max-w-xs">
      {stats.map((stat, index) => (
        <Box key={stat.label} className={index < stats.length - 1 ? "mb-8" : ""}>
          <Typography variant="body2" sx={STAT_STYLES.label}>
            {stat.label}
          </Typography>
          <Typography
            component="div"
            sx={{
              ...STAT_STYLES.value,
              ...(stat.isLarge ? STAT_STYLES.largeValue : STAT_STYLES.mediumValue)
            }}
          >
            {stat.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
});

PlayerStats.displayName = 'PlayerStats';

const PlayerInfo = memo(({ player }: { player: IPlayer }) => (
  <Box className="flex-1 max-w-2xl">
    <Box sx={{ mb: 4 }}>
      <Typography
        component="div"
        sx={{
          fontSize: { xs: '3rem', md: '6rem' },
          fontWeight: 'bold',
          color: 'white',
          lineHeight: 1,
          mb: 1
        }}
      >
        {player.jerseyNumber}
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
        {player.fullName?.toUpperCase()}
      </Typography>

      <Button
        sx={{
          backgroundColor: '#dc2626',
          color: 'white',
          px: 3,
          py: 1.5,
          borderRadius: 6,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: { xs: '0.875rem', md: '1rem' },
          '&:hover': {
            backgroundColor: '#b91c1c'
          }
        }}
      >
        BUY SHIRT
      </Button>
    </Box>

    {/* Biography Quote */}
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
          {player.biography?.replace(/"/g, '').toUpperCase()}
        </span>
        <Typography
          component="span"
          sx={{ fontSize: '3rem', lineHeight: 1, ml: 1 }}
        >
          &quot;
        </Typography>
      </Typography>
    </Box>
  </Box>
));

PlayerInfo.displayName = 'PlayerInfo';

const PlayerImage = memo(({ player }: { player: IPlayer }) => (
  <Box className="flex-1 flex justify-center items-center relative">
    <Box className="relative">
      <Box className="absolute inset-0 blur-3xl scale-150" />
      <Box
        className="relative"
        sx={{
          width: { xs: 280, md: 350, lg: 400 },
          height: { xs: 350, md: 550, lg: 550 }
        }}
      >
        <Image
          src={player.image}
          alt={player.fullName || 'Player'}
          fill
          className="object-cover"
          style={{ objectFit: 'cover' }}
          priority
          sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 400px"
        />
      </Box>
    </Box>
  </Box>
));

PlayerImage.displayName = 'PlayerImage';

const BackgroundPattern = memo(() => (
  <Box className="absolute inset-0 opacity-5 pointer-events-none">
    <Box className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
    <Box className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
  </Box>
));

BackgroundPattern.displayName = 'BackgroundPattern';

export default function DetailPlayer() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isCalling } = useSelector(makeSelectData);

  // Fetch data only if not already loaded
  useEffect(() => {
    if (!data) {
      dispatch(getPlayerAction({}));
    }
  }, [dispatch, data]);

  // Memoize player calculations
  const { currentPlayer, prevPlayer, nextPlayer } = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return { currentPlayer: null, prevPlayer: null, nextPlayer: null };
    }

    const currentIndex = data.findIndex((p: IPlayer) => p.slug === slug);
    return {
      currentPlayer: data[currentIndex] || null,
      prevPlayer: data[currentIndex - 1] || null,
      nextPlayer: data[currentIndex + 1] || null
    };
  }, [data, slug]);

  // Memoized navigation handlers
  const handlePrevious = useCallback(() => {
    if (prevPlayer?.slug) {
      router.push(`/players/detail/${prevPlayer.slug}`);
    }
  }, [prevPlayer?.slug, router]);

  const handleNext = useCallback(() => {
    if (nextPlayer?.slug) {
      router.push(`/players/detail/${nextPlayer.slug}`);
    }
  }, [nextPlayer?.slug, router]);

  // Loading state
  if (isCalling && !data) {
    return <Loading />;
  }

  // No player found
  if (!currentPlayer) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <Typography variant="h4" color="white">
          Player not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="relative mt-2">
      <HeaderBack />
      <Box className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 relative overflow-hidden w-full">
        {/* Navigation Arrows */}
        <NavigationButton
          direction="prev"
          player={prevPlayer}
          onClick={handlePrevious}
          disabled={!prevPlayer}
        />
        <NavigationButton
          direction="next"
          player={nextPlayer}
          onClick={handleNext}
          disabled={!nextPlayer}
        />

        {/* Main Content Container */}
        <Box className="h-screen flex items-center justify-between px-8 lg:px-16">
          <PlayerInfo player={currentPlayer} />
          <PlayerImage player={currentPlayer} />
          <PlayerStats player={currentPlayer} />
        </Box>

        <BackgroundPattern />
      </Box>
    </Box>
  );
}