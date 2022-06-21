import React, { useEffect, useState } from 'react'

import CustomizedTable from '../../components/Table'
import DownloadButton from '../../components/DownloadButton'

import { Box } from '@mui/material'

import { getReservations } from '../../services/Gets/getReservations'
import { exportToPdf } from '../../utils/exportData'

import moment from 'moment'
import { LoaderSpinner } from '../../components/Loader'

const columns = [
  { id: 'reservationId', label: 'ID', minWidth: 10 },
  { id: 'roomName', label: 'Habitación', minWidth: 100 },
  {
    id: 'number',
    label: 'Número',
    minWidth: 25,
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'roomCategory',
    label: 'Categoría',
    minWidth: 100
  },
  { id: 'arrival', label: 'Entrada', minWidth: 170 },
  { id: 'departure', label: 'Salida', minWidth: 170 },
  { id: 'user', label: 'Usuario', minWidth: 175 },
  { id: 'userEmail', label: 'Correo', minWidth: 100 }
]

const dataHeaderPDF = [
  [
    'ID',
    'Habitación',
    '#',
    'Categoría',
    'Entrada',
    'Salida',
    'Usuario',
    'Email'
  ]
]

const ReservationList = () => {
  const [reservationList, setReservationList] = useState()

  useEffect(() => {
    getAllReservations()
  }, [])

  const getAllReservations = () => {
    getReservations().then((response) => {
      setReservationList(response)
    })
  }

  const exportPDF = () => {
    if (reservationList != null) {
      const data = reservationList.map((reservation) => [
        reservation.reservationId,
        reservation.roomName,
        reservation.number,
        reservation.roomCategory,
        reservation.arrival,
        reservation.departure,
        reservation.user,
        reservation.userEmail
      ])
      exportToPdf(
        dataHeaderPDF,
        data,
        'Lista de reservaciones - ' + moment().format('DD/MM/YYYY'),
        ['Hotel Bellas Olas']
      )
    }
  }

  return (
    <>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Lista de Reservaciones
      </Box>
      {reservationList
        ? (
        <>
          <DownloadButton onClick={exportPDF} />
          <CustomizedTable columns={columns} rows={reservationList || []} />
        </>
          )
        : (
        <LoaderSpinner />
          )}
    </>
  )
}

export default ReservationList
