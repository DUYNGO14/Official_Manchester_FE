import { Box, Card, Grid, Skeleton } from '@mui/material'
import React from 'react'
interface Props {
  count: number
}
export default function CardPostSkeleton({count = 2}: Props) {
  return (
    <Grid container spacing={4}>
          {Array.from(Array(count)).map((_, index) => (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              sx={{
                display: 'flex',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Card>
                  <Box>
                    <Skeleton variant="rectangular" height={200} />
                    <Box p={2}>
                      <Skeleton variant="rectangular" sx ={{ mb: 1 , borderRadius: 2 }} width={100} height={30} />
                      <Skeleton variant="rectangular" sx ={{ mb: 1 }} height={20} />
                      <Skeleton variant="rectangular" sx ={{ mb: 1 }} height={20} />
                      <Skeleton variant="rectangular" sx ={{ mb: 1 }} width={200} height={20} />
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
  )
}
