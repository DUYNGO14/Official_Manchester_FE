import useDateFormatter from '@/app/hooks/useDateFormatter';
import { IAuthor, ICategory, IPosts } from '@/app/types/IPosts';
import { 
  CalendarToday, 
  Schedule, 
  Visibility,
  Person,
  BookmarkBorder,
  Share,
  ArrowForward
} from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Box,
  Skeleton,
  Tooltip
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

interface CardPostProps {
  post: IPosts
  variant?: 'default' | 'featured' | 'compact'
  showExcerpt?: boolean
  showActions?: boolean
  loading?: boolean
}

const CardPost = ({
  post,
  variant = 'default',
  showExcerpt = true,
  showActions = true,
  loading = false
}: CardPostProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const user: IAuthor = post?.author || {};
  const category: ICategory = post?.category || {};
  const formatDate = useDateFormatter({ locale: 'vi' });

  // Format view count
  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views?.toString() || '0';
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Variant-based styles - Fixed heights for consistency
  const getCardHeight = () => {
    switch (variant) {
      case 'featured': return { height: 550 };
      case 'compact': return { height: 350 };  
      default: return { height: 450 };         
    }
  };

  const getImageHeight = () => {
    switch (variant) {
      case 'featured': return 280;
      case 'compact': return 160;
      default: return 200;
    }
  };

  const getTitleVariant = () => {
    switch (variant) {
      case 'featured': return 'h5';
      case 'compact': return 'subtitle1';
      default: return 'h6';
    }
  };

  if (loading) {
    return (
      <Card sx={{ 
        ...getCardHeight(), 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <Skeleton variant="rectangular" height={getImageHeight()} />
        <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Skeleton variant="rectangular" width={80} height={24} sx={{ mb: 2 }} />
          <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 1 }} />
          <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 2 }} />
          <Skeleton variant="text" height={60} />
        </CardContent>
        <Box sx={{ p: { xs: 2, sm: 3 }, pt: 0, mt: 'auto' }}>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
      </Card>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <Card
      component="article"
      sx={{
        ...getCardHeight(),
        display: 'flex',
        flexDirection: 'column',
        borderRadius: { xs: 1, sm: 2 },
        boxShadow: variant === 'featured' ? 4 : 2,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          boxShadow: variant === 'featured' ? 8 : 6,
          transform: 'translateY(-4px)',
          '& .card-media': {
            transform: 'scale(1.05)',
          },
          '& .card-title': {
            color: 'primary.main',
          },
          '& .read-more-btn': {
            opacity: 1,
            transform: 'translateX(0)',
          }
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {!imageLoaded && !imageError && (
          <Skeleton 
            variant="rectangular" 
            height={getImageHeight()}
            animation="wave"
          />
        )}
        
        {!imageError && (
          <CardMedia
            component="img"
            image={post.thumbnail}
            alt={post.title}
            className="card-media"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sx={{
              height: getImageHeight(),
              width: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              display: imageLoaded ? 'block' : 'none',
            }}
          />
        )}

        {imageError && (
          <Box
            sx={{
              height: getImageHeight(),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
              color: 'text.secondary'
            }}
          >
            <Typography variant="body2">Không thể tải ảnh</Typography>
          </Box>
        )}

        {/* Category Badge */}
        {category.name && (
          <Chip
            label={category.name}
            size="small"
            color="primary"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontWeight: 600,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          />
        )}

        {/* Views Badge */}
        {post.views > 0 && (
          <Chip
            icon={<Visibility sx={{ fontSize: 16 }} />}
            label={formatViews(post.views)}
            size="small"
            variant="filled"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontSize: '0.75rem',
              '& .MuiChip-icon': { color: 'white' }
            }}
          />
        )}
      </Box>

      {/* Content Section */}
      <CardContent sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 3 },
        pb: showActions && variant !== 'compact' ? 1 : { xs: 2, sm: 3 }, // Reduce bottom padding if has actions
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden' // Prevent content overflow
      }}>
        <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
          <Typography
            variant={getTitleVariant()}
            component="h3"
            className="card-title"
            sx={{
              fontWeight: variant === 'featured' ? 700 : 600,
              lineHeight: 1.3,
              mb: { xs: 1, sm: 2 },
              display: '-webkit-box',
              WebkitLineClamp: variant === 'compact' ? 2 : 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              color: 'text.primary',
              transition: 'color 0.3s ease',
              minHeight: variant === 'compact' ? '2.6em' : '3.9em', // Fixed title height
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {post.title}
          </Typography>
        </Link>

        {showExcerpt && post.summary && variant !== 'compact' && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: variant === 'featured' ? 3 : 2, // Reduce lines to make space
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.6,
              minHeight: variant === 'featured' ? '4.8em' : '3.2em' // Reduce height for actions
            }}
          >
            {truncateText(post.summary, variant === 'featured' ? 150 : 100)}
          </Typography>
        )}

        {/* Spacer to push author info to bottom of CardContent */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Author & Date Info - Always at bottom of CardContent */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ 
            mt: 'auto',
            pt: 1,
            // Add some margin bottom if actions are shown to create separation
            mb: showActions && variant !== 'compact' ? 0 : 0
          }}
        >
          {/* Author */}
          <Stack direction="row" spacing={1} alignItems="center" flex={1}>
            {
              user.image ? (
                <Avatar
                  src={user.image}
                  alt={user.fullName}
                  sx={{ width: 24, height: 24 }}
                />
              ) : (
                <Avatar sx={{ width: 24, height: 24 }}>
                  {user.fullName?.charAt(0)?.toUpperCase() || 'A'}
                </Avatar>
              )
            }
           
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {user.fullName || 'Admin'}
            </Typography>
          </Stack>

          {/* Date */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate.shortDate(post.publishedAt)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      {/* Actions Section - Separate from CardContent */}
      {showActions && variant !== 'compact' && (
        <CardActions 
          sx={{ 
            px: { xs: 2, sm: 3 }, 
            pb: { xs: 2, sm: 3 }, 
            pt: 1, // Small top padding for separation
            mt: 0,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack direction="row" spacing={1}>
              <Tooltip title="Lưu bài viết">
                <IconButton size="small" color="default">
                  <BookmarkBorder fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Chia sẻ">
                <IconButton size="small" color="default">
                  <Share fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>

            <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                className="read-more-btn"
                sx={{
                  opacity: 0.7,
                  transform: 'translateX(-8px)',
                  transition: 'all 0.3s ease',
                  color: 'primary.main',
                  '&:hover': {
                    color: 'primary.dark',
                  }
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Đọc thêm
                </Typography>
                <ArrowForward sx={{ fontSize: 14 }} />
              </Stack>
            </Link>
          </Stack>
        </CardActions>
      )}
    </Card>
  );
};

export default CardPost;