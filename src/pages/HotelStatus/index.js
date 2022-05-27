import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import CustomizedTable from '../../components/Table'
import { getHotelStatus } from '../../services/Gets/getHotelStatus'

const HotelStatus = () => {
  const [roomList, setRoomList] = useState()
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
      label: 'último acceso',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US')
    }
  ]

  useEffect(() => {
    getHotelStatus().then((response) => {
      setRoomList(response)
      console.log(response)
    })
  }, [])
  return (
    <>
      <h1>Estado del hotel hoy <Moment format='DD/MM/yyyy'></Moment> </h1>
      <CustomizedTable
      columns={columns}
      rows= {roomList || []}
      />
    </>
  )
}

export default HotelStatus
