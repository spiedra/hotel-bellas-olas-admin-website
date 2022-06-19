/* eslint-disable no-unused-vars */
import { Box, Button, Grid, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import { roomAvailabilityStyles } from './styles'
import { Controller, useForm } from 'react-hook-form'
import CustomizedTable from '../../components/Table'
import { getRoomAvailability } from '../../services/Posts/getRoomAvailability'
import DownloadButton from '../../components/DownloadButton'
import { exportToPdf } from '../../utils/exportData'
import moment from 'moment'

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
    id: 'cost',
    label: 'Costo Estadia',
    minWidth: 170,
    align: 'right'
  }
]

const RoomAvailability = () => {
  const [roomList, setRoomList] = useState()
  const dataHeaderPDF = [['Nombre de habitación', 'Número', 'Categoría', 'Costo']]
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ArrivalDate: '',
      DepartureDate: '',
      RoomType: ''
    }
  })

  const onSubmit = (values) => {
    getRoomAvailability({
      ArrivalDate: values.ArrivalDate,
      DepartureDate: values.DepartureDate,
      RoomType: values.RoomType
    }).then((response) => {
      setRoomList(response)
    })
  }

  const exportPDF = () => {
    if (roomList != null) {
      const data = roomList.map((room) =>
        ([room.roomName, room.number, room.roomCategory, room.cost]))
      exportToPdf(dataHeaderPDF, data, 'Disponibilidad del hotel - ' + moment().format('DD/MM/YYYY'),
        [
          'Hotel Bellas Olas'
        ]
      )
    }
  }

  return (
    <>
      <Box>
        <Box component="h1" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Disponibilidad de Habitaciones
        </Box>
        <DownloadButton onClick={exportPDF}/>
        <Box
          component="form"
          mt="3rem"
          sx={{
            '& .MuiTextField-root': {
              my: 1,
              width: { xs: '37ch', md: '41ch' }
            }
          }}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid
            container
            justifyContent="flex-start"
            spacing={{ xs: 0.5, sm: 0.5, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item>
              <Controller
                control={control}
                name="ArrivalDate"
                rules={{ required: true }}
                render={({ field: { ...field } }) => (
                  <TextField
                    sx={roomAvailabilityStyles.select}
                    {...field}
                    type="date"
                    error={!!errors.ArrivalDate}
                    label="Fecha de Llegada"
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="DepartureDate"
                rules={{ required: true }}
                render={({ field: { ...field } }) => (
                  <TextField
                    sx={roomAvailabilityStyles.select}
                    {...field}
                    type="date"
                    error={!!errors.departureDate}
                    label="Fecha de salida"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="RoomType"
                rules={{ required: true }}
                render={({ field: { ...field } }) => (
                  <TextField
                    sx={roomAvailabilityStyles.select}
                    {...field}
                    select
                    error={!!errors.RoomType}
                    label="Tipo de Habitación"
                  >
                    <MenuItem value="Suite">Suite</MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={roomAvailabilityStyles.button}
            onClick={handleSubmit}
          >
            Consultar
          </Button>
        </Box>
      </Box>

      {roomList
        ? (
        <CustomizedTable columns={columns} rows={roomList || []} />
          )
        : (
            ''
          )}
    </>
  )
}

export default RoomAvailability
