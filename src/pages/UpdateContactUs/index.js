/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { getContactUsInfo } from '../../services/Gets/getContactUsInfo'
import { Button, Box, TextareaAutosize, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { EditHotelContact } from '../../services/Puts/EditHotelInfo'

const UpdateContactUs = () => {
  const [contactUsInfo, setContactUsInfo] = useState({ id: '', name: '', description: '', number: '', email: '' })
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })

  useEffect(() => {
    reset()
  }, [contactUsInfo])

  useEffect(() => {
    getContactInfo()
  }, [])

  const getContactInfo = () => {
    getContactUsInfo().then(response => {
      setContactUsInfo(response)
    })
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSaveChanges = async (values) => {
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
            <Box component="h1" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                Actualizar contáctanos
            </Box>
            <Box
            component="form"
            sx={{
              height: '10rem',
              width: { xs: '100%', md: '60%' },
              '& .MuiTextField-root': {
                width: '100%',
                my: '.5rem'
              }
            }}
            onSubmit={handleSubmit(onSaveChanges)}
            >
            <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                >
                   <Controller
                        control={control}
                        name="HotelName"
                        rules={{ required: true }}
                        defaultValue={contactUsInfo.name}
                        render={({ field: { ref, value, ...field } }) => (
                            <TextField
                            {...field}
                            inputRef={ref}
                            defaultValue={contactUsInfo.name}
                            margin="dense"
                            type="text"
                            fullWidth
                            label="Nombre del hotel"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="HotelDescription"
                        rules={{ required: true }}
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

                     <Controller
                    control={control}
                    name="HotelNumber"
                    rules={{ required: true }}
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
                    <Controller
                    control={control}
                    name="HotelEmail"
                    rules={{ required: true }}
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
                    <Controller
                    control={control}
                    name="HotelLocation"
                    rules={{ required: true }}
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
                     <Button
                        sx={{ mr: '1rem' }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        >
                        Guardar cambios
                    </Button>
                </Box>
        </Box>
        <Modal
            isOpen ={stateModal.isOpen}
            onClose={() => setStateModal({ isOpen: false })}
            title={'Mensaje del sistema'}
            modalBody={stateModal.msg}
        />
        </>
  )
}

export default UpdateContactUs
