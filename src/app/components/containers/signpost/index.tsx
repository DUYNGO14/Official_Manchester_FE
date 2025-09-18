import { Link as MuiLink, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const SignPost = ({ newTitle, showMore, href }: { newTitle: string, showMore: string, href: string }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} mb={2}>
      <Typography
        variant="h3"
        component="h2"
        fontWeight="bold"
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        {newTitle}
      </Typography>
      <MuiLink component={Link} href={href}>
        {showMore}
      </MuiLink>
    </Stack>
  )
}

export default SignPost
