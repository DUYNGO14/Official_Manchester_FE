import React from 'react'
import { Box, Card, CardContent, Grid, Skeleton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

interface SkeletonCardMatchProps {
  count: number;
}

export default function SkeletonCardMatch(props: SkeletonCardMatchProps) {
  const { count } = props
  const theme= useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
   const skeletonCount = isMobile ? 1 : count
  return (
    <Grid 
      container 
      spacing={{ xs: 2, md: 3 }} 
      columns={{ xs: 4, sm: 8, md: 12 }}
      justifyContent="center"
    >
      {Array.from(Array(skeletonCount)).map((_, index) => (
        <Grid 
          key={index} 
          item 
          xs={12} 
          sm={6} 
          md={4}
          display="flex"
          justifyContent="center"
        >
          <Card
            sx={{
              width: '100%',
              maxWidth: 400,
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
              transition: 'box-shadow 0.3s ease-in',
              '&:hover': {
                boxShadow: 20,
              },
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 2,
                px: 2
              }}
            >
              <Skeleton animation="wave" width="70%" height={30} />
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
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Skeleton animation="wave" width='40%' height={30} />
                <Skeleton animation="wave" width='60%' height={30} />
              </Stack>
            </Box>

            {/* Match Teams */}
            <CardContent sx={{ py: 3, px: 3, textAlign: 'center' }}>
              <Typography
                variant="h6"
                component="div"
                fontWeight="bold"
                sx={{ 
                  mb: 2, 
                  color: '#37003c', 
                  textTransform: 'uppercase',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Skeleton animation="wave" width='70%' height={40} />
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
                  }}
                >
                  <Skeleton animation="wave" variant="circular" width={60} height={60} />
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
                    color: 'text.secondary'
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
                  }}
                >
                  <Skeleton animation="wave" variant="circular" width={60} height={60} />
                </Box>
              </Stack>

              <Skeleton 
                animation="wave" 
                width='100%' 
                height={60} 
                sx={{ borderRadius: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}