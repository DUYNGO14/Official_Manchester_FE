'use client'

import { validateEmail, validatePassword } from "@/app/common/utils/validate/authValidator";
import yupUtils from "@/app/common/utils/yup.utils";
import StyledSocialButton from "@/app/components/atom/StyledSocialButton";
import StyledPaper from "@/app/components/atom/StylePaper";
import { loginAction, makeSelectAuth, reset } from "@/app/stores/reduces/auth";
import { yupResolver } from "@hookform/resolvers/yup";
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
const loginSchema = yupUtils.object({
  email: yupUtils
    .string()
    .required('Email is required')
    .test("isValidEmail", "Email is not valid", (val) => {
      const validUsername = validateEmail(val);
      return validUsername.success;
    }),
  password: yupUtils.string().required('Password is required')
  .test("isValidPassword", "Password must contain at least one uppercase letter, one lowercase letter, and one number", (val) => {
    const validPassword = validatePassword(val);
    return validPassword.success;
  }),
})
function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(reset());
  }, [])
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });


  const login = useSelector(makeSelectAuth)

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = (data: { email: string, password: string }) => {
    if (!login.isCalling) {
      dispatch(loginAction(data));
    }
  };

  useEffect(() => {
    if (login.isSuccess) {
      router.push("/");
    }
  }, [login.isSuccess, router]);

  return (
    // Component chính
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
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "14px",
          }}
        >
          Sign in to continue to your account
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box display="flex" flexDirection="column" gap={3} width="100%">
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

        {/* Error Message */}
        {login.isError && login.type === "login" && (
          <Alert
            severity="error"
            sx={{
              borderRadius: "12px",
              "& .MuiAlert-message": { fontSize: "14px" }
            }}
          >
            {login.error}
          </Alert>
        )}

        {/* Forgot Password */}
        <Box sx={{ textAlign: "right" }}>
          <MuiLink component={Link} href="/auth/forgot-password" >Forgot Password</MuiLink>
        </Box>
      </Box>

      {/* Login Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit(onSubmit)}
        disabled={login.isCalling}
        startIcon={login.isCalling ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
      >
        {login.isCalling ? "Signing in..." : "Sign In"}
      </Button>

      {/* Divider */}
      <Divider sx={{ my: 4, width: "100%" }}>
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

      {/* Sign Up Link */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "text.secondary",
          fontSize: "14px",
        }}
      >
        Don&apos;t have an account?{" "}
        <MuiLink component={Link} href="/auth/register" >Register</MuiLink>
      </Typography>
    </StyledPaper>
  )
}

export default Login
