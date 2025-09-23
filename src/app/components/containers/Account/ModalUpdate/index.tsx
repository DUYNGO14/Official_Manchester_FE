import { IUser } from '@/app/types/IUser';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CloudUpload } from '@mui/icons-material';
import userUpdateSchema, { UserUpdateFormData } from '@/app/components/containers/Account/ModalUpdate/validatorUser';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectData, updateUserAction } from '@/app/stores/reduces/user';

interface PropUpdateUser {
  open: boolean;
  onClose: () => void;
  userData: IUser;
}

const UpdateUserDialog = ({ open, onClose, userData }: PropUpdateUser) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<UserUpdateFormData>({
    resolver: yupResolver(userUpdateSchema),
  });

  const dispatch = useDispatch();
  const { isCalling, isError, error, user } = useSelector(makeSelectData);

  const [preview, setPreview] = useState<string | null>(
    userData.avatar?.url || null
  );
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false);

  // Watch gender value to ensure proper controlled component
  const watchedGender = watch("gender");

  // Reset form khi userData thay đổi
  useEffect(() => {
    reset({
      fullname: userData.fullname || "",
      age: userData.age || null,
      gender: (userData.gender as "MALE" | "FEMALE" | "OTHER") || "",
      avatar: null,
    });
    setPreview(userData.avatar?.url || null);
  }, [userData, reset]);

  // Handle success/error states
  useEffect(() => {
    if (!isCalling && !isError && isLocalSubmitting) {
      // Success - close dialog
      console.log("Update successful, closing dialog");
      setIsLocalSubmitting(false);
      // onClose();
    } else if (!isCalling && isError && isLocalSubmitting) {
      // Error - keep dialog open but stop submitting
      console.log("Update failed, keeping dialog open");
      setIsLocalSubmitting(false);
    }
  }, [isCalling, isError, isLocalSubmitting, onClose]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.error('Please select an image file');
        return;
      }

      setValue("avatar", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    if (!isCalling && !isLocalSubmitting) {
      reset();
      setPreview(userData.avatar?.url || null);
      setIsLocalSubmitting(false);
      onClose();
    }
  };

  const onSubmit = async (data: UserUpdateFormData) => {
    try {
      setIsLocalSubmitting(true);
      const formData = new FormData();

      // Only append fields that have changed or have values
      if (data.fullname && data.fullname.trim() !== "" && data.fullname.trim() !== userData.fullname) {
        formData.append("fullname", data.fullname.trim());
      }

      if (data.age && data.age > 0 && data.age !== userData.age) {
        formData.append("age", data.age.toString());
      }

      if (data.gender !== undefined && data.gender !== null && data.gender !== userData.gender) {
        formData.append("gender", data.gender);
      }

      // Always append avatar if a new file is selected
      if (data.avatar && data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }

      // Debug: Log what we're sending
      console.log("=== Frontend FormData ===");
      let hasData = false;
      for (const [key, value] of formData.entries()) {
        hasData = true;
        if (value instanceof File) {
          console.log(`${key}: File(${value.name}, ${value.size}bytes, ${value.type})`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      if (!hasData) {
        console.log("No data to update");
        setIsLocalSubmitting(false);
        return;
      }

      if (!isCalling) {
        dispatch(updateUserAction({
          id: userData._id,
          formData
        }));
      } else {
        setIsLocalSubmitting(false);
      }
    } catch (error) {
      console.error('Update error:', error);
      setIsLocalSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      sx={{ overflow: 'hidden' }}
      // Prevent closing while submitting
      disableEscapeKeyDown={isCalling || isLocalSubmitting}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
        Cập nhật thông tin cá nhân
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack alignItems="center" spacing={2} mb={3}>
            <Avatar src={preview || undefined} sx={{ width: 100, height: 100 }} />
            <Button variant="outlined" component="label" disabled={isCalling || isLocalSubmitting}>
              <CloudUpload sx={{ mr: 1 }} />
              Chọn ảnh mới
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </Button>
            {errors.avatar && (
              <Typography color="error" variant="caption">
                {errors.avatar.message}
              </Typography>
            )}
          </Stack>

          <TextField
            label="Họ và tên"
            fullWidth
            margin="normal"
            disabled={isCalling || isLocalSubmitting}
            {...register("fullname")}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
          />

          <TextField
            label="Tuổi"
            fullWidth
            type="number"
            margin="normal"
            inputProps={{ min: 1, max: 120 }}
            disabled={isCalling || isLocalSubmitting}
            {...register("age", { valueAsNumber: true })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />

          <TextField
            label="Giới tính"
            select
            fullWidth
            margin="normal"
            value={watchedGender || ""}
            disabled={isCalling || isLocalSubmitting}
            {...register("gender")}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            <MenuItem value="">Chọn giới tính</MenuItem>
            <MenuItem value="MALE">Nam</MenuItem>
            <MenuItem value="FEMALE">Nữ</MenuItem>
            <MenuItem value="OTHER">Khác</MenuItem>
          </TextField>

          <DialogActions sx={{ p: 0, mt: 2 }}>
            <Button 
              onClick={handleClose} 
              color="inherit"
              disabled={isCalling || isLocalSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isCalling || isLocalSubmitting}
            >
              {(isCalling || isLocalSubmitting) ? <CircularProgress size={24} /> : 'Cập nhật'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;