/* eslint-disable no-unused-vars */
import { Box, Grid, TextField } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import AddButton from '../../components/AddButton'
import { LoaderSpinner } from '../../components/Loader'
import Modal from '../../components/Modal'
import CustomizedTable from '../../components/Table'
import { getAboutUsInfo } from '../../services/Gets/getAboutUsInfo'

import { useForm, Controller } from 'react-hook-form'
import { EditGalleryImage } from '../../services/Puts/editGalleryImage'
import { DeleteImageGallery } from '../../services/Deletes/deleteImageGallery'
import { addGalleryImage } from '../../services/Posts/addGalleryImage'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'img', label: 'Imagen', maxWidth: 400 }
]

const ManageGallery = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState()
  const [currentImage, setCurrentImage] = useState()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })
  const fileInput = useRef()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const fetchAboutUsInfo = () => {
    getAboutUsInfo().then((response) => {
      setAboutUsInfo(response.imgList)
    })
  }

  useEffect(() => {
    fetchAboutUsInfo()
  }, [])

  useEffect(() => {
    reset()
  }, [isAddModalOpen, isEditModalOpen])

  const setEditValue = (imageId) => {
    setCurrentImage(
      aboutUsInfo.find((f) => {
        return f.id === imageId
      })
    )
    setIsEditModalOpen(true)
  }

  const setDeleteValue = (imageId) => {
    setCurrentImage(imageId)
    setIsDeleteModalOpen(true)
  }

  const onAdd = () => {
    const formData = new FormData()
    formData.append('Image', fileInput.current.files[0])

    addGalleryImage(formData).then((response) => {
      setIsAddModalOpen(false)
      setStateModal({ msg: response, isOpen: true })
      fetchAboutUsInfo()
    })
  }

  const onEdit = async () => {
    const formData = new FormData()
    formData.append('ImageId', currentImage.id)
    formData.append('Image', fileInput.current.files[0])

    const response = await EditGalleryImage(formData)
    setIsEditModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    fetchAboutUsInfo()
  }

  const onDelete = async () => {
    const response = await DeleteImageGallery(currentImage)
    setIsDeleteModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    fetchAboutUsInfo()
  }

  const addModalBody = (
    <Box
      component="form"
      id="add_form"
      autoComplete="off"
      onSubmit={handleSubmit(onAdd)}
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
            name="image"
            rules={{ required: true }}
            render={({ field: { ...field } }) => (
              <TextField
                {...field}
                inputRef={fileInput}
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="dense"
                fullWidth
                type="file"
                error={!!errors.image}
                label="Subir una nueva imagen"
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )

  const editModalBody = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: { sm: 'flex-start', md: 'space-around' }
      }}
    >
      {currentImage
        ? (
        <>
          <Box>
            <h3>Imagen actual</h3>
            <Box
              component="img"
              sx={{ maxWidth: { xs: 175, md: 400 } }}
              alt={'advertising-img'}
              src={currentImage.img}
            ></Box>
          </Box>
          <Box
            component="form"
            id="edit_form"
            sx={{
              pt: { xs: 0, md: '3.7rem' },
              '& .MuiTextField-root': {
                my: 1,
                width: { xs: '37ch', md: '75ch' }
              }
            }}
            autoComplete="off"
            onSubmit={handleSubmit(onEdit)}
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
                  name="image"
                  rules={{ required: true }}
                  render={({ field: { ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={fileInput}
                      InputLabelProps={{ shrink: true }}
                      autoFocus
                      margin="dense"
                      fullWidth
                      type="file"
                      error={!!errors.image}
                      label="Subir una nueva imagen"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </>
          )
        : (
        <LoaderSpinner />
          )}
    </Box>
  )

  return (
    <>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración | Galería
      </Box>
      {aboutUsInfo
        ? (
        <>
          <AddButton onAdd={() => setIsAddModalOpen(true)} />
          <CustomizedTable
            action={true}
            onEdit={setEditValue}
            withImage={'img'}
            onDelete={setDeleteValue}
            columns={columns}
            rows={aboutUsInfo || []}
          />
        </>
          )
        : (
        <LoaderSpinner />
          )}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={'Insertar Imagen'}
        idForm="add_form"
        content={addModalBody}
      />
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={'Modificar Imagen'}
        maxWidth="lg"
        idForm="edit_form"
        content={editModalBody}
      />
      <Modal
        isOpen={stateModal.isOpen}
        onClose={() => setStateModal({ isOpen: false })}
        onSubmit={() => setStateModal({ isOpen: false })}
        title={'Mensaje del sistema'}
        content={stateModal.msg}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={'Eliminar Imagen'}
        onSubmit={onDelete}
        content="¿Está seguro de eliminar esta imagen?"
      />
    </>
  )
}

export default ManageGallery
