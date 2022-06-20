/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import CustomizedTable from '../../components/Table'
import { useForm, Controller } from 'react-hook-form'
import { Button, Box, TextareaAutosize, TextField } from '@mui/material'
import Modal from '../../components/Modal'
import AddButton from '../../components/AddButton'
import { getAdvertisingInfo } from '../../services/Gets/getAdvertisingInfo'
import { advertisingStyles } from './styles'
import { editAdvertisingInfo } from '../../services/Puts/editAdvertisingInfo'
import { addAdvertising } from '../../services/Posts/addAdvertising'
import { LoaderSpinner } from '../../components/Loader'
import { DeleteAdvertising } from '../../services/Deletes/deleteAdvertising'

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'adLink', label: 'URL', maxWidth: 400 },
  { id: 'info', label: 'Información', maxWidth: 400 },
  {
    id: 'img',
    label: 'Imagen',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
]

const Advertising = () => {
  const [advertisingList, setAdvertisingList] = useState()
  const fileInput = useRef()
  const [currentEditAdvertising, setCurrentEditAdvertising] = useState({
    id: '',
    adLink: '',
    info: '',
    img: ''
  })
  const [currentDeleteAdvertising, setCurrentDeleteAdvertising] = useState()
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    reset()
  }, [isInsertModalOpen, isEditModalOpen])

  useEffect(() => {
    getAllAdvertisings()
  }, [])

  const getAllAdvertisings = () => {
    getAdvertisingInfo().then((response) => {
      setAdvertisingList(response)
    })
  }

  const onSaveChanges = async (values) => {
    const formData = new FormData()
    formData.append('AdvertisingId', currentEditAdvertising.id)
    formData.append('AdLink', values.AdLink)
    formData.append('AdInfo', values.AdInfo)
    if (fileInput.current.files[0]) {
      formData.append('Image', fileInput.current.files[0])
    }

    const response = await editAdvertisingInfo(formData)
    setStateModal({ msg: response, isOpen: true })
    setIsEditModalOpen(false)
    getAllAdvertisings()
  }

  const ModalInsertBody = () => {
    return (
      <Box sx={advertisingStyles.mainContainer}>
        <Box sx={advertisingStyles.subContainer}>
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
                justifyContent: 'center'
              }}
            >
              <Controller
                control={control}
                name="AdInfo"
                rules={{ required: true }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    fullWidth
                    {...field}
                    inputRef={ref}
                    error={!!errors.FeatureDescription}
                    label="Información"
                  />
                )}
              />
              <Controller
                control={control}
                name="AdLink"
                rules={{ required: true }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    fullWidth
                    {...field}
                    inputRef={ref}
                    error={!!errors.FeatureDescription}
                    label="Link"
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
  const onAdd = (values) => {
    if (fileInput.current.files[0]) {
      const formData = new FormData()
      formData.append('AdLink', values.AdLink)
      formData.append('AdInfo', values.AdInfo)
      formData.append('Image', fileInput.current.files[0])
      addAdvertising(formData).then((response) => {
        setStateModal({ msg: response, isOpen: true })
        getAllAdvertisings()
      })
      setIsInsertModalOpen(false)
    } else {
      setStateModal({ msg: 'Debe ingresar una imagen primero', isOpen: true })
    }
  }

  const setEditValue = (featureId) => {
    setIsEditModalOpen(true)
    setCurrentEditAdvertising(
      advertisingList.filter((f) => {
        return f.id === featureId
      })[0]
    )
  }

  const onConfirmDelete = async (featureId) => {
    setIsConfirmModalOpen(true)
    setCurrentDeleteAdvertising(featureId)
  }

  const onDelete = async () => {
    const response = await DeleteAdvertising(currentDeleteAdvertising)
    setIsConfirmModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    getAllAdvertisings()
  }
  const ModalEditBody = () => {
    return (
      <>
        <Box sx={advertisingStyles.subContainer}>
          <Box sx={{ mb: '.5rem' }}>
            <h3>Imagen actual</h3>
            <Box
              component="img"
              sx={currentEditAdvertising.adImage}
              alt={'img'}
              width={'250px'}
              src={currentEditAdvertising.img}
            ></Box>
          </Box>
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
                name="AdLink"
                defaultValue={currentEditAdvertising.adLink}
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
                defaultValue={currentEditAdvertising.info}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    error={!!errors.AdInfo}
                    label="Descripción del anuncio"
                  />
                )}
              />
              <Box component="label" sx={{ mt: '0.5rem' }}>
                Subir una nueva imagen
              </Box>
              <TextField
                sx={{ mt: '0.5rem' }}
                inputRef={fileInput}
                type="file"
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
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <Box sx={advertisingStyles.mainContainer}>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración de Publicidad
      </Box>
      {advertisingList
        ? (
        <>
          <AddButton onAdd={() => setIsInsertModalOpen(true)} />
          <CustomizedTable
            action={true}
            onEdit={setEditValue}
            withImage={'img'}
            onDelete={onConfirmDelete}
            columns={columns}
            rows={advertisingList || []}
          />
        </>
          )
        : (
        <LoaderSpinner />
          )}
      <Modal
        isOpen={isInsertModalOpen}
        onClose={() => setIsInsertModalOpen(false)}
        title={'Insertar publicidad'}
        modalBody={<ModalInsertBody />}
      />
      <Modal
        isOpen={stateModal.isOpen}
        onClose={() => setStateModal({ isOpen: false })}
        title={'Mensaje del sistema'}
        modalBody={stateModal.msg}
      />
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title={'¿Está seguro que desea eliminar?'}
        modalBody={<>Se eliminará la publicidad #{currentDeleteAdvertising}</>}
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
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={'Modificar publicidad'}
        modalBody={<ModalEditBody />}
      />
    </Box>
  )
}

export default Advertising
