import CardPost from "@/app/components/containers/Posts/CardPost";
import { IPosts } from "@/app/types/IPosts";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid"; // nếu bạn dùng Grid v2


export default function ListPost({ posts }: { posts: IPosts[] }) {
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
        {posts.slice(0, 5).map((post, index) => (
          <Grid key={post._id || index} size={gridSizes[index]}>
            <CardPost post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
