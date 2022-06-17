import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { LoaderSpinner } from '../../components/Loader'
import CustomizedTable from '../../components/Table'
import { getHotelStatus } from '../../services/Gets/getHotelStatus'

const columns = [
  { id: 'roomName', label: 'Nombre de habitación', minWidth: 170 },
  { id: 'number', label: 'Número', minWidth: 100 },
  {
    id: 'roomCategory',
    label: 'Categoría',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'lastDate',
    label: 'Último acceso',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  }
]

const HotelStatus = () => {
  const [roomList, setRoomList] = useState()

  useEffect(() => {
    getHotelStatus().then((response) => {
      setRoomList(response)
    })
  }, [])

  return (
    <Box sx={{ mt: '3rem', ml: '1.5rem' }}>
      <h1>
        Estado del hotel hoy <Moment format="DD/MM/yyyy"></Moment>{' '}
      </h1>
      {roomList
        ? (
        <CustomizedTable columns={columns} rows={roomList || []} />
          )
        : (
        <LoaderSpinner />
          )}
    </Box>
  )
}

export default HotelStatus
