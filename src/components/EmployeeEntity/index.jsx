import React from 'react';
import { Tooltip } from '@mui/material';

const getAbbreviatedName = (fullName) => {
  if (!fullName) return '';
  // Remove any non-letter characters and split by spaces
  const words = fullName.replace(/[^a-zA-Z\s]/g, '').split(/\s+/);
  // Get first letter of each word and join without any separator
  return words.map((word) => word.charAt(0).toUpperCase()).join('');
};

const EmployeeEntity = ({
  employee,
  colors = ['#F6E7A6', '#C7DBFF', '#D6C7FF', '#C7F3E1', '#FFE2B8', '#FFD6DB'],
  imageSize = 40,
  className = '',
  textColor = 'white',
}) => {
  const { image, full_name, id } = employee;

  return (
    <div
      className={`flex items-center gap-x-3 min-w-0 truncate-title-contanier ${className}`}
    >
      {image ? (
        <div className='flex-shrink-0'>
          <img
            src={image}
            alt={full_name}
            className='rounded-lg object-cover'
            style={{ width: imageSize, height: imageSize }}
          />
        </div>
      ) : (
        <div
          className='rounded-lg flex-shrink-0 flex justify-center items-center'
          style={{
            backgroundColor: colors[id % colors.length],
            width: imageSize,
            height: imageSize,
          }}
        >
          <div className='text-sm font-semibold' style={{ color: textColor }}>
            {getAbbreviatedName(full_name)}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeEntity;
