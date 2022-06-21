/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { getContactUsInfo } from '../../services/Gets/getContactUsInfo'
import { Button, Box, TextareaAutosize, TextField, Grid } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { EditHotelContact } from '../../services/Puts/EditHotelInfo'

const UpdateContactUs = () => {
  const [contactUsInfo, setContactUsInfo] = useState({
    id: '',
    name: '',
    description: '',
    number: '',
    email: ''
  })
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })

  useEffect(() => {
    reset()
  }, [contactUsInfo])

  useEffect(() => {
    getContactInfo()
  }, [])

  const getContactInfo = () => {
    getContactUsInfo().then((response) => {
      setContactUsInfo(response)
    })
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (values) => {
    const formData = new FormData()
    formData.append('Name', values.HotelName)
    formData.append('PhoneNumber', values.HotelNumber)
    formData.append('Email', values.HotelEmail)
    formData.append('Description', values.HotelDescription)
    formData.append('Address', values.HotelLocation)

    const response = await EditHotelContact(formData)
    setStateModal({ isOpen: true, msg: response })
    getContactInfo()
  }

  return (
    <>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración | Pagina de Contáctanos
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            my: 1,
            width: { xs: '37ch', md: '65ch' }
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
              name="HotelName"
              rules={{ required: true, min: 1 }}
              defaultValue={contactUsInfo.name}
              render={({ field: { ref, value, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  defaultValue={contactUsInfo.name}
                  margin="dense"
                  type="text"
                  error={!!errors.HotelName}
                  fullWidth
                  label="Nombre del hotel"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="HotelDescription"
              rules={{ required: true, min: 1 }}
              defaultValue={contactUsInfo.description}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  autoFocus
                  margin="dense"
                  type="text"
                  fullWidth
                  defaultValue={contactUsInfo.description}
                  error={!!errors.HotelDescription}
                  label="Descripción"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="HotelNumber"
              rules={{ required: true, min: 1 }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  fullWidth
                  {...field}
                  inputRef={ref}
                  error={!!errors.HotelNumber}
                  label="Numero(s)"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="HotelEmail"
              rules={{ required: true, min: 1 }}
              render={({ field: { ref, value, ...field } }) => (
                <TextField
                  fullWidth
                  {...field}
                  inputRef={ref}
                  value={value}
                  error={!!errors.HotelEmail}
                  label="Email"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="HotelLocation"
              rules={{ required: true, min: 1 }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  fullWidth
                  {...field}
                  inputRef={ref}
                  error={!!errors.HotelLocation}
                  label="Localización"
                />
              )}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: '.8rem' }}
          onClick={handleSubmit}
        >
          Aceptar
        </Button>
      </Box>
      <Modal
        isOpen={stateModal.isOpen}
        onClose={() => setStateModal({ isOpen: false })}
        onSubmit={() => setStateModal({ isOpen: false })}
        title={'Mensaje del sistema'}
        content={stateModal.msg}
      />
    </>
  )
}

export default UpdateContactUs
