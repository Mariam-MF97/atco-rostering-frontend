import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('validation.invalidEmail'))
      .required(t('validation.required', { field: t('common.email') })),
    password: yup
      .string()
      .required(t('validation.required', { field: t('common.password') }))
      .min(
        6,
        t('validation.minLength', { field: t('common.password'), min: 6 })
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Accept any email and password combination
      login(
        { name: data.email.split('@')[0], email: data.email },
        'mock-jwt-token'
      );
      message.success(t('common.loginSuccess'));
      navigate('/');
    } catch (error) {
      message.error(t('common.loginError'));
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
      }}
    >
      <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>
          {t('common.login')}
        </h2>
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label={t('common.email')}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined />}
                  placeholder={t('common.enterEmail')}
                  size='large'
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={t('common.password')}
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder={t('common.enterPassword')}
                  size='large'
                />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              loading={isSubmitting}
            >
              {t('common.login')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
