import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Save as SaveIcon } from '@mui/icons-material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const ColorInput = React.forwardRef(
  ({ value, onChange, error, helperText, label }, ref) => (
    <TextField
      ref={ref}
      type='color'
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      label={label}
      sx={{ width: 100 }}
      InputProps={{
        sx: {
          padding: 0,
          '& input': {
            padding: '8px',
          },
        },
      }}
    />
  )
);

ColorInput.displayName = 'ColorInput';

const ShiftForm = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      displayName: '',
      startTime: null,
      endTime: null,
      textColor: '#000000',
      backgroundColor: '#000000',
      isActive: true,
      shiftType: 'Working',
      minRestTime: 0,
      breakTime: 0,
      maxRepetition: 1,
    },
  });

  // Watch start and end time for duration calculation
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  let shiftDuration = '';
  if (startTime && endTime) {
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    const duration = moment.duration(end.diff(start));
    if (duration.asMinutes() > 0) {
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();
      shiftDuration = `${hours}:${minutes.toString().padStart(2, '0')}`;
    }
  }

  const onSubmit = async (data) => {
    alert(
      JSON.stringify({ ...data, createdAt: new Date().toISOString() }, null, 2)
    );
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant='h5' component='h2' gutterBottom>
        {t('shiftForm.shiftForm')}
      </Typography>

      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Controller
            name='name'
            control={control}
            rules={{
              required: t('shiftFormValidation.nameRequired'),
              minLength: {
                value: 1,
                message: t('shiftFormValidation.nameMinLength'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('shiftForm.name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                placeholder={t('shiftForm.namePlaceholder')}
              />
            )}
          />

          <Controller
            name='displayName'
            control={control}
            rules={{
              required: t('shiftFormValidation.displayNameRequired'),
              maxLength: {
                value: 5,
                message: t('shiftFormValidation.displayNameMaxLength'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('shiftForm.displayName')}
                error={!!errors.displayName}
                helperText={errors.displayName?.message}
                placeholder={t('shiftForm.displayNamePlaceholder')}
                inputProps={{ maxLength: 5 }}
              />
            )}
          />

          <Stack direction='row' spacing={2}>
            <Controller
              name='startTime'
              control={control}
              rules={{ required: t('shiftFormValidation.startTimeRequired') }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  label={t('shiftForm.startTime')}
                  slotProps={{
                    textField: {
                      error: !!errors.startTime,
                      helperText: errors.startTime?.message,
                    },
                  }}
                />
              )}
            />
            <Controller
              name='endTime'
              control={control}
              rules={{ required: t('shiftFormValidation.endTimeRequired') }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  label={t('shiftForm.endTime')}
                  slotProps={{
                    textField: {
                      error: !!errors.endTime,
                      helperText: errors.endTime?.message,
                    },
                  }}
                />
              )}
            />
          </Stack>

          {shiftDuration && (
            <Typography>
              {t('shiftForm.totalShiftDuration')}: {shiftDuration}
            </Typography>
          )}

          <Stack direction='row' spacing={2}>
            <Controller
              name='textColor'
              control={control}
              rules={{ required: t('shiftFormValidation.textColorRequired') }}
              render={({ field }) => (
                <ColorInput
                  {...field}
                  label={t('shiftForm.textColor')}
                  error={!!errors.textColor}
                  helperText={errors.textColor?.message}
                />
              )}
            />
            <Controller
              name='backgroundColor'
              control={control}
              rules={{
                required: t('shiftFormValidation.backgroundColorRequired'),
              }}
              render={({ field }) => (
                <ColorInput
                  {...field}
                  label={t('shiftForm.backgroundColor')}
                  error={!!errors.backgroundColor}
                  helperText={errors.backgroundColor?.message}
                />
              )}
            />
          </Stack>

          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} checked={field.value} />}
                label={
                  field.value ? t('shiftForm.active') : t('shiftForm.inactive')
                }
              />
            )}
          />

          <Controller
            name='shiftType'
            control={control}
            rules={{ required: t('shiftFormValidation.shiftTypeRequired') }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.shiftType}>
                <FormLabel>{t('shiftForm.shiftType')}</FormLabel>
                <Select {...field}>
                  <MenuItem value='Working'>{t('shiftForm.working')}</MenuItem>
                  <MenuItem value='Off'>{t('shiftForm.off')}</MenuItem>
                  <MenuItem value='OnCall'>{t('shiftForm.onCall')}</MenuItem>
                </Select>
                {errors.shiftType && (
                  <FormHelperText>{errors.shiftType.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name='minRestTime'
            control={control}
            rules={{
              required: t('shiftFormValidation.minRestTimeRequired'),
              min: {
                value: 0,
                message: t('shiftFormValidation.minRestTimeRange'),
              },
              max: {
                value: 99,
                message: t('shiftFormValidation.minRestTimeRange'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type='number'
                label={t('shiftForm.minRestTime')}
                error={!!errors.minRestTime}
                helperText={
                  errors.minRestTime?.message || t('shiftForm.minRestTimeExtra')
                }
                inputProps={{ min: 0, max: 99 }}
              />
            )}
          />

          <Controller
            name='breakTime'
            control={control}
            rules={{
              required: t('shiftFormValidation.breakTimeRequired'),
              min: {
                value: 0,
                message: t('shiftFormValidation.breakTimeRange'),
              },
              max: {
                value: 99,
                message: t('shiftFormValidation.breakTimeRange'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type='number'
                label={t('shiftForm.breakTime')}
                error={!!errors.breakTime}
                helperText={
                  errors.breakTime?.message || t('shiftForm.breakTimeExtra')
                }
                inputProps={{ min: 0, max: 99 }}
              />
            )}
          />

          <Controller
            name='maxRepetition'
            control={control}
            rules={{
              required: t('shiftFormValidation.maxRepetitionRequired'),
              min: {
                value: 1,
                message: t('shiftFormValidation.maxRepetitionMin'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type='number'
                label={t('shiftForm.maxRepetition')}
                error={!!errors.maxRepetition}
                helperText={
                  errors.maxRepetition?.message ||
                  t('shiftForm.maxRepetitionExtra')
                }
                inputProps={{ min: 1 }}
              />
            )}
          />

          <Button
            type='submit'
            variant='contained'
            startIcon={<SaveIcon />}
            disabled={isSubmitting}
            size='large'
          >
            {t('shiftForm.saveShift')}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ShiftForm;
