/* eslint-disable @typescript-eslint/no-explicit-any */
import userUpdateSchema from '@/app/components/containers/Account/ModalUpdate/validatorUser';
import { yupResolver } from '@hookform/resolvers/yup';
import { CloudUpload } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  fullname: string;
  phone_number: string;
  address: string;
  age: number;
  number: string;
  avatar: FileList | null;
  gender: string;
}

interface PropUpdateUser {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UpdateUserDialog = ({ open, onClose, userData }: PropUpdateUser) => {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>({
    defaultValues: {
      fullname: userData.fullname || '',
      phone_number: userData.phone_number || '',
      address: userData.address || '',
      age: userData.age || 0,
      number: userData.number || '',
      avatar: userData.avatar?.url || null,
      gender: userData.gender || ''
    },
    mode: 'onChange',
    // resolver: yupResolver(userUpdateSchema)
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const watchedAvatar = watch('avatar');

  useEffect(() => {
    if (watchedAvatar && watchedAvatar.length > 0) {
      const file = watchedAvatar[0];
      const reader = new FileReader();
      reader.onload = (e) => setPreviewAvatar(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewAvatar(null);
    }
  }, [watchedAvatar]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Xử lý submit ở đây
      console.log('Form data:', data);
      
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({ success: true, message: 'Cập nhật thành công!' });
      handleClose();
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Có lỗi xảy ra' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
        Cập nhật thông tin cá nhân
      </DialogTitle>
      
      <Box component="form" onSubmit={handleSubmit(onSubmit)} id="update-user-form">
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Cập nhật thông tin cá nhân của bạn. Email và tên đăng nhập không thể thay đổi.
          </DialogContentText>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Avatar Upload */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={previewAvatar || userData.avatar || ''}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                sx={{ mb: 1 }}
              >
                Tải lên ảnh đại diện
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  {...register('avatar')}
                />
              </Button>
              {errors.avatar && (
                <Typography color="error" variant="body2">
                  {(errors.avatar as any)?.message}
                </Typography>
              )}
            </Box>

            {/* Fullname */}
            <TextField
              label="Họ và tên"
              variant="outlined"
              fullWidth
              {...register('fullname')}
              error={!!errors.fullname}
              helperText={errors.fullname?.message}
              placeholder="Nhập họ tên nếu muốn cập nhật"
            />

            {/* Phone Number */}
            <TextField
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              {...register('phone_number')}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
              placeholder="Nhập số điện thoại nếu muốn cập nhật"
            />

            {/* Address */}
            <TextField
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
              placeholder="Nhập địa chỉ nếu muốn cập nhật"
            />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              {/* Age */}
              <TextField
                label="Tuổi"
                variant="outlined"
                fullWidth
                type="number"
                {...register('age', { valueAsNumber: true })}
                error={!!errors.age}
                helperText={errors.age?.message}
                placeholder="Tuổi"
              />

              {/* Number (0-99) */}
              <TextField
                label="Số (0-99)"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ min: 0, max: 99 }}
                {...register('number')}
                error={!!errors.number}
                helperText={errors.number?.message}
                placeholder="0-99"
              />
            </Box>

            {/* Gender */}
            <TextField
              label="Giới tính"
              variant="outlined"
              fullWidth
              select
              {...register('gender')}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              defaultValue=""
            >
              <MenuItem value="">Không cập nhật</MenuItem>
              <MenuItem value="MALE">Nam</MenuItem>
              <MenuItem value="FEMALE">Nữ</MenuItem>
              <MenuItem value="OTHER">Khác</MenuItem>
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Hủy
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Cập nhật'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UpdateUserDialog;