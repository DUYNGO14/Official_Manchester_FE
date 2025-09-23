/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Loading from '@/app/components/containers/Loading';
import CardPost from '@/app/components/containers/Posts/CardPost';
import { getPostsAction, makeSelectPosts, reset } from '@/app/stores/reduces/posts';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Stack,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Button
} from '@mui/material';
import {
  Sort,
  FilterList,
  Article
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PostPage() {
  const dispatch = useDispatch();
  const { isCalling, posts, pagination } = useSelector(makeSelectPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('desc'); // Default desc cho newest first
  const [order, setOrder] = useState('publishedAt');
  const [limit] = useState(6); // Fixed limit
  const { totalPage, total } = pagination || {};
  console.log("Pagination", pagination);
  // Reset khi component mount
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // Fetch posts khi params thay đổi
  useEffect(() => {
    dispatch(getPostsAction({
      page : currentPage,
      limit,
      sort,
      order
    }));
  }, [currentPage, limit, sort, order, dispatch]);

  // Handle pagination
  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
  }

  // Handle sort change
  const handleSortChange = (event: any) => {
    setSort(event.target.value);
    setCurrentPage(1); // Reset về trang 1
  };

  // Handle order change
  const handleOrderChange = (event: any) => {
    setOrder(event.target.value);
    setCurrentPage(1); // Reset về trang 1
  };

  // Loading state
  if (isCalling) {
    return <Loading />;
  }

  // Empty state
  if (!isCalling && (!posts || posts.length === 0)) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Article sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom color="text.secondary">
            Không tìm thấy bài viết
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Hiện tại chưa có bài viết nào được đăng tải.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 1
          }}
        >
          Tin Tức & Bài Viết
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Khám phá những câu chuyện thú vị và cập nhật mới nhất
        </Typography>
        {/* Filter Controls */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <FilterList color="action" />
              <Typography variant="subtitle2" color="text.secondary">
                Bộ lọc:
              </Typography>
            </Stack>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sắp xếp</InputLabel>
              <Select
                value={order}
                label="Sắp xếp"
                onChange={handleOrderChange}
              >
                <MenuItem value="publishedAt">Ngày đăng</MenuItem>
                <MenuItem value="title">Tiêu đề</MenuItem>
                <MenuItem value="views">Lượt xem</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Thứ tự</InputLabel>
              <Select
                value={sort}
                label="Thứ tự"
                onChange={handleSortChange}
                startAdornment={<Sort sx={{ mr: 1, fontSize: 18 }} />}
              >
                <MenuItem value="desc">Mới nhất</MenuItem>
                <MenuItem value="asc">Cũ nhất</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>
      </Box>

      {/* Posts Grid */}
      <Box>
        <Grid container spacing={2}>
         {posts && posts.length > 0 && posts.map((post, index) => (
           <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }} sx={{ mb: 2 }}>
             <CardPost post={post} />
           </Grid>
         ))}
        </Grid>
      </Box>

      {/* Pagination */}
      {totalPage && totalPage > 1 && totalPage > currentPage && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 6,
            mb: 2
          }}
        >
          <Button variant="outlined" onClick={handleShowMore}>
            Show more
          </Button>
        </Box>
      )}
    </Container>
  );
}