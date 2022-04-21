import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  Box,
  Button,
  Input,
  TextField
} from '@mui/material'

import { advertisingStyles } from './styles'

const Advertising = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      textField: '',
      description: '',
      file: ''
    }
  })

  const handleCancel = () => {
    console.log('handle cancel')
  }

  const onSubmit = (values) => alert(JSON.stringify(values))

  return (
    <Box sx={advertisingStyles.mainContainer}>
      <h1>Publicidad</h1>
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
            width: '60%',
            mr: '1rem',
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
              name="textField"
              render={({ field }) => (
                <TextField {...field} label="Link de destino" />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField {...field} label="Descripción del anuncio" />
              )}
            />
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <>
                  <Box component="label" sx={{ mt: '0.5rem' }}>
                    Subir una nueva imagen
                  </Box>
                  <Input
                    sx={{ mt: '0.5rem' }}
                    {...field}
                    name="file"
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
            <Button type="button" variant="contained" color="primary" onClick={handleCancel}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Advertising
