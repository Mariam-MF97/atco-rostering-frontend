import React from 'react';
import { Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Shifts = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
      }}
    >
      <h2>{t('shifts.listComingSoon')}</h2>
      <Button
        type='primary'
        onClick={() => navigate('/shifts/create')}
        style={{ fontWeight: 600, fontSize: 20, color: token.colorText }}
      >
        {t('shifts.createNewShift')}
      </Button>
    </div>
  );
};

export default Shifts;
