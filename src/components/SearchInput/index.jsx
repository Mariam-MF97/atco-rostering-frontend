import React from 'react';
import { Box } from '@mui/material';
import SearchIcon from '../../assets/icons/SearchIcon.jsx';

const SearchInput = ({
  placeholder = '',
  value,
  onChange,
  sx = {},
  icon: Icon = SearchIcon,
  ...inputProps
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid',
        borderRadius: '8px',
        px: 3,
        py: 2,
        bgcolor: 'background.paper',
        borderColor: 'divider',
        ...sx,
      }}
    >
      <Icon sx={{ color: 'text.secondary' }} />
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          background: 'transparent',
          outline: 'none',
          border: 'none',
          color: 'inherit',
          flex: 1,
          fontSize: 'inherit',
          fontFamily: 'inherit',
          '&::placeholder': {
            color: 'text.secondary',
          },
        }}
        {...inputProps}
      />
    </Box>
  );
};

export default SearchInput;
