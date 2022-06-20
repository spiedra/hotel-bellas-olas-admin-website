import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
// import { LoaderSpinner } from '../../components/Loader'
import CustomizedTable from '../../components/Table'
import { getHotelStatus } from '../../services/Gets/getHotelStatus'
import DownloadButton from '../../components/DownloadButton'
import { exportToPdf } from '../../utils/exportData'
import moment from 'moment'
import { Box } from '@mui/material'
import { LoaderSpinner } from '../../components/Loader'

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
  const dataHeaderPDF = [
    ['Nombre de habitación', 'Número', 'Categoría', 'Ultimo ingreso']
  ]

  useEffect(() => {
    getHotelStatus().then((response) => {
      setRoomList(response)
    })
  }, [])

  const exportPDF = () => {
    if (roomList != null) {
      const data = roomList.map((room) => [
        room.roomName,
        room.number,
        room.roomCategory,
        room.lastDate
      ])
      exportToPdf(
        dataHeaderPDF,
        data,
        'Estado actual del hotel - ' + moment().format('DD/MM/YYYY'),
        ['Hotel Bellas Olas']
      )
    }
  }

  return (
    <Box>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Estado del hotel hoy <Moment format="DD/MM/yyyy"></Moment>
      </Box>
      {roomList
        ? (
        <>
          <DownloadButton onClick={exportPDF} />
          <CustomizedTable columns={columns} rows={roomList || []} />
        </>
          )
        : (
        <LoaderSpinner />
          )}
    </Box>
  )
}

export default HotelStatus
