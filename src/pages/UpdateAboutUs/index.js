import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button, Box, TextField, Grid } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'

import { Controller, useForm } from 'react-hook-form'

import { LoaderSpinner } from '../../components/Loader'
import Modal from '../../components/Modal'

import { EditAboutUsText } from '../../services/Puts/EditAboutUsText'
import { getAboutUsInfo } from '../../services/Gets/getAboutUsInfo'

const UpdateAboutUs = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState()
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const fetchAboutUsInfo = () => {
    getAboutUsInfo().then((response) => {
      setAboutUsInfo(response.aboutUsText)
    })
  }
  useEffect(() => {
    fetchAboutUsInfo()
  }, [])

  const onSaveAboutUsText = async (values) => {
    const formData = new FormData()
    formData.append('AboutUsText', values.AboutUsText)

    const response = await EditAboutUsText(formData)
    setStateModal({ msg: response, isOpen: true })
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
                  name="AboutUsText"
                  rules={{ required: true, min: 1 }}
                  defaultValue={aboutUsInfo}
                  render={({ field: { ref, value, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      autoFocus
                      defaultValue={aboutUsInfo}
                      margin="dense"
                      type="text"
                      multiline
                      InputLabelProps={{ shrink: true }}
                      row={10}
                      error={!!errors.AboutUsText}
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
          </Box>
        </>
          )
        : (
        <LoaderSpinner />
          )}

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

export default UpdateAboutUs
