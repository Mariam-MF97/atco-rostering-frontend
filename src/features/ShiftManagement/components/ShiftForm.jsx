import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Input,
  TimePicker,
  Switch,
  Select,
  InputNumber,
  Button,
  message,
  Space,
  Form,
  Modal,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const ColorInput = (props) => (
  <Input type='color' style={{ width: 100 }} {...props} />
);

const ShiftForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
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
  const navigate = useNavigate();

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
    <div style={{ minHeight: '100vh', background: '#fff', padding: 32 }}>
      <Form
        layout='vertical'
        style={{ maxWidth: 800, margin: '0 auto' }}
        onFinish={handleSubmit(onSubmit)}
        component='form'
      >
        <h2 style={{ marginBottom: 24, color: 'black' }}>Create New Shift</h2>

        <Form.Item
          label='Name'
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Please enter shift name',
              minLength: {
                value: 1,
                message: 'Name must be at least 1 character',
              },
            }}
            render={({ field }) => (
              <Input {...field} placeholder='Enter shift name' />
            )}
          />
        </Form.Item>

        <Form.Item
          label='Display Name'
          validateStatus={errors.displayName ? 'error' : ''}
          help={errors.displayName?.message}
        >
          <Controller
            name='displayName'
            control={control}
            rules={{
              required: 'Please enter display name',
              maxLength: {
                value: 5,
                message: 'Display name must be at most 5 characters',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Enter display name'
                maxLength={5}
              />
            )}
          />
        </Form.Item>

        <Space align='baseline' style={{ marginBottom: 16 }}>
          <Form.Item
            label='Start Time'
            validateStatus={errors.startTime ? 'error' : ''}
            help={errors.startTime?.message}
          >
            <Controller
              name='startTime'
              control={control}
              rules={{ required: 'Please select start time' }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  format='hh:mm A'
                  value={field.value ? moment(field.value, 'hh:mm A') : null}
                  onChange={(value) =>
                    field.onChange(value ? value.format('hh:mm A') : null)
                  }
                  placeholder='Start Time'
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label='End Time'
            validateStatus={errors.endTime ? 'error' : ''}
            help={errors.endTime?.message}
          >
            <Controller
              name='endTime'
              control={control}
              rules={{ required: 'Please select end time' }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  format='hh:mm A'
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  placeholder='End Time'
                />
              )}
            />
          </Form.Item>
        </Space>

        {shiftDuration && (
          <div style={{ marginBottom: 24 }}>
            Total Shift Duration: {shiftDuration}
          </div>
        )}

        <Space style={{ marginBottom: 16 }}>
          <Form.Item
            label='Text Color'
            validateStatus={errors.textColor ? 'error' : ''}
            help={errors.textColor?.message}
          >
            <Controller
              name='textColor'
              control={control}
              rules={{ required: 'Please select text color' }}
              render={({ field }) => <ColorInput {...field} />}
            />
          </Form.Item>
          <Form.Item
            label='Background Color'
            validateStatus={errors.backgroundColor ? 'error' : ''}
            help={errors.backgroundColor?.message}
          >
            <Controller
              name='backgroundColor'
              control={control}
              rules={{ required: 'Please select background color' }}
              render={({ field }) => <ColorInput {...field} />}
            />
          </Form.Item>
        </Space>

        <Form.Item
          label='Active'
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
                checkedChildren='Active'
                unCheckedChildren='Inactive'
                onChange={field.onChange}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label='Shift Type'
          validateStatus={errors.shiftType ? 'error' : ''}
          help={errors.shiftType?.message}
        >
          <Controller
            name='shiftType'
            control={control}
            rules={{ required: 'Please select shift type' }}
            render={({ field }) => (
              <Select {...field} style={{ width: 200 }}>
                <Option value='Working'>Working</Option>
                <Option value='Off'>Off</Option>
                <Option value='OnCall'>On Call</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label='Min Rest Time (default: 0)'
          extra='Accepted: 0 - 99'
          validateStatus={errors.minRestTime ? 'error' : ''}
          help={errors.minRestTime?.message}
        >
          <Controller
            name='minRestTime'
            control={control}
            rules={{
              required: 'Please enter minimum rest time',
              min: { value: 0, message: 'Must be between 0 and 99' },
              max: { value: 99, message: 'Must be between 0 and 99' },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={0}
                max={99}
                placeholder='Min Rest Time (default: 0)'
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label='Break Time (default: 0)'
          extra='Accepted: 0 - 99'
          validateStatus={errors.breakTime ? 'error' : ''}
          help={errors.breakTime?.message}
        >
          <Controller
            name='breakTime'
            control={control}
            rules={{
              required: 'Please enter break time',
              min: { value: 0, message: 'Must be between 0 and 99' },
              max: { value: 99, message: 'Must be between 0 and 99' },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={0}
                max={99}
                placeholder='Break Time (default: 0)'
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label='Max Allowed Repetition (default: 1)'
          extra='Accepted: 1 or more'
          validateStatus={errors.maxRepetition ? 'error' : ''}
          help={errors.maxRepetition?.message}
        >
          <Controller
            name='maxRepetition'
            control={control}
            rules={{
              required: 'Please enter maximum repetition',
              min: { value: 1, message: 'Must be at least 1' },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                placeholder='Max Allowed Repetition (default: 1)'
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
          Save Shift
        </Button>
      </Form>
    </div>
  );
};

export default ShiftForm;
