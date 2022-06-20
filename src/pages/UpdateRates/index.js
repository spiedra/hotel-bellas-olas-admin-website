import React, { useEffect, useState, useRef } from 'react'

import { useForm, Controller } from 'react-hook-form'

import { Button, Box, TextareaAutosize, TextField } from '@mui/material'

import Modal from '../../components/Modal'
import CustomizedTable from '../../components/Table'
import AddButton from '../../components/AddButton'

import { deleteFeature } from '../../services/Deletes/deleteFeature'
import { EditRoomRate } from '../../services/Puts/EditRoomRate'
import { GetRoomRates } from '../../services/Gets/getRoomRate'
import { addRoomRate } from '../../services/Posts/addRoomRate'

import { LoaderSpinner } from '../../components/Loader'

import updateStyles from './styles'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'category', label: 'Categoria', maxWidth: 400 },
  { id: 'description', label: 'Descripción', maxWidth: 400 },
  { id: 'cost', label: 'Costo(₡)', maxWidth: 400 },
  {
    id: 'img',
    label: 'Imagen',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
]

const UpdateRates = () => {
  const [roomRates, setRoomRates] = useState()
  const [currentEditRate, setCurrentEditRate] = useState({ id: '', rate: '' })
  const [currentDeleteRate, setCurrentDeleteRate] = useState()
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const fileInput = useRef()

  const getAllRates = () => {
    GetRoomRates().then((response) => {
      setRoomRates(response)
    })
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onAdd = (values) => {
    if (fileInput.current.files[0]) {
      const formData = new FormData()
      formData.append('RoomCategory', values.RoomCategory)
      formData.append('RoomDescription', values.RoomDescription)
      formData.append('RoomCost', values.RoomCost)
      formData.append('RoomCategoryImage', fileInput.current.files[0])
      addRoomRate(formData).then((response) => {
        setStateModal({ msg: response, isOpen: true })
        getAllRates()
      })
      setIsInsertModalOpen(false)
    } else {
      setStateModal({ msg: 'Debe ingresar una imagen primero', isOpen: true })
    }
  }

  const setEditValue = (rateId) => {
    setCurrentEditRate(
      roomRates.find((rr) => {
        return rr.id === rateId
      })
    )
    setIsEditModalOpen(true)
  }

  const onSaveChanges = async (values) => {
    const formData = new FormData()
    formData.append('RoomRateId', currentEditRate.id)
    formData.append('RoomCategory', values.RoomCategory)
    formData.append('RoomDescription', values.RoomDescription)
    formData.append('RoomCost', values.RoomCost)
    if (fileInput.current.files[0]) {
      formData.append('RoomCategoryImage', fileInput.current.files[0])
    }
    const response = await EditRoomRate(formData)
    setStateModal({ isOpen: true, msg: response })
    setIsEditModalOpen(false)
    getAllRates()
  }

  const onConfirmDelete = async (roomRateId) => {
    setIsConfirmModalOpen(true)
    setCurrentDeleteRate(roomRateId)
  }

  const onDelete = async () => {
    const response = await deleteFeature(currentDeleteRate)
    setIsConfirmModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    getAllRates()
  }

  useEffect(() => {
    getAllRates()
  }, [])

  useEffect(() => {
    reset()
  }, [isInsertModalOpen, isEditModalOpen])

  const ModalInsertBody = () => {
    return (
      <Box sx={updateStyles.mainContainer}>
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
                justifyContent: 'center'
              }}
            >
              <Controller
                control={control}
                name="RoomCategory"
                rules={{ required: true }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    fullWidth
                    {...field}
                    inputRef={ref}
                    error={!!errors.RoomCategory}
                    label="Categoria"
                  />
                )}
              />
              <Box component="label" sx={{ mt: '0.5rem' }}>
                Descripción
              </Box>
              <Controller
                control={control}
                name="RoomDescription"
                rules={{ required: true }}
                render={({ field: { ref, ...field } }) => (
                  <TextareaAutosize
                    {...field}
                    minRows={4}
                    inputRef={ref}
                    type="text"
                    fullWidth
                    error={!!errors.RoomDescription}
                  />
                )}
              />
              <Controller
                control={control}
                name="RoomCost"
                rules={{ required: true, min: 1 }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    fullWidth
                    type={'number'}
                    {...field}
                    inputRef={ref}
                    error={!!errors.RoomCost}
                    label="Costo"
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
            {currentEditRate
              ? (
              <Box
                component="img"
                style={{ width: '300px' }}
                sx={updateStyles.Image}
                alt={'facilidad-img'}
                src={currentEditRate.img}
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
                justifyContent: 'center'
              }}
            >
              <Controller
                control={control}
                name="RoomCategory"
                rules={{ required: true }}
                defaultValue={currentEditRate.category}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    defaultValue={currentEditRate.category}
                    variant="standard"
                    error={!!errors.RoomCategory}
                    label="Categoria"
                  />
                )}
              />
              <Box component="label" sx={{ mt: '0.5rem' }}>
                Descripción
              </Box>
              <Controller
                control={control}
                name="RoomDescription"
                rules={{ required: true }}
                defaultValue={currentEditRate.description}
                render={({ field: { ref, ...field } }) => (
                  <TextareaAutosize
                    {...field}
                    inputRef={ref}
                    autoFocus
                    margin="dense"
                    type="text"
                    fullWidth
                    defaultValue={currentEditRate.description}
                    variant="standard"
                    error={!!errors.RoomDescription}
                    label="Descripción"
                  />
                )}
              />
              <Controller
                control={control}
                name="RoomCost"
                rules={{ required: true, min: 1 }}
                defaultValue={currentEditRate.cost}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    autoFocus
                    margin="dense"
                    type="number"
                    fullWidth
                    variant="standard"
                    defaultValue={currentEditRate.cost}
                    error={!!errors.RoomCost}
                    label="Costo"
                  />
                )}
              />
              <>
                <Box component="label" sx={{ mt: '0.5rem' }}>
                  Cambiar imagen
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
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración de Habitaciones
      </Box>
      {roomRates
        ? (
        <>
          <AddButton onAdd={() => setIsInsertModalOpen(true)} />
          <CustomizedTable
            action={true}
            onEdit={setEditValue}
            withImage={'img'}
            onDelete={onConfirmDelete}
            columns={columns}
            rows={roomRates || []}
          />
        </>
          )
        : (
        <LoaderSpinner />
          )}
      <Modal
        isOpen={isInsertModalOpen}
        onClose={() => setIsInsertModalOpen(false)}
        title={'Insertar tarifa'}
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
        modalBody={<>Se eliminará la tarifa #{currentDeleteRate}</>}
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
        title={'Modificar tarifa'}
        modalBody={<ModalEditBody />}
      />
    </>
  )
}

export default UpdateRates
