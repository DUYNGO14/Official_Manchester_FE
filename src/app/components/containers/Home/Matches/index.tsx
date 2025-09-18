import CardMatchCarousel from '@/app/components/containers/Home/Matches/CarouselCard'
import SignPost from '@/app/components/containers/signpost'
import { Box, Container } from '@mui/material'
import React from 'react'

function Matches() {
  return (
   <Box sx={{ py: { md: 3, xs:1 } }}>
      <Container maxWidth="lg">
        <SignPost newTitle="Matches" showMore="Show More" href="/matches" />
        <CardMatchCarousel matches={[1,2,3,4,6,54,45,54,]} />
      </Container>
    </Box>
  )
}

export default Matches
