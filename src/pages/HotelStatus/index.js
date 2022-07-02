import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import CustomizedTable from '../../components/Table'
import { getHotelStatus } from '../../services/Gets/getHotelStatus'
import DownloadButton from '../../components/DownloadButton'
import { exportToPdf } from '../../utils/exportData'
import moment from 'moment'
import { Box } from '@mui/material'
import { LoaderSpinner } from '../../components/Loader'

const columns = [
  { id: 'number', label: 'Número', minWidth: 10 },
  { id: 'roomName', label: 'Nombre de habitación', minWidth: 300 },
  {
    id: 'roomCategory',
    label: 'Categoría',
    minWidth: 300,
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'lastDate',
    label: 'Estado',
    minWidth: 300,
    format: (value) => value.toLocaleString('en-US')
  }
]

const HotelStatus = () => {
  const [roomList, setRoomList] = useState()
  const dataHeaderPDF = [
    ['Nombre de habitación', 'Número', 'Categoría', 'Estado']
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
