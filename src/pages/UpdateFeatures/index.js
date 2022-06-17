/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from 'react'
import CustomizedTable from '../../components/Table'
import { useForm, Controller } from 'react-hook-form'
import { Button, Box, TextareaAutosize, TextField } from '@mui/material'
import Modal from '../../components/Modal'
import AddButton from '../../components/AddButton'
import { getFeatures } from '../../services/Gets/getFeatures'
import { DeleteFeature } from '../../services/Deletes/deleteFeature'
import { LoaderSpinner } from '../../components/Loader'
import updateStyles from './styles'
import { editFeature } from '../../services/Puts/editFeature'
import { addFeature } from '../../services/Posts/addFeature'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
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
  const [currentEditFeature, setCurrentEditFeature] = useState({ id: '', feature: '' })
  const [currentDeleteFeature, setCurrentDeleteFeature] = useState()
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const fileInput = useRef()

  const getAllFeatures = () => {
    getFeatures().then(response => {
      setFeatures(response)
    })
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      FeatureDescription: '',
      FeatureImage: ''
    }
  })

  const onAdd = (values) => {
    if (fileInput.current.files[0]) {
      const formData = new FormData()
      formData.append('featureDescription', values.FeatureDescription)
      formData.append('featureImage', fileInput.current.files[0])
      addFeature(formData).then(response => {
        setStateModal({ msg: response, isOpen: true })
        getAllFeatures()
      })
      setIsInsertModalOpen(false)
    } else {
      setStateModal({ msg: 'Debe ingresar una imagen primero', isOpen: true })
    }
  }

  const setEditValue = (featureId) => {
    setIsEditModalOpen(true)
    setCurrentEditFeature(features.filter((f) => { return f.id === featureId })[0])
  }

  const onSaveChanges = async (values) => {
    const formData = new FormData()
    formData.append('featureId', currentEditFeature.id)
    formData.append('featureDescription', values.FeatureDescription)
    if (fileInput.current.files[0]) {
      formData.append('featureImage', fileInput.current.files[0])
    }
    const response = await editFeature(formData)
    setStateModal({ isOpen: true, msg: response })
    setIsEditModalOpen(false)
    getAllFeatures()
  }

  const onConfirmDelete = async (featureId) => {
    setIsConfirmModalOpen(true)
    setCurrentDeleteFeature(featureId)
  }

  const onDelete = async () => {
    const response = await DeleteFeature(currentDeleteFeature)
    setIsConfirmModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    getAllFeatures()
  }

  useEffect(() => {
    getAllFeatures()
  }, [])

  const ModalInsertBody = () => {
    return (
        <Box sx={updateStyles.mainContainer}>
      <Box component="h1" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        Insertar facilidad
      </Box>
      <Box sx={updateStyles.subContainer}>
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
          onSubmit={handleSubmit(onAdd)}
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
              name="FeatureDescription"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                 fullWidth
                  {...field}
                  inputRef={ref}
                  error={!!errors.FeatureDescription}
                  label="Facilidad"
                />
              )}
            />
                <>
                  <Box component="label" sx={{ mt: '0.5rem' }}>
                    Subir una imagen
                  </Box>
                  <TextField
                    fullWidth
                    sx={{ mt: '0.5rem' }}
                    inputRef={fileInput}
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
              Aceptar
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => setIsInsertModalOpen(false)}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
    )
  }

  const ModalEditBody = () => {
    return (
        <>
        <Box sx={updateStyles.subContainer}>
        <Box sx={{ mb: '.5rem' }}>
          <h3>Imagen actual</h3>
          {currentEditFeature
            ? (
            <Box
              component="img"
              style={{ width: '300px' }}
              sx={updateStyles.Image}
              alt={'facilidad-img'}
              src={currentEditFeature.img}
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
                 <Controller
              control={control}
              name="FeatureDescription"
              rules={{ required: true }}
              defaultValue={currentEditFeature.feature}
              render={({ field: { ref, ...field } }) => (
                <TextareaAutosize
                  {...field}
                  fullWidth
                  minRows={4}
                  defaultValue={currentEditFeature.feature}
                  inputRef={ref}
                  error={!!errors.AdLink}
                  label="Link de destino"
                />
              )}
            />
                <>
                  <Box component="label" sx={{ mt: '0.5rem' }}>
                    Subir una imagen
                  </Box>
                  <TextField
                    fullWidth
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
        </>
    )
  }
  return (
    <>
        <h1>Actualizar facilidades</h1>
        <AddButton onAdd={() => setIsInsertModalOpen(true)}/>
        {
            features
              ? <CustomizedTable action={true} onEdit={setEditValue} withImage={'img'} onDelete={(onConfirmDelete)} columns={columns} rows={features || []} />
              : <LoaderSpinner/>
        }
        <Modal
                isOpen ={isInsertModalOpen}
                onClose={() => setIsInsertModalOpen(false)}
                title={'Insertar facilidad'}
                modalBody={<ModalInsertBody/>}
        />
        <Modal
            isOpen ={stateModal.isOpen}
            onClose={() => setStateModal({ isOpen: false })}
            title={'Mensaje del sistema'}
            modalBody={stateModal.msg}
        />
        <Modal
            isOpen ={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            title={'¿Está seguro que desea eliminar?'}
            modalBody={
                <>Se eliminará la facilidad #{currentDeleteFeature}</>
            }
            modalActions={
                <>
                    <Button
                        sx={{ mr: '1rem' }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: '50px' }}
                        onClick={onDelete}
                        >
                        Aceptar
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => setIsConfirmModalOpen(false)}
                        style={{ marginBottom: '50px' }}
                        >
                        Cancelar
                    </Button>
                </>
            }
        />
        <Modal
            isOpen ={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={'Modificar facilidad'}
            modalBody={<ModalEditBody/>}
        />
    </>
  )
}

export default UpdateFeatures
