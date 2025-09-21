import { Box, Card, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid'
import React from 'react'
interface Props {
  count?: number
}
export default function CardPostSkeleton({count = 5}: Props) {
  const gridSizes = [
    { xs: 12, md: 4, lg: 6 },
    { xs: 12, md: 4, lg: 6 },
    { xs: 12, md: 4 },
    { xs: 12, md: 4 },
    { xs: 12, md: 4 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {Array.from(Array(count)).map((_, index) => (
          <Grid key={index} size={gridSizes[index]}>
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
