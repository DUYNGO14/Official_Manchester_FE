'use client'
import ListPost from '@/app/components/containers/Home/RecentPost/ListPost'
import CardPostSkeleton from '@/app/components/containers/Sekeloton/CardPostSkeleton';
import SignPost from '@/app/components/containers/signpost'
import { getPostsAction, makeSelectPosts } from '@/app/stores/reduces/posts';
import { IPosts } from '@/app/types/IPosts';
import { Box, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function RecentPost() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction({}));
  },[dispatch])
  const {isCalling, posts } = useSelector(makeSelectPosts);
  return (
    <Box sx={{ py: { md: 3, xs:1 } }}>
      <Container maxWidth="lg">
        <SignPost newTitle="Recent Post" showMore="Show More" href="/posts" />
        {
          isCalling ? (
            <CardPostSkeleton />
          ):
          <ListPost posts={posts as IPosts[]} />
        }
      </Container>
    </Box>
  )
}

export default RecentPost
