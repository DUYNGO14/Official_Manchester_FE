import useDateFormatter from '@/app/hooks/useDateFormatter';
import { IAuthor, ICategory, IPosts } from '@/app/types/IPosts';
import { CalendarToday, Schedule } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import Link from 'next/link';

const CardPost = ({
  post
}: { post: IPosts }) => {
  const user : IAuthor = post.author || {};
  const category : ICategory = post.category  || {};
  const fomatDate = useDateFormatter({ locale: 'vi' });
  return (
    <Card
      sx={{
        height: '100%',
        maxHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 6,
          cursor: 'pointer',
        },
      }}
    >
      <CardMedia
        component="img"
        image={post.thumbnail}
        alt={post.summary}
        sx={{
          height: 200, // fix cao 200px
          width: '100%',
          objectFit: 'cover', // crop ảnh vừa khung
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Chip
          label={category.name}
          size="small"
          color="primary"
          sx={{ mb: 2, fontWeight: 600 }}
        />
        <Link href={`/posts/${post.slug}`}>
          <Typography
            variant="h6"
            component="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: '1.25rem',
              lineHeight: 1.3,
              mb: 2,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {post.title}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {post.summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ mt: 'auto', pt: 2 }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {fomatDate.shortDate(post.publishedAt)}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {user.fullName || 'Admin'}
            </Typography>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default CardPost;