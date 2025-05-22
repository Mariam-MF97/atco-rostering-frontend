import React from 'react';
import { Box } from '@mui/material';

const DisplayLetter = ({
  letter,
  color,
  size = 40,
  fontSize = 20,
  textColor = '#23232B',
  className = '',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={className}
    >
      <Box
        sx={{
          background: color,
          color: textColor,
          fontWeight: 700,
          borderRadius: 2,
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: fontSize,
        }}
      >
        {letter}
      </Box>
    </Box>
  );
};

export default DisplayLetter;
