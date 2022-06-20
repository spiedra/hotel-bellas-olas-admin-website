/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'

import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextareaAutosize,
  TextField
} from '@mui/material'

import { getHomeInfo } from '../../services/Gets/getHomeInfo'
import { editHomeInfo } from '../../services/Puts/editHomeInfo'

import updateHomeStyles from './styles'

import Modal from '../../components/Modal'
import { LoaderSpinner } from '../../components/Loader'

import { Controller, useForm } from 'react-hook-form'

const UpdateHome = () => {
  const [homeInfo, setHomeInfo] = useState()
  const [modalInfo, setModalInfo] = useState({ isOpen: false, msg: '' })
  const fileInput = useRef()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  useEffect(() => {
    getHomeInfo().then((response) => {
      setHomeInfo(response)
    })
  }, [modalInfo])

  useEffect(() => {
    reset()
  }, [modalInfo])

  const onSaveChanges = async (values) => {
    const formData = new FormData()
    formData.append('HomeText', values.homeText)

    if (fileInput.current.files[0]) {
      formData.append('HomeImage', fileInput.current.files[0])
    }

    const response = await editHomeInfo(formData)
    setModalInfo({ isOpen: true, msg: response })
    setHomeInfo()
  }

  return (
    <>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración | Pagina de Inicio
      </Box>
      {homeInfo
        ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}
        >
          <Box>
            <h3>Imagen actual</h3>
            <Box
              component="img"
              sx={{ maxWidth: { xs: 175, md: 400 } }}
              alt={homeInfo.alt}
              src={homeInfo.img}
            ></Box>
          </Box>
          <Box
            component="form"
            sx={{
              pt: { xs: 0, md: '3.7rem' },
              '& .MuiTextField-root': {
                my: 1,
                width: { xs: '37ch', md: '75ch' }
              }
            }}
            autoComplete="off"
            onSubmit={handleSubmit(onSaveChanges)}
          >
            <Grid
              container
              justifyContent="flex-start"
              flexDirection="column"
              spacing={{ xs: 0.5, sm: 0.5, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item>
                <Controller
                  control={control}
                  name="homeText"
                  rules={{ required: true, min: 1 }}
                  defaultValue={homeInfo ? homeInfo.homeText : ''}
                  render={({ field: { ...field } }) => (
                    <TextField
                      {...field}
                      type="text"
                      error={!!errors.homeText}
                      label="Texto de inicio"
                      defaultValue={homeInfo ? homeInfo.homeText : ''}
                      multiline
                      rows={4}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="image"
                  render={({ field: { ...field } }) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box component="label" sx={{ mt: '0.5rem' }}>
                        Subir una nueva imagen
                      </Box>
                      <TextField
                        {...field}
                        inputRef={fileInput}
                        error={!!errors.image}
                        type="file"
                      />
                    </Box>
                  )}
                />
              </Grid>
              <Grid item alignSelf="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
          )
        : (
        <LoaderSpinner />
          )}

      <Modal
        isOpen={modalInfo.isOpen}
        onClose={() => setModalInfo({ ...modalInfo, isOpen: false })}
        onSubmit={() => setModalInfo({ ...modalInfo, isOpen: false })}
        title="Mensaje del sistema"
        content={modalInfo.msg}
      />
    </>
  )
}

export default UpdateHome
