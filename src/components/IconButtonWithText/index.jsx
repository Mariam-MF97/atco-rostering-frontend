import React from 'react';
import { Button, useTheme } from '@mui/material';
import './IconButtonWithText.css';

const IconButtonWithText = ({
  text,
  icon,
  backgroundColor,
  color,
  hoverBackgroundColor,
  border,
  onClick,
  disabled = false,
  borderColor,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const buttonStyles = {
    backgroundColor: backgroundColor || (isDarkMode ? '#CFB1FF' : '#515B92'),
    color: color || (isDarkMode ? '#000' : '#fff'),
    border: border || 'none',
    borderColor: borderColor || 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    py: 2,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor:
        hoverBackgroundColor ||
        backgroundColor ||
        (isDarkMode ? '#CFB1FF' : '#515B92'),
      opacity: 0.9,
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      backgroundColor: '#ccc',
      color: '#fff',
      opacity: 0.7,
    },
  };

  return (
    <Button
      variant='contained'
      onClick={onClick}
      disabled={disabled}
      sx={buttonStyles}
    >
      {icon}
      {text}
    </Button>
  );
};

export default IconButtonWithText;
