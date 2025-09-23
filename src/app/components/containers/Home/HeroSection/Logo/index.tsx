import { Box } from '@mui/material'
import Image from 'next/image'

function Logo() {

  return (
    <Box
     
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: { xs: 4, md: 0 }
      }}
    >
      <Box
        className="logo" // Thêm class cho animation
        sx={{
          position: 'relative',
          width: { xs: 200, sm: 250, md: 350 },
          height: { xs: 200, sm: 250, md: 350 },
        }}
      >
        <Image
          src="/logo.webp"
          alt="DuyNgo"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>
    </Box>
  )
}

export default Logo