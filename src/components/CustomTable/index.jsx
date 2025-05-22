import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Pagination,
  Box,
} from '@mui/material';

const ROW_HEIGHT = 56;

const CustomTable = ({
  columns,
  data,
  page,
  pageCount,
  onPageChange,
  pageSize,
  total,
  itemLabel = 'items',
}) => {
  const theme = useTheme();
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          boxShadow: '0 2px 8px 0 rgba(16,30,54,0.04)',
          backgroundColor: theme.palette.mode === 'dark' ? '#181820' : '#fff',
          border: `1px solid ${
            theme.palette.mode === 'dark' ? '#23232B' : '#F3F3F6'
          }`,
          maxHeight: ROW_HEIGHT * pageSize + 56,
          overflow: 'auto',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                background:
                  theme.palette.mode === 'dark' ? '#29292F' : '#EFEDF4',
              }}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.accessor}
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : '#23232B',
                    fontWeight: 600,
                    fontSize: 14,
                    textTransform: 'capitalize',
                    borderBottom: 'none',
                    background:
                      theme.palette.mode === 'dark' ? '#29292F' : '#EFEDF4',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  {col.Header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  borderBottom: `8px solid ${
                    theme.palette.mode === 'dark' ? '#23232B' : '#F3F3F6'
                  }`,
                  background:
                    theme.palette.mode === 'dark' ? '#000' : '#F8F8FA',
                  height: ROW_HEIGHT,
                  '&:hover': {
                    background:
                      theme.palette.mode === 'dark' ? '#303036' : '#FBF8FF',
                    cursor: 'pointer',
                  },
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.accessor}
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#fff' : '#23232B',
                      fontSize: 15,
                      borderBottom: `8px solid ${
                        theme.palette.mode === 'dark' ? '#23232B' : '#F3F3F6'
                      }`,
                    }}
                  >
                    {col.Cell
                      ? col.Cell(row[col.accessor], row)
                      : row[col.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination and info below the table */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          px: 2,
          pb: 2,
        }}
      >
        <span
          style={{
            color: theme.palette.mode === 'dark' ? '#fff' : '#23232B',
            fontSize: 15,
          }}
        >
          Showing {(page - 1) * pageSize + 1} to{' '}
          {Math.min(page * pageSize, total)} of {total} {itemLabel}
        </span>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          shape='rounded'
        />
      </Box>
    </>
  );
};

export default CustomTable;
