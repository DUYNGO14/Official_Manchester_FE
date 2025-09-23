/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import HeaderBack from '@/app/components/containers/Header/HedearBack'
import Loading from '@/app/components/containers/Loading'
import PlayerCard from '@/app/components/containers/Players/PlayerCard'
import { getPlayerAction, makeSelectData } from '@/app/stores/reduces/player'
import { IPlayer } from '@/app/types/IPlayer'
import { Box, Divider, Grid } from '@mui/material'
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
  
  return (
    <Box sx={{ p: { md: 3, xs: 1 } }}>
      <HeaderBack />
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
