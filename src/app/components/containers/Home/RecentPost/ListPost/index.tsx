/* eslint-disable @typescript-eslint/no-explicit-any */
import CardPost from '@/app/components/containers/Posts/CardPost';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



export default function ListPost({posts }: any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <CardPost  post={posts[0]}  />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 6 }}>
             <CardPost  post={posts[1]}  />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
             <CardPost post={posts[2]}  />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
             <CardPost post={posts[3]} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
             <CardPost post={posts[4]} />
        </Grid>
      </Grid>
    </Box>
  );
}
