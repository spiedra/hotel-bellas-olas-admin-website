/* eslint-disable no-unused-vars */

import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CustomizedTable ({ columns, rows, action, onEdit, onDelete, withImage }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const hasImage = (id, value) => {
    if (withImage) {
      if (withImage === id) {
        return (
          <img width={100} alt='img' src={value}/>
        )
      }
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align={'right'}
                style={{ minWidth: 100 }}
              >
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                          hasImage(column.id, value)
                          }
                          {
                          withImage !== undefined
                            ? withImage !== column.id
                              ? column.format && typeof value === 'number'
                                ? column.format(value)
                                : <p style={{ maxWidth: column.maxWidth }}>{value}</p>
                              : <></>
                            : <>{value}</>
                          }
                        </TableCell>
                      )
                    })}
                    <TableCell align={'center'}>
                    {
                    action
                      ? (
                    <>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ marginRight: '5px', background: '#ffc400' }}
                      onClick={() => onEdit(rows[index].id)}
                       >
                        <EditIcon/>
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onClick={() => onDelete(rows[index].id)}
                       >
                        <DeleteIcon/>
                    </Button>
                    </>
                        )
                      : <></>
                    }
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
