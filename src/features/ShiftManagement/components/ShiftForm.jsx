import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Input,
  TimePicker,
  Switch,
  Select,
  InputNumber,
  Button,
  Space,
  Form,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const ColorInput = (props) => (
  <Input type='color' style={{ width: 100 }} {...props} />
);

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
    <div style={{ minHeight: '100vh', padding: 32 }}>
      <Form
        layout='vertical'
        style={{ maxWidth: 800, margin: '0 auto' }}
        onFinish={handleSubmit(onSubmit)}
        component='form'
      >
        <h2 style={{ marginBottom: 24 }}>{t('shiftForm.shiftForm')}</h2>

        <Form.Item
          label={t('shiftForm.name')}
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
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
              <Input {...field} placeholder={t('shiftForm.namePlaceholder')} />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('shiftForm.displayName')}
          validateStatus={errors.displayName ? 'error' : ''}
          help={errors.displayName?.message}
        >
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
              <Input
                {...field}
                placeholder={t('shiftForm.displayNamePlaceholder')}
                maxLength={5}
              />
            )}
          />
        </Form.Item>

        <Space align='baseline' style={{ marginBottom: 16 }}>
          <Form.Item
            label={t('shiftForm.startTime')}
            validateStatus={errors.startTime ? 'error' : ''}
            help={errors.startTime?.message}
          >
            <Controller
              name='startTime'
              control={control}
              rules={{ required: t('shiftFormValidation.startTimeRequired') }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  format='hh:mm A'
                  value={field.value ? moment(field.value, 'hh:mm A') : null}
                  onChange={(value) =>
                    field.onChange(value ? value.format('hh:mm A') : null)
                  }
                  placeholder={t('shiftForm.startTimePlaceholder')}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={t('shiftForm.endTime')}
            validateStatus={errors.endTime ? 'error' : ''}
            help={errors.endTime?.message}
          >
            <Controller
              name='endTime'
              control={control}
              rules={{ required: t('shiftFormValidation.endTimeRequired') }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  format='hh:mm A'
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  placeholder={t('shiftForm.endTimePlaceholder')}
                />
              )}
            />
          </Form.Item>
        </Space>

        {shiftDuration && (
          <div style={{ marginBottom: 24 }}>
            {t('shiftForm.totalShiftDuration')}: {shiftDuration}
          </div>
        )}

        <Space style={{ marginBottom: 16 }}>
          <Form.Item
            label={t('shiftForm.textColor')}
            validateStatus={errors.textColor ? 'error' : ''}
            help={errors.textColor?.message}
          >
            <Controller
              name='textColor'
              control={control}
              rules={{ required: t('shiftFormValidation.textColorRequired') }}
              render={({ field }) => <ColorInput {...field} />}
            />
          </Form.Item>
          <Form.Item
            label={t('shiftForm.backgroundColor')}
            validateStatus={errors.backgroundColor ? 'error' : ''}
            help={errors.backgroundColor?.message}
          >
            <Controller
              name='backgroundColor'
              control={control}
              rules={{
                required: t('shiftFormValidation.backgroundColorRequired'),
              }}
              render={({ field }) => <ColorInput {...field} />}
            />
          </Form.Item>
        </Space>

        <Form.Item
          label={t('shiftForm.active')}
          validateStatus={errors.isActive ? 'error' : ''}
          help={errors.isActive?.message}
        >
          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                checkedChildren={t('shiftForm.active')}
                unCheckedChildren={t('shiftForm.inactive')}
                onChange={field.onChange}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('shiftForm.shiftType')}
          validateStatus={errors.shiftType ? 'error' : ''}
          help={errors.shiftType?.message}
        >
          <Controller
            name='shiftType'
            control={control}
            rules={{ required: t('shiftFormValidation.shiftTypeRequired') }}
            render={({ field }) => (
              <Select {...field} style={{ width: 200 }}>
                <Option value='Working'>{t('shiftForm.working')}</Option>
                <Option value='Off'>{t('shiftForm.off')}</Option>
                <Option value='OnCall'>{t('shiftForm.onCall')}</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('shiftForm.minRestTime')}
          extra={t('shiftForm.minRestTimeExtra')}
          validateStatus={errors.minRestTime ? 'error' : ''}
          help={errors.minRestTime?.message}
        >
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
              <InputNumber
                {...field}
                min={0}
                max={99}
                placeholder={t('shiftForm.minRestTimePlaceholder')}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('shiftForm.breakTime')}
          extra={t('shiftForm.breakTimeExtra')}
          validateStatus={errors.breakTime ? 'error' : ''}
          help={errors.breakTime?.message}
        >
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
              <InputNumber
                {...field}
                min={0}
                max={99}
                placeholder={t('shiftForm.breakTimePlaceholder')}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('shiftForm.maxRepetition')}
          extra={t('shiftForm.maxRepetitionExtra')}
          validateStatus={errors.maxRepetition ? 'error' : ''}
          help={errors.maxRepetition?.message}
        >
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
              <InputNumber
                {...field}
                min={1}
                placeholder={t('shiftForm.maxRepetitionPlaceholder')}
              />
            )}
          />
        </Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          icon={<SaveOutlined />}
          loading={isSubmitting}
        >
          {t('shiftForm.saveShift')}
        </Button>
      </Form>
    </div>
  );
};

export default ShiftForm;
