import React from 'react';
import { Typography, useTheme } from '@mui/material';

const PageTitle = ({ title }) => {
  const theme = useTheme();

  return (
    <Typography
      variant='h6'
      component='h1'
    //   gutterBottom
      sx={{
        fontWeight: 'bold',
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
        fontSize: '1.57rem', // 22px
        // marginTop: '1rem',
      }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
