'use client';


import useDateFormatter from '@/app/hooks/useDateFormatter';
import { CalendarMonth, LocationOn, Schedule } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import Image from 'next/image';

interface MatchDataType {
  id: string;
  homeTeam: string;
  awayTeam: string;
  kickOff: string;
  location: string;
  league: string;
  homeLogo:string;
  awayLogo: string;
  createdAt: Date;
  updatedAt: Date
  infoButton: string;
}
const CardMatch = ({ match }: { match: MatchDataType }) => {
   const formatter = useDateFormatter();

  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden',
        mx: 'auto',
        transition: 'box-shadow 0.3s ease-in',
        '&:hover': {
          boxShadow: 20,
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 1.5,
        }}
      >
        <Typography variant="overline" fontWeight="bold" fontSize="0.8rem">
          {match.league || 'Premier League'}
        </Typography>
      </Box>

      {/* Match Date & Time */}
      <Box
        sx={{
          py: 2,
          px: 2,
          textAlign: 'center',
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ mb: 1 }}
        >
          <CalendarMonth sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {formatter.shortDate(match.kickOff)}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {formatter.time(match.kickOff)}
          </Typography>
          <Chip
            label={match.location}
            size="small"
            icon={<LocationOn />}
            sx={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              fontSize: '0.7rem',
              height: 24,
            }}
          />
        </Stack>
      </Box>

      {/* Match Teams */}
      <CardContent sx={{ py: 3, px: 3, textAlign: 'center' }}>
        <Typography
          variant="h6"
          component="div"
          fontWeight="bold"
          
          sx={{ mb: 2, color: '#37003c', textTransform: 'uppercase',  }}
        >
          {match.homeTeam} vs {match.awayTeam}
        </Typography>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ mb: 3 }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '50%',
              border: '2px solid #e0e0e0',
              overflow: 'hidden',
            }}
          >
            <Image
              src={match.homeLogo || ''}
              alt={match.homeTeam || ''}
              width={60}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </Box>

          {/* VS Separator */}
          <Box
            sx={{
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          >
            VS
          </Box>

          <Box
            sx={{
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '50%',
              border: '2px solid #e0e0e0',
              overflow: 'hidden',
            }}
          >
            <Image
              src={match.awayLogo || ''}
              alt={match.awayTeam || ''}
              width={60}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Stack>

        {/* Ticket Info Button */}
        {
          match.infoButton && (<Button
            variant="outlined"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'uppercase',
            }}
          >
            {match.infoButton}
          </Button>)
        }

      </CardContent>
    </Card>
  );
};

export default CardMatch;