/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Box, Button, TextField } from '@mui/material'

import { advertisingStyles } from './styles'

const Advertising = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      targetLink: '',
      imgDescription: '',
      imgFile: ''
    }
  })

  useEffect(() => {

  }, [])

  const handleCancel = () => {
    console.log('handle cancel')
  }

  const onSubmit = (values) => alert(JSON.stringify(values))

  return (
    <Box sx={advertisingStyles.mainContainer}>
      <Box component="h1" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        Publicidad
      </Box>
      <Box sx={advertisingStyles.subContainer}>
        <div>
          <h3>Imagen actual</h3>
          <Box
            component="img"
            sx={advertisingStyles.adImage}
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jtzLV8nbTiaPVkbonKgPJAHaDk%26pid%3DApi&f=1"
          ></Box>
        </div>
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Controller
              control={control}
              name="targetLink"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.targetLink}
                  label="Link de destino"
                />
              )}
            />
            <Controller
              control={control}
              name="imgDescription"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.imgDescription}
                  label="Descripción del anuncio"
                />
              )}
            />
            <Controller
              name="imgFile"
              control={control}
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <>
                  <Box component="label" sx={{ mt: '0.5rem' }}>
                    Subir una nueva imagen
                  </Box>
                  <TextField
                    sx={{ mt: '0.5rem' }}
                    {...field}
                    inputRef={ref}
                    error={!!errors.imgFile}
                    type="file"
                  />
                </>
              )}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              my: '4rem'
            }}
          >
            <Button
              sx={{ mr: '1rem' }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Aceptar
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Advertising
