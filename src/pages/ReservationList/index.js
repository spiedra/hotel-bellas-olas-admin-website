import React, { useEffect, useState } from 'react'
import { getReservations } from '../../services/Gets/getReservations'
import { Box } from '@mui/material'
import CustomizedTable from '../../components/Table'
import DownloadButton from '../../components/DownloadButton'
import { exportToPdf } from '../../utils/exportData'
import moment from 'moment'

const columns = [
  { id: 'reservationId', label: 'ID', minWidth: 170 },
  { id: 'roomName', label: 'Habitación', minWidth: 170 },
  {
    id: 'number',
    label: 'Número',
    minWidth: 170,
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'roomCategory',
    label: 'Categoría',
    minWidth: 170
  },
  { id: 'arrival', label: 'Entrada', minWidth: 170 },
  { id: 'departure', label: 'Salida', minWidth: 170 },
  { id: 'user', label: 'Usuario', minWidth: 170 },
  { id: 'userEmail', label: 'Correo', minWidth: 170 }
]

const ReservationList = () => {
  const dataHeaderPDF = [['ID', 'Habitación', '#', 'Categoría', 'Entrada', 'Salida', 'Usuario', 'Email']]
  const [reservationList, setReservationList] = useState()

  useEffect(() => {
    getAllReservations()
  }, [])

  const getAllReservations = () => {
    getReservations().then(response => {
      setReservationList(response)
    })
  }
  const exportPDF = () => {
    if (reservationList != null) {
      const data = reservationList.map((reservation) =>
        ([reservation.reservationId, reservation.roomName, reservation.number, reservation.roomCategory, reservation.arrival, reservation.departure, reservation.user, reservation.userEmail]))
      exportToPdf(dataHeaderPDF, data, 'Lista de reservaciones - ' + moment().format('DD/MM/YYYY'),
        [
          'Hotel Bellas Olas'
        ]
      )
    }
  }
  return (
    <>
        <Box component="h1" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Lista de reservaciones
        </Box>
        <DownloadButton onClick={exportPDF}/>
        {reservationList
          ? (
        <CustomizedTable columns={columns} rows={reservationList || []} />
            )
          : (
              ''
            )}
    </>
  )
}

export default ReservationList
