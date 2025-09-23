import PlayerBanner from '@/app/components/containers/Banner/PlayerBanner'
import { Container, Grid } from '@mui/material'

export default function HomePlayers() {
  return (
    <Container maxWidth="lg" sx={{ py: { md: 3, xs:1 } }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }} sx={{ cursor: 'pointer'}}>
          <PlayerBanner image="./players/banner_man_player.webp" title='MEN' href='/players/men' />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ cursor: 'pointer'}}>
          <PlayerBanner image="./players/banner_woman_player.webp" title='WOMEN' href='/players/women' />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ cursor: 'pointer'}}>
          <PlayerBanner image="./players/banner_academy_player.webp" title='THE ACADEMY' href='/players/academy' />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }} sx={{ cursor: 'pointer'}}>
          <PlayerBanner image="./players/banner_legends_player.jpg" title='LEGENDS' href='/players/legends'  />
        </Grid>
      </Grid>
    </Container>
  )
}
