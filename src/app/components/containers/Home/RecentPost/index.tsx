import ListPost from '@/app/components/containers/Home/RecentPost/ListPost'
import CardPostSkeleton from '@/app/components/containers/Sekeloton/CardPostSkeleton';
import SignPost from '@/app/components/containers/signpost'
import { IPosts } from '@/app/types/IPosts';
import { Box, Container } from '@mui/material'
import React from 'react'

function RecentPost({listPost, isCalling }: {listPost: IPosts[], isCalling: boolean}) {
  return (
    <Box sx={{ py: { md: 3, xs:1 } }}>
      <Container maxWidth="lg">
        <SignPost newTitle="Recent Post" showMore="Show More" href="/posts" />
        {
          isCalling ? (
            <CardPostSkeleton />
          ):
          <ListPost posts={listPost} />
        }
      </Container>
    </Box>
  )
}

export default RecentPost
