import React from 'react';
import { useTranslation } from 'react-i18next';
import ShiftForm from '../components/ShiftForm.jsx';

const CreateShift = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>{t('shifts.createNewShift')}</h2>
      <ShiftForm />
    </div>
  );
};

export default CreateShift;
