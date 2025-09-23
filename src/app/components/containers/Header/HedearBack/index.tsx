import { ArrowBack } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HeaderBack() {
  const router = useRouter();
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/'); // fallback về Home nếu không có trang trước
    }
  };
  return (
    <Stack
        direction="row"
        alignItems="center"
        justifyContent="start"
        gap={1}
        sx={{ mb: 2 }}
      >
        <IconButton size="small" onClick={handleBack} sx={{
          color: 'text.primary',
          '&:hover': {
            color: 'primary.main',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            transform: 'scale(1.1)'
          }
        }}>
          <ArrowBack />
          <Typography sx={{ ml: 1, fontWeight: 'bold' , color: 'text.primary' }} variant="body2">Quay lại</Typography>
        </IconButton>
      </Stack>
  )
}
