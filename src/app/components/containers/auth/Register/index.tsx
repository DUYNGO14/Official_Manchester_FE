'use client'
import { validateEmail, validatePassword } from '@/app/common/utils/validate/authValidator';
import yupUtils from '@/app/common/utils/yup.utils';
import StyledPaper from '@/app/components/atom/StylePaper';
import StyledSocialButton from '@/app/components/atom/StyledSocialButton';
import { makeSelectAuth, registerAction, reset } from '@/app/stores/reduces/auth';
import { yupResolver } from "@hookform/resolvers/yup";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Alert, Box, Button, ButtonGroup, Chip, CircularProgress, Divider, IconButton, InputAdornment, Link as MuiLink, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const registerSchema = yupUtils.object({
  fullname: yupUtils.string(),
  username: yupUtils.string().required('Username is required'),
  email: yupUtils
    .string()
    .required('Email is required')
    .test("isValidEmail", "Email is not valid", (val) => {
      const validUsername = validateEmail(val);
      return validUsername.success;
    }),
  password: yupUtils.string().required('Password is required').test("isValidPassword", "Password must contain at least one uppercase letter, one lowercase letter, and one number", (val) => {
    const validPassword = validatePassword(val);
    return validPassword.success;
  }),
  confirmPassword: yupUtils
    .string()
    .required('Confirm Password is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
})

function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Thêm state riêng cho confirm password
  const register = useSelector(makeSelectAuth)

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (register.isSuccess) {
      router.push("/auth/verify");
    }
  }, [register.isSuccess, router]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "", // THÊM confirmPassword vào defaultValues
    },
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (data: { 
    email: string, 
    password: string, 
    username: string, 
    fullname?: string,
    confirmPassword: string // THÊM confirmPassword vào onSubmit
  }) => {
    if(!data.email || !data.password || !data.username || !data.confirmPassword) return;
    if (!register.isCalling) {
      // Chỉ gửi các trường cần thiết đến API, không gửi confirmPassword
      const { confirmPassword, ...registerData } = data;
      dispatch(registerAction(registerData));
    }
  };

  return (
    <StyledPaper sx={{ width: "100%", maxWidth: 420 }}>
      <Box sx={{ textAlign: "center", mb: { xs: 2, md: 3 } }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "700",
            background: "linear-gradient(135deg, #333 0%, #666 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Create Account
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "14px",
          }}
        >
          Create an account to get started
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box display="flex" flexDirection="column" gap={3} width="100%">
        <Controller
          name="fullname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label="Fullname"
              placeholder="Enter your fullname"
              error={!!errors.fullname}
              helperText={errors.fullname?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFileRenameOutlineIcon sx={{ color: "#bdbdbd", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label="Username"
              placeholder="Enter your username"
              required
              error={!!errors.username}
              helperText={errors.username?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFileRenameOutlineIcon sx={{ color: "#bdbdbd", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label="Email Address"
              placeholder="Enter your email"
              required
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#bdbdbd", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              variant="outlined"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              required
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#bdbdbd", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleShowPassword}
                      sx={{
                        color: "#bdbdbd",
                        "&:hover": { color: "#ff6b6b" }
                      }}
                    >
                      {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Confirm Password"
              variant="outlined"
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"} // Sử dụng state riêng
              required
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#bdbdbd", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleShowConfirmPassword} // Sử dụng hàm riêng
                      sx={{
                        color: "#bdbdbd",
                        "&:hover": { color: "#ff6b6b" }
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        
        {/* Error Message */}
        {register.isError && register.type === "register" && (
          <Alert
            severity="error"
            sx={{
              borderRadius: "12px",
              "& .MuiAlert-message": { fontSize: "14px" }
            }}
          >
            {register.error}
          </Alert>
        )}
      </Box>

      {/* Register Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit(onSubmit)}
        disabled={register.isCalling}
        startIcon={register.isCalling ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
        sx={{ mt: 2 }}
      >
        {register.isCalling ? "Registering..." : "Register"}
      </Button>

      {/* Divider */}
      <Divider sx={{ my: 2, width: "100%" }}>
        <Chip
          label="OR"
          size="small"
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#666",
            fontWeight: "500",
            border: "none"
          }}
        />
      </Divider>

      {/* Social Login */}
      <Box sx={{ width: "100%", mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 2,
            fontSize: "14px",
          }}
        >
          Continue with
        </Typography>
        <ButtonGroup fullWidth variant="outlined" sx={{ gap: 0.5 }}>
          <StyledSocialButton startIcon={<GoogleIcon />}>
            Google
          </StyledSocialButton>
          <StyledSocialButton startIcon={<GitHubIcon />}>
            GitHub
          </StyledSocialButton>
          <StyledSocialButton startIcon={<FacebookIcon />}>
            Facebook
          </StyledSocialButton>
        </ButtonGroup>
      </Box>

      {/* Login Link */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "text.secondary",
          fontSize: "14px",
        }}
      >
        Already have an account?{" "}
        <MuiLink component={Link} href="/auth/login">Login</MuiLink>
      </Typography>
    </StyledPaper>
  )
}

export default Register;