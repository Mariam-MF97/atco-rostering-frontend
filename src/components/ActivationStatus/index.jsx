import React from 'react';
import { Chip } from '@mui/material';

const ActivationStatus = ({ status, className = '' }) => {
  return (
    <Chip
      label={status}
      className={className}
      sx={{
        background: status === 'Active' ? '#DBF8F9' : '#F0F0F0',
        color: status === 'Active' ? '#027D6C' : '#6B6B78',
        fontWeight: 600,
        borderRadius: 3,
        height: 32,
        width: 88,
        '& .MuiChip-label': {
          width: '100%',
          textAlign: 'center',
          fontSize: '14px',
          lineHeight: '20px',
          px: 0,
        },
      }}
    />
  );
};

export default ActivationStatus;
