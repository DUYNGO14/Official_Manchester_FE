/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Loading from '@/app/components/containers/Loading'
import PlayerCard from '@/app/components/containers/Players/PlayerCard'
import { getPlayerAction, makeSelectData } from '@/app/stores/reduces/player'
import { IPlayer } from '@/app/types/IPlayer'
import { ArrowBack } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const playerType = (type: string) => {
  if (type === 'men') {
    return 'MAN'
  } else if (type === 'women') {
    return 'WOMEN'
  } else if (type === 'legends') {
    return 'LEGENDS'
  } else {
    return 'ACADEMY'
  }
}
export default function ListPlayer({ type }: { type: string }) {
  const typePlayer = playerType(type)
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isCalling } = useSelector(makeSelectData);
  console.log(data);
  useEffect(() => {
    dispatch(getPlayerAction({ player_type: typePlayer }));
  }, [dispatch, typePlayer]);

  if (isCalling && !data) {
    return (<Loading />)
  }
  if (!isCalling && !data) {
    return (
      <Box sx={{ p: { md: 3, xs: 1 } }}>
        <h1>Player not found</h1>
      </Box>
    )
  }
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/'); // fallback về Home nếu không có trang trước
    }
  };
  return (
    <Box sx={{ p: { md: 3, xs: 1 } }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="start"
        gap={1}
        sx={{ mb: 2 }}
      >
        <IconButton size="small" onClick={handleBack} sx={{
          color: 'text.primary',
          '&:hover': {
            color: 'primary.main',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            transform: 'scale(1.1)'
          }
        }}>
          <ArrowBack />
          <Typography sx={{ ml: 1, fontWeight: 'bold' , color: 'text.primary' }} variant="body2">Quay lại</Typography>
        </IconButton>
      </Stack>
      <Divider sx={{ mb: 2, borderColor: 'text.primary', borderWidth: 1 }} />
      <Grid container spacing={2}>
        {data &&
          (data as IPlayer[]).map((player: any, index: number) => (
            <Grid key={index} size={{ xs: 6, md: 3 }} >
              <PlayerCard player={player} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}
