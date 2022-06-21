import React, { useEffect, useState, useRef } from 'react'

import CustomizedTable from '../../components/Table'

import { useForm, Controller } from 'react-hook-form'
import { Box, TextField, Grid } from '@mui/material'

import Modal from '../../components/Modal'
import AddButton from '../../components/AddButton'
import { LoaderSpinner } from '../../components/Loader'

import { getFeatures } from '../../services/Gets/getFeatures'
import { deleteFeature } from '../../services/Deletes/deleteFeature'
import { editFeature } from '../../services/Puts/editFeature'
import { addFeature } from '../../services/Posts/addFeature'

const columns = [
  { id: 'id', label: 'ID', minWidth: 10 },
  { id: 'feature', label: 'Facilidad', maxWidth: 400 },
  {
    id: 'img',
    label: 'Imagen',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
]

const UpdateFeatures = () => {
  const [features, setFeatures] = useState()
  const [currentFeature, setCurrentFeature] = useState()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const fileInput = useRef()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  useEffect(() => {
    reset()
  }, [isEditModalOpen, isAddModalOpen])

  const getAllFeatures = () => {
    getFeatures().then((response) => {
      setFeatures(response)
    })
  }

  useEffect(() => {
    getAllFeatures()
  }, [])

  const onAdd = (values) => {
    const formData = new FormData()
    formData.append('featureDescription', values.FeatureDescription)
    formData.append('featureImage', fileInput.current.files[0])

    addFeature(formData).then((response) => {
      setIsAddModalOpen(false)
      setStateModal({ msg: response, isOpen: true })
      getAllFeatures()
    })
  }

  const onEdit = async (values) => {
    const formData = new FormData()
    formData.append('featureId', currentFeature.id)
    formData.append('featureDescription', values.FeatureDescription)

    if (fileInput.current.files[0]) {
      formData.append('featureImage', fileInput.current.files[0])
    }

    const response = await editFeature(formData)
    setStateModal({ isOpen: true, msg: response })
    setIsEditModalOpen(false)
    getAllFeatures()
  }

  const onDelete = async () => {
    const response = await deleteFeature(currentFeature.id)
    setIsDeleteModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    getAllFeatures()
  }

  const setEditValue = (featureId) => {
    setCurrentFeature(
      features.find((f) => {
        return f.id === featureId
      })
    )
    setIsEditModalOpen(true)
  }

  const setDeleteValue = async (featureId) => {
    setCurrentFeature(featureId)
    setIsDeleteModalOpen(true)
  }

  const addModalBody = (
    <Box component="form" id="add_form" onSubmit={handleSubmit(onAdd)}>
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
            name="FeatureDescription"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.FeatureDescription}
                label="Facilidad"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="FeatureImage"
            rules={{ required: true }}
            render={({ field: { ...field } }) => (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box component="label" sx={{ my: '0.5rem' }}>
                  Subir una nueva imagen
                </Box>
                <TextField
                  {...field}
                  inputRef={fileInput}
                  error={!!errors.FeatureImage}
                  type="file"
                />
              </Box>
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
      {currentFeature
        ? (
        <>
          <Box>
            <h3>Imagen actual</h3>
            <Box
              component="img"
              sx={{ maxWidth: { xs: 175, md: 400 } }}
              alt={'facilidad-img'}
              src={currentFeature.img}
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
                  name="FeatureDescription"
                  rules={{ required: true, min: 1 }}
                  defaultValue={currentFeature.feature}
                  render={({ field: { ...field } }) => (
                    <TextField
                      {...field}
                      type="text"
                      error={!!errors.FeatureDescription}
                      label="Facilidad"
                      defaultValue={currentFeature.feature}
                      multiline
                      rows={4}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="FeatureImage"
                  render={({ field: { ...field } }) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box component="label" sx={{ mt: '0.5rem' }}>
                        Subir una nueva imagen
                      </Box>
                      <TextField
                        {...field}
                        inputRef={fileInput}
                        error={!!errors.FeatureImage}
                        type="file"
                      />
                    </Box>
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
        Administración | Pagina de Facilidades
      </Box>
      {features
        ? (
        <>
          <AddButton onAdd={() => setIsAddModalOpen(true)} />
          <CustomizedTable
            action={true}
            onEdit={setEditValue}
            withImage={'img'}
            onDelete={setDeleteValue}
            columns={columns}
            rows={features || []}
          />
        </>
          )
        : (
        <LoaderSpinner />
          )}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={'Insertar facilidad'}
        idForm="add_form"
        content={addModalBody}
      />
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        maxWidth="lg"
        title={'Modificar facilidad'}
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
        title={'Eliminar Temporada'}
        onSubmit={onDelete}
        content="¿Está seguro de eliminar esta temporada?"
      />
    </>
  )
}

export default UpdateFeatures
