import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import { Button, Box, TextField, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { LoaderSpinner } from '../../components/Loader'
import Modal from '../../components/Modal'

import { EditAboutUsText } from '../../services/Puts/EditAboutUsText'
import { getAboutUsInfo } from '../../services/Gets/getAboutUsInfo'

const UpdateAboutUs = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState()
  const [isModalResponseOpen, setIsModalResponseOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const fetchAboutUsInfo = () => {
    getAboutUsInfo().then((response) => {
      setAboutUsInfo(response)
    })
  }

  useEffect(() => {
    fetchAboutUsInfo()
  }, [])

  const onSaveAboutUsText = async (values) => {
    const formData = new FormData()
    formData.append('AboutUsText', values.aboutUsText)

    const response = await EditAboutUsText(formData)
    setModalMessage(response)
    setIsModalResponseOpen(true)
    fetchAboutUsInfo()
  }

  return (
    <>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración | Pagina de Sobre Nosotros
      </Box>
      {aboutUsInfo
        ? (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: '1rem' }}
            onClick={() => navigate('/admin/manage-gallery')}
          >
            Modificar la Galería <EditIcon sx={{ ml: '.5rem' }} />
          </Button>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {
                my: 1,
                width: { xs: '37ch', md: '70ch' }
              }
            }}
            autoComplete="off"
            onSubmit={handleSubmit(onSaveAboutUsText)}
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
                  name="aboutUsText"
                  rules={{ required: true, min: 1 }}
                  defaultValue={aboutUsInfo.aboutUsText}
                  render={({ field: { ...field } }) => (
                    <TextField
                      {...field}
                      autoFocus
                      margin="dense"
                      type="text"
                      multiline
                      InputLabelProps={{ shrink: true }}
                      row={10}
                      error={!!errors.aboutUsText}
                      fullWidth
                      label="Texto sobre nosotros"
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
              onClick={() => reset(aboutUsInfo)}
            >
              Cancelar
            </Button>
          </Box>
        </>
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

export default UpdateAboutUs
