import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import CustomizedTable from '../../components/Table'
import { getHotelStatus } from '../../services/Gets/getHotelStatus'
import DownloadButton from '../../components/DownloadButton'
import { exportToPdf } from '../../utils/exportData'
import moment from 'moment'

const HotelStatus = () => {
  const [roomList, setRoomList] = useState()
  const dataHeaderPDF = [['Nombre de habitación', 'Número', 'Categoría', 'Ultimo ingreso']]
  const columns = [
    { id: 'roomName', label: 'Nombre de habitación', minWidth: 170 },
    { id: 'number', label: 'Número', minWidth: 100 },
    { id: 'roomCategory', label: 'Categoría', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US') },
    { id: 'lastDate', label: 'último acceso', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US') }
  ]
  useEffect(() => {
    getHotelStatus().then((response) => {
      setRoomList(response)
    })
  }, [])

  const exportPDF = () => {
    if (roomList != null) {
      const data = roomList.map((room) =>
        ([room.roomName, room.number, room.roomCategory, room.lastDate]))
      exportToPdf(dataHeaderPDF, data, 'Estado actual del hotel - ' + moment().format('DD/MM/YYYY'),
        [
          'Hotel Bellas Olas'
        ]
      )
    }
  }

  return (
    <>
      <h1>Estado del hotel hoy <Moment format='DD/MM/yyyy'></Moment> </h1>
      <DownloadButton onClick={exportPDF}/>
      <CustomizedTable
      columns={columns}
      rows= {roomList || []}
      />
    </>
  )
}

export default HotelStatus
