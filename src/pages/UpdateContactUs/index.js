import React, { useEffect, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Modal from '../../components/Modal'
import { LoaderSpinner } from '../../components/Loader'

import { getContactUsInfo } from '../../services/Gets/getContactUsInfo'
import { EditHotelContact } from '../../services/Puts/EditHotelInfo'

import { Button, Box, TextField, Grid } from '@mui/material'

const UpdateContactUs = () => {
  const [contactUsInfo, setContactUsInfo] = useState()
  const [isModalResponseOpen, setIsModalResponseOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const getContactInfo = () => {
    getContactUsInfo().then((response) => {
      setContactUsInfo(response)
    })
  }

  const onReset = () => {
    reset(contactUsInfo)
  }

  useEffect(() => {
    getContactInfo()
  }, [])

  const onSubmit = async (values) => {
    console.log(values)
    const formData = new FormData()
    formData.append('Name', values.name)
    formData.append('PhoneNumber', values.number)
    formData.append('Email', values.email)
    formData.append('Description', values.description)
    formData.append('Address', values.location)

    const response = await EditHotelContact(formData)
    setModalMessage(response)
    setIsModalResponseOpen(true)
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
      {contactUsInfo
        ? (
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
                name="name"
                rules={{ required: true, min: 1 }}
                defaultValue={contactUsInfo.name}
                render={({ field: { ...field } }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    type="text"
                    error={!!errors.name}
                    fullWidth
                    label="Nombre del hotel"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="description"
                rules={{ required: true, min: 1 }}
                defaultValue={contactUsInfo.description}
                render={({ field: { ...field } }) => (
                  <TextField
                    {...field}
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    error={!!errors.description}
                    label="Descripción"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="number"
                defaultValue={contactUsInfo.number}
                rules={{ required: true, min: 1 }}
                render={({ field: { ...field } }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.number}
                    label="Numero(s)"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="email"
                rules={{ required: true, min: 1 }}
                defaultValue={contactUsInfo.email}
                render={({ field: { ...field } }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.email}
                    label="Email"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="location"
                rules={{ required: true, min: 1 }}
                defaultValue={contactUsInfo.location}
                render={({ field: { ...field } }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.location}
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
          >
            Aceptar
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: '.8rem', ml: '1rem' }}
            onClick={() => onReset()}
          >
            Cancelar
          </Button>
        </Box>
          )
        : (
        <LoaderSpinner />
          )}

      <Modal
        isOpen={isModalResponseOpen}
        onClose={() => setIsModalResponseOpen(false)}
        onSubmit={() => setIsModalResponseOpen(false)}
        title={'Mensaje del sistema'}
        content={modalMessage}
      />
    </>
  )
}

export default UpdateContactUs
