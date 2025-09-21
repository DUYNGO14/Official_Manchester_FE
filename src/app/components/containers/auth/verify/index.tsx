'use client'
import yupUtils from '@/app/common/utils/yup.utils';
import StyledPaper from '@/app/components/atom/StylePaper';
import { makeSelectAuth, verifyAction } from '@/app/stores/reduces/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { DoneAll as DoneAllIcon, Email as EmailIcon } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, InputAdornment, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
const verifySchema = yupUtils.object({
  email: yupUtils.string().required("Email is required"),
  code: yupUtils.string().required("Code is required"),
})
const Verify = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const verify = useSelector(makeSelectAuth);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      email: verify?.param?.email || "",
      code: "",
    },
    mode: "onChange",
    resolver: yupResolver(verifySchema),
  });
  useEffect(() => {
  if (verify?.data?.email) {
    setValue("email", verify.data.email);
  }
}, [verify?.data?.email, setValue]);
  useEffect(() => {
    if (verify.isSuccess && verify.type === "verify"  ) {
      router.push("/auth/login");
    }
  }, [verify.isSuccess, router]);
  const onSubmit = (data: { email: string, code: string }) => {
    if (!data.code || !data.email) return;
    if (!verify.isCalling) {
      dispatch(verifyAction(data));
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
          Verify Account
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "14px",
          }}
        >
          Verify your account to continue to Task Management.<br /> Check your email for verification code
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
              disabled={true}
              required
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
          name="code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label="Code"
              placeholder="Enter your code"
              required
              error={!!errors.code}
              helperText={errors.code?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DoneAllIcon sx={{ color: "#bdbdbd", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />



        {/* Error Message */}
        {verify.isError && verify.type === "verify" && (
          <Alert
            severity="error"
            sx={{
              borderRadius: "12px",
              "& .MuiAlert-message": { fontSize: "14px" }
            }}
          >
            {verify.error}
          </Alert>
        )}

      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit(onSubmit)}
        disabled={verify.isCalling}
        startIcon={verify.isCalling ? <CircularProgress size={20} color="inherit" /> : <DoneAllIcon />}
      >
        {verify.isCalling ? "Verifying..." : "Verify"}
      </Button>
    </StyledPaper>
  )
}

export default Verify