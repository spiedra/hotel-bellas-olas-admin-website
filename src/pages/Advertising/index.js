/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { Box, Button, Input, TextField } from '@mui/material'

import { getAdvertisingInfo } from '../../services/Gets/getAdvertisingInfo'

import { advertisingStyles } from './styles'
import { editAdvertisingInfo } from '../../services/Puts/editAdvertisingInfo'
import { LoaderSpinner } from '../../components/Loader'
import CustomizedTable from '../../components/Table'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'adInfo', label: 'Tipo', minWidth: 100 },
  {
    id: 'adLink',
    label: 'Porcentaje',
    maxWidth: '40',
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  }
]

const Advertising = () => {
  const [advertisingInfo, setAdvertisingInfo] = useState()
  const fileInput = useRef()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      AdLink: '',
      AdInfo: '',
      Image: ''
    }
  })

  useEffect(() => {
    getAdvertisingInfo().then((response) => {
      console.log(response)
      setAdvertisingInfo(response)
    })
  }, [])

  const setEditValue = (currentRowId) => {

  }

  const setDeleteValue = (currentRowId) => {

  }

  const handleCancel = () => {
    console.log('handle cancel')
  }

  const onSubmit = async (values) => {
    const formData = new FormData()
    formData.append('AdLink', values.AdLink)
    formData.append('AdInfo', values.AdInfo)
    formData.append('Image', fileInput.current.files[0])

    const response = await editAdvertisingInfo(formData)
    alert(response)
  }

  return (
    <Box sx={{ mt: '3rem', ml: '1.5rem' }}>
      <h1>Administración de publicidad</h1>
          {advertisingInfo
            ? (

                // <Box
                //   key={index}
                //   component="img"
                //   sx={advertisingStyles.adImage}
                //   alt={item.adInfo}
                //   src={`data:image/png;base64,${item.imageBase64}`}
                // ></Box>
                <CustomizedTable
                action={true}
                onEdit={setEditValue}
                onDelete={setDeleteValue}
                columns={columns}
                rows={advertisingInfo || []}
              />
              )

            : (
            <LoaderSpinner />
              )}
        {/* <Box
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
              name="AdLink"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.AdLink}
                  label="Link de destino"
                />
              )}
            />
            <Controller
              control={control}
              name="AdInfo"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  error={!!errors.AdInfo}
                  label="Descripción del anuncio"
                />
              )}
            />
            <Controller
              name="Image"
              control={control}
              rules={{ required: true }}
              render={({ field: { ...field } }) => (
                <>
                  <Box component="label" sx={{ mt: '0.5rem' }}>
                    Subir una nueva imagen
                  </Box>
                  <TextField
                    sx={{ mt: '0.5rem' }}
                    {...field}
                    inputRef={fileInput}
                    error={!!errors.Image}
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
        </Box> */}
      </Box>
  )
}

export default Advertising
