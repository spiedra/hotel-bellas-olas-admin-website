/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'

import { useForm } from 'react-hook-form'
import { Box, Button, TextareaAutosize, TextField } from '@mui/material'
import { getHomeInfo } from '../../services/Gets/getHomeInfo'
import { editHomeInfo } from '../../services/Puts/editHomeInfo'
import updateHomeStyles from './styles'
import Modal from '../../components/Modal'

const UpdateHome = () => {
  const [homeInfo, setHomeInfo] = useState({ img: '', homeText: '' })
  const [modalInfo, setModalInfo] = useState({ isOpen: false, msg: '' })
  const { register, formState: { errors }, handleSubmit } = useForm()
  const fileInput = useRef()
  useEffect(() => {
    getHomeInfo().then((response) => {
      setHomeInfo(response)
    })
  }, [])

  const onSaveChanges = async (values) => {
    const formData = new FormData()
    formData.append('HomeText', values.homeText)
    if (fileInput.current.files[0]) {
      formData.append('HomeImage', fileInput.current.files[0])
    }
    const response = await editHomeInfo(formData)
    setModalInfo({ isOpen: true, msg: response })
  }

  return (
    <>
<Box sx={updateHomeStyles.mainContainer}>
      <Box component="h1" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        Actualizar inicio
      </Box>
      <Box sx={updateHomeStyles.subContainer}>
        <Box sx={{ mb: '.5rem' }}>
          <h3>Imagen actual</h3>
          {homeInfo
            ? (
            <Box
              component="img"
              sx={updateHomeStyles.Image}
              alt={homeInfo.alt}
              src={homeInfo.img}
            ></Box>
              )
            : (
            <h5>Cargando</h5>
              )}
        </Box>
        <Box
          noValidate
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
              justifyContent: 'center',
              height: '100%'
            }}
          >
                <TextareaAutosize
                {...register('homeText')}
                placeholder="Texto de inicio"
                minRows={10}
                maxRows={4}
                onChange={(e) => setHomeInfo(previusState => ({ ...previusState, homeText: e.target.value }))}
                value={homeInfo ? homeInfo.homeText : ''}
                sx={{ maxWidth: { xs: '100%', md: '55%' } }}
                style={{ width: 500 }}
                />
                <>
                  <Box component="label" sx={{ mt: '0.5rem' }}>
                    Subir una nueva imagen
                  </Box>
                  <TextField
                   inputRef={fileInput}
                    sx={{ maxWidth: { xs: '100%', md: '55%' }, mt: '0.5rem' }}
                    type="file"
                  />
                </>
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
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
      isOpen={modalInfo.isOpen}
      onClose={() => setModalInfo({ ...modalInfo, isOpen: false })}
      title={'Mensaje del sistema'}
      modalBody={<p>{modalInfo.msg}</p>}
      />
    </Box>
    </>
  )
}

export default UpdateHome
