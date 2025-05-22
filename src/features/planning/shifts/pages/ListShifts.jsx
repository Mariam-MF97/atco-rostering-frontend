import React, { useState } from 'react';
import IconButtonWithText from '../../../../components/IconButtonWithText/index.jsx';
import { Add, FilterList } from '@mui/icons-material';
import PageTitle from '../../../../components/PageTitle/index.jsx';
import SearchInput from '../../../../components/SearchInput/index.jsx';
import CustomTable from '../../../../components/CustomTable/index.jsx';
import EmployeeEntity from '../../../../components/EmployeeEntity/index.jsx';
import ActivationStatus from '../../../../components/ActivationStatus/index.jsx';
import { IconButton, Box, useTheme } from '@mui/material';
import EditIconLight from '../../../../assets/icons/EditIconLight.jsx';
import EditIconDark from '../../../../assets/icons/EditIconDark.jsx';
import DeleteIconLight from '../../../../assets/icons/DeleteIconLight.jsx';
import DeleteIconDark from '../../../../assets/icons/DeleteIconDark.jsx';
import useThemeStore from '../../../../store/themeStore.js';
import FilterIcon from '../../../../assets/icons/FilterIcon.jsx';
const mockData = [
  {
    name: 'Morning - Tower',
    display: { letter: 'M', color: '#F6E7A6' },
    type: 'Morning',
    hours: '08:00 to 16:00',
    status: 'Active',
  },
  {
    name: 'Afternoon - Plaza',
    display: { letter: 'A', color: '#C7DBFF' },
    type: 'Night',
    hours: '17:00 to 22:00',
    status: 'Inactive',
  },
  {
    name: 'Evening - Park',
    display: { letter: 'B', color: '#D6C7FF' },
    type: 'Off',
    hours: '02:00 to 07:00',
    status: 'Active',
  },
  {
    name: 'Night - Central',
    display: { letter: 'C', color: '#C7F3E1' },
    type: 'On Call',
    hours: '08:00 to 16:00',
    status: 'Inactive',
  },
  {
    name: 'Morning - Lakeside',
    display: { letter: 'D', color: '#FFE2B8' },
    type: 'Morning',
    hours: '07:00 to 11:00',
    status: 'Active',
  },
  {
    name: 'Afternoon - Riverside',
    display: { letter: 'E', color: '#FFD6DB' },
    type: 'Afternoon',
    hours: '08:00 to 16:00',
    status: 'Active',
  },
  {
    name: 'Afternoon - Riverside',
    display: { letter: 'E', color: '#FFD6DB' },
    type: 'Afternoon',
    hours: '08:00 to 16:00',
    status: 'Active',
  },
  {
    name: 'Afternoon - Riverside',
    display: { letter: 'E', color: '#FFD6DB' },
    type: 'Afternoon',
    hours: '08:00 to 16:00',
    status: 'Active',
  },
  {
    name: 'Afternoon - Riverside',
    display: { letter: 'E', color: '#FFD6DB' },
    type: 'Afternoon',
    hours: '08:00 to 16:00',
    status: 'Active',
  },
  {
    name: 'Afternoon - Riverside',
    display: { letter: 'E', color: '#FFD6DB' },
    type: 'Afternoon',
    hours: '08:00 to 16:00',
    status: 'Active',
  },
];

const PAGE_SIZE = 10;

const ListShifts = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const { isDarkMode } = useThemeStore();
  const total = 95;
  const pageCount = Math.ceil(total / PAGE_SIZE);

  const pagedData = mockData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { Header: 'Name', accessor: 'name' },
    {
      Header: 'Display Name & color',
      accessor: 'display',
      Cell: (value, rowData) => (
        <EmployeeEntity
          employee={{
            id: 0,
            full_name: rowData.name,
            image: null,
          }}
          colors={[value.color]}
          imageSize={40}
          textColor='#23232B'
        />
      ),
    },
    { Header: 'Shift Type', accessor: 'type' },
    { Header: 'Working Hours', accessor: 'hours' },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (value) => <ActivationStatus status={value} />,
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: () => (
        <Box
          sx={{
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            '.MuiTableRow-root:hover &': {
              opacity: 1,
            },
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color='primary' size='small'>
              {isDarkMode ? <EditIconDark /> : <EditIconLight />}
            </IconButton>
            <IconButton color='error' size='small'>
              {isDarkMode ? <DeleteIconDark /> : <DeleteIconLight />}
            </IconButton>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <PageTitle title='Shifts Types' />
        <IconButtonWithText icon={<Add />} text='Create Shift' />
      </div>
      <div className='flex items-center gap-3 mt-3 w-full'>
        <SearchInput
          placeholder='Search by shift name'
          className='w-[350px] flex-1'
        />
        <IconButtonWithText
          text='Filter'
          icon={
            <FilterIcon
              color={theme.palette.mode === 'dark' ? '#D0BCFE' : '#515B92'}
            />
          }
          backgroundColor={theme.palette.mode === 'dark' ? '#1E1E1E' : '#fff'}
          color={theme.palette.mode === 'dark' ? '#D0BCFE' : '#515B92'}
          onClick={() => {}}
          border='1px solid'
          borderColor={theme.palette.divider}
        />
      </div>
      <div className='mt-6'>
        <CustomTable
          columns={columns}
          data={pagedData}
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          pageSize={PAGE_SIZE}
          total={total}
          itemLabel='Shifts'
        />
      </div>
    </div>
  );
};

export default ListShifts;
