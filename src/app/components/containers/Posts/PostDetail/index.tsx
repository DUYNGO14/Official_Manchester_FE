'use client'
import NewsBanner from '@/app/components/containers/Banner/NewsBanner';
import HeaderBack from '@/app/components/containers/Header/HedearBack';
import Loading from '@/app/components/containers/Loading';
import HeaderPost from '@/app/components/containers/Posts/PostDetail/HeaderPost';
import { getPostDetailAction, makeSelectPosts } from '@/app/stores/reduces/posts';
import {
  BookmarkBorder,
  Share,
  Visibility
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Detail({ slug }: { slug: string }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostDetailAction({ slug }));
  }, [dispatch, slug]);

  const { isCalling, post } = useSelector(makeSelectPosts);

  // Format views count
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };



  // Format content with paragraphs
  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      paragraph.trim() && (
        <Typography
          key={index}
          variant="body1"
          paragraph
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: 'text.primary',
            textAlign: 'justify',
            mb: 3,
            '&:first-of-type::first-letter': {
              fontSize: '4rem',
              fontWeight: 700,
              lineHeight: 1,
              float: 'left',
              marginRight: 1,
              marginTop: 0.5,
              color: 'primary.main'
            }
          }}
        >
          {paragraph}
        </Typography>
      )
    ));
  };

  if (isCalling) {
    return <Loading />;
  }

  if (!isCalling && !post) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error" gutterBottom>
          Bài viết không tồn tại
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      {/* Banner */}
      <NewsBanner
        title={post!.title}
        image={post!.thumbnail}
        isDisabled={false}
        href={`/posts/${post!.slug}`}
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 6, md: 8 } }}>
        <HeaderBack />
        <Box display="flex" gap={4}>
          <Box flex={1}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <HeaderPost
                author={post!.author}
                createAt={post!.publishedAt}
              />

              {/* Article Meta */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <Chip
                    label={post!.category.name}
                    variant="outlined"
                    size="small"
                    sx={{
                      fontWeight: 500,
                      borderColor: 'primary.main',
                      color: 'primary.main'
                    }}
                  />
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Visibility fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {formatViews(post!.views)} lượt xem
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <IconButton size="small" color="primary">
                    <BookmarkBorder />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Share />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>

            {/* Article Summary */}
            {post!.summary && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  bgcolor: 'primary.50',
                  border: '1px solid',
                  borderColor: 'primary.100',
                  borderRadius: 2
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    mb: 1
                  }}
                >
                  Tóm tắt
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    color: 'primary.dark',
                    fontSize: '1.1rem'
                  }}
                >
                  {post!.summary}
                </Typography>
              </Paper>
            )}

            {/* Article Content */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ '& > p:first-of-type': { mt: 0 } }}>
                {formatContent(post!.content)}
              </Box>

              {/* Article Footer */}
              <Divider sx={{ my: 4 }} />

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Cảm ơn bạn đã đọc bài viết
                </Typography>
                <Stack direction="row" justifyContent="center" gap={1}>
                  <IconButton color="primary" size="large">
                    <BookmarkBorder />
                  </IconButton>
                  <IconButton color="primary" size="large">
                    <Share />
                  </IconButton>
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Detail;