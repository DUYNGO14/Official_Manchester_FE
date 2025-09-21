// ProfilePage component
'use client'
import DialogUpdateUser from '@/app/components/containers/Account/ModalUpdate';
import { makeSelectData } from '@/app/stores/reduces/user';
import { Logout, Settings } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Box, Button, CircularProgress, Container, IconButton, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProfilePage() {
  const dispatch = useDispatch();
  const { isCalling, user, isError, error } = useSelector(makeSelectData);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isCalling) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: { md: 5, xs: 2 },
        px: { xs: 1, sm: 2 }
      }}
    >
      <Box
        sx={{
          p: { md: 4, sm: 3, xs: 2 },
          backgroundColor: 'primary.main',
          borderRadius: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
          justifyContent: { md: 'space-between' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 2, md: 3 },
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          minHeight: { xs: 'auto', md: 500 },
          height: { xs: 'auto', md: 500 }
        }}
      >
        {/* Left Box - User Info */}
        <Box sx={{
          position: 'relative',
          width: { xs: '100%', md: '30%' },
          height: { xs: 'auto', md: '100%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
          zIndex: 2,
          order: { xs: 1, md: 1 }
        }}>
          <Typography
            variant='body1'
            fontWeight={'bold'}
            sx={{
              color: 'secondary.contrastText',
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            Welcome
          </Typography>

          <Box sx={{ my: { xs: 1, md: 0 } }}>
            <Avatar
              sx={{
                width: { xs: 60, md: 80 },
                height: { xs: 60, md: 80 },
                border: '2px solid white',
                backgroundSize: 'cover',
                mb: 1
              }}
              alt="User Avatar"
              src={user?.avatar?.url || "/logomu.png"}
            />
          </Box>

          <Typography
            variant='h1'
            fontWeight={'bold'}
            sx={{
              color: 'secondary.contrastText',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              mb: 1
            }}
          >
            <Typography
              component={'span'}
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                lineHeight: 1.2,
                fontWeight: 'bold'
              }}
            >
              {user?.username.toUpperCase()}
            </Typography>
          </Typography>

          <Typography
            variant='overline'
            fontWeight={'bold'}
            sx={{
              color: 'secondary.contrastText',
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'center',
              gap: 1,
              fontSize: { xs: '0.7rem', md: '0.75rem' },
              mb: 0.5
            }}
          >
            <AlternateEmailIcon sx={{
              color: 'secondary.contrastText',
              fontSize: { xs: '1rem', md: '1.2rem' }
            }} />
            {user?.email}
          </Typography>

          <Typography
            variant='overline'
            fontWeight={'bold'}
            sx={{
              color: 'secondary.contrastText',
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'center',
              gap: 1,
              fontSize: { xs: '0.7rem', md: '0.75rem' }
            }}
          >
            <VerifiedIcon sx={{
              color: 'secondary.contrastText',
              fontSize: { xs: '1rem', md: '1.2rem' }
            }} />
            MY UNITED FAN
          </Typography>

          <Box sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}>
            <Button sx={{
              color: 'secondary.contrastText',
              backgroundColor: 'black',
              px: { xs: 1.5, md: 2 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 6,
              fontSize: { xs: '0.8rem', md: '0.875rem' },
              transition: 'all 0.3s ease-in-out',
              '&:hover': { backgroundColor: 'white', color: 'black' },
              minWidth: { xs: 'auto', sm: 'auto' }
            }}>
              Become a member
            </Button>
            <Button sx={{
              color: 'secondary.contrastText',
              backgroundColor: 'primary.main',
              border: '2px solid white',
              px: { xs: 1.5, md: 2 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 6,
              fontSize: { xs: '0.8rem', md: '0.875rem' },
              transition: 'all 0.3s ease-in-out',
              '&:hover': { backgroundColor: 'white', color: 'black' },
              minWidth: { xs: 'auto', sm: 'auto' }
            }}>
              Buy Shirt
            </Button>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: 'center',
            gap: 1,
            mt: 2
          }}>
            <Tooltip title="Logout">
              <IconButton sx={{
                color: 'secondary.contrastText',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'white'
                },
                transition: 'all 0.3s ease-in-out',
                p: { xs: 0.5, md: 1 }
              }}>
                <Logout sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings" onClick={handleClickOpen}>
              <IconButton sx={{
                color: 'secondary.contrastText',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'white'
                },
                transition: 'all 0.3s ease-in-out',
                p: { xs: 0.5, md: 1 }
              }}>
                <Settings sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Center Jersey Image - Hidden on mobile */}
        <Box sx={{
          position: { xs: 'relative', md: 'absolute' },
          top: { md: '10%' },
          left: { md: '30%' },
          right: { md: '30%' },
          width: { xs: '100%', md: 'auto' },
          height: { xs: 200, md: '100%' },
          display: { xs: 'block', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 0,
          order: { xs: 2, md: 0 },
          my: { xs: 2, md: 0 }
        }}>
          <Box sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: { xs: 200, md: 'none' },
            mx: 'auto'
          }}>
            <Image
              src="/background.png"
              alt="Jersey Background"
              fill
              className='w-full h-full object-cover drop-shadow-2xl'
              style={{ objectFit: 'contain' }}
            />

            {/* Player Name */}
            <Box sx={{
              position: 'absolute',
              top: { xs: '20%', md: '15%' },
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'secondary.contrastText',
              zIndex: 1,
              width: '80%'
            }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                  color: 'secondary.contrastText',
                  lineHeight: 2,
                  wordSpacing: 2,
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: { xs: '1rem', md: '1.5rem' }
                }}
              >
                {user?.fullname}
              </Typography>
            </Box>

            {/* Player Number */}
            <Box sx={{
              position: 'absolute',
              top: { xs: '50%', md: '40%' },
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'secondary.contrastText',
              zIndex: 1,
              width: '80%'
            }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '5rem' },
                  fontWeight: 'bold',
                  lineHeight: 1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  mb: 1
                }}
              >
                {user?.number || '00'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Box - Favourite Player */}
        <Box sx={{
          position: 'relative',
          width: { xs: '100%', md: '30%' },
          height: { xs: 'auto', md: '100%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-end' },
          textAlign: { xs: 'center', md: 'right' },
          zIndex: 2,
          order: { xs: 3, md: 3 }
        }}>
          <Typography
            variant='body1'
            fontWeight={'bold'}
            sx={{
              color: 'secondary.contrastText',
              mb: 2,
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            FAVOURITE PLAYER
          </Typography>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
            textAlign: { xs: 'center', md: 'right' }
          }}>
            <Box sx={{
              position: 'relative',
              backgroundImage: 'url(/MATHEUS_CUNHA.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              width: { xs: 60, md: 80 },
              height: { xs: 60, md: 80 },
              border: '2px solid white',
              borderRadius: '50%',
              order: { xs: 1, md: 2 }
            }}>
              <StarIcon sx={{
                position: 'absolute',
                top: -4,
                right: -4,
                color: 'primary.main',
                backgroundColor: 'white',
                borderRadius: '50%',
                fontSize: { xs: 16, md: 20 }
              }} />
            </Box>

            <Box sx={{
              textAlign: { xs: 'center', md: 'left' },
              order: { xs: 2, md: 1 }
            }}>
              <Typography
                variant='h6'
                fontWeight={'bold'}
                sx={{
                  color: 'secondary.contrastText',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  lineHeight: 1.2
                }}
              >
                Matheus<br />Cunha
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {open && <DialogUpdateUser open={open}  onClose={handleClose} userData={user}  />}
    </Container>
  );
}

export default ProfilePage;