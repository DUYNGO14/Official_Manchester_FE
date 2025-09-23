import { IAuthor, ICategory } from '@/app/types/IPosts'
import { Facebook, Share, Instagram, LinkedIn } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, Stack, Typography, Tooltip, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import XIcon from '@mui/icons-material/X';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface HeaderPostProps {
  author?: IAuthor
  createAt?: Date | string | undefined,
  category?: ICategory,
  views?: number
  showSocialButtons?: boolean
  customSocialButtons?: Array<{
    icon: React.ReactNode
    label: string
    color: string
    backgroundColor: string
    onClick?: () => void
    href?: string
  }>
}

export default function HeaderPost({ 
  author, 
  createAt, 
  showSocialButtons = true,
  customSocialButtons 
}: HeaderPostProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Format date with better options and error handling
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Just now';
    
    try {
      // Convert to Date object if it's a string
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return 'Invalid date';
      }

      // Calculate time difference for "time ago" display
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
      
      // Show "time ago" for recent posts
      if (diffInSeconds < 60) {
        return 'Vừa xong';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} phút trước`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} giờ trước`;
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ngày trước`;
      }
      
      // For older posts, show full date
      return dateObj.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch (error) {
      console.warn('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Default social buttons
  const defaultSocialButtons = [
    {
      icon: <Facebook />,
      label: 'Share on Facebook',
      color: 'white',
      backgroundColor: '#1877F2',
      onClick: () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
      }
    },
    {
      icon: <XIcon />,
      label: 'Share on X (Twitter)',
      color: 'white',
      backgroundColor: '#000000',
      onClick: () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
      }
    },
    {
      icon: <LinkedIn />,
      label: 'Share on LinkedIn',
      color: 'white',
      backgroundColor: '#0A66C2',
      onClick: () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
      }
    }
  ];

  const socialButtons = customSocialButtons || defaultSocialButtons;

  return (
    <Box sx={{ mb: 2 }}>
      {/* Author and Date Section */}
      <Stack 
        display={'flex'} 
        alignItems={'center'} 
        justifyContent={'space-between'} 
        direction={'row'}
        sx={{ mb: 1 }}
      >
        <Box display={'flex'} alignItems={'center'} gap={1.5}>
          <Avatar 
            alt={author?.fullName || 'Anonymous'} 
            src={author?.image}
            sx={{ 
              width: 48, 
              height: 48,
              border: '2px solid #e0e0e0' 
            }}
          >
            {!author?.image && author?.fullName?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography 
              variant='subtitle1' 
              sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.2
              }}
            >
              {author?.fullName || 'Anonymous User'}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ textAlign: 'right' }}>
          <Typography 
            variant='body2' 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            {formatDate(createAt)}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2, borderColor: 'divider' }} />

      {/* Social Buttons Section */}
      {showSocialButtons && (
        <Stack direction={'row'} alignItems={'center'} gap={1} sx={{ mb: 1 }}>
          {socialButtons.map((button, index) => (
            <Tooltip title={button.label} key={index}>
              <IconButton
                onClick={button.onClick}
                sx={{
                  color: button.color,
                  backgroundColor: button.backgroundColor,
                  width: 40,
                  height: 40,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    backgroundColor: button.backgroundColor,
                    opacity: 0.9,
                  },
                  '&:active': {
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {button.icon}
              </IconButton>
            </Tooltip>
          ))}
          
          {/* More Options Button */}
          <Tooltip title="More options">
            <IconButton
              onClick={handleMoreClick}
              sx={{
                color: 'text.primary',
                backgroundColor: 'grey.100',
                width: 40,
                height: 40,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  backgroundColor: 'grey.200',
                },
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )}

      {/* More Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: 2,
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          }
        }}
      >
        <MenuItem onClick={handleClose}>
          <Share sx={{ mr: 1, fontSize: 20 }} />
          Copy Link
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Instagram sx={{ mr: 1, fontSize: 20 }} />
          Share to Instagram
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          Report Post
        </MenuItem>
      </Menu>
    </Box>
  )
}