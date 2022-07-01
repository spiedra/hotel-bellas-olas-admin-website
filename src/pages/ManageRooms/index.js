import React, { useEffect, useState, useRef } from 'react'

import { useForm, Controller } from 'react-hook-form'

import { Box, TextField, Grid } from '@mui/material'

import Modal from '../../components/Modal'
import CustomizedTable from '../../components/Table'
import AddButton from '../../components/AddButton'

import { deleteRoom } from '../../services/Deletes/deleteRoom'
import { EditRoomRate } from '../../services/Puts/EditRoomRate'
import { GetRoomRates } from '../../services/Gets/getRoomRate'
import { addRoomRate } from '../../services/Posts/addRoomRate'

import { LoaderSpinner } from '../../components/Loader'

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'category', label: 'Categoria', maxWidth: 400 },
  { id: 'description', label: 'Descripción', maxWidth: 400 },
  { id: 'cost', label: 'Costo(₡)', maxWidth: 400 },
  {
    id: 'img',
    label: 'Imagen',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
]

const ManageRooms = () => {
  const [roomRates, setRoomRates] = useState()
  const [currentRoom, setCurrentRoom] = useState()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isModalResponseOpen, setIsModalResponseOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const fileInput = useRef()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const getAllRates = () => {
    GetRoomRates().then((response) => {
      setRoomRates(response)
    })
  }

  const onAdd = (values) => {
    const formData = new FormData()
    formData.append('RoomCategory', values.RoomCategory)
    formData.append('RoomDescription', values.RoomDescription)
    formData.append('RoomCost', values.RoomCost)
    formData.append('RoomCategoryImage', fileInput.current.files[0])

    addRoomRate(formData).then((response) => {
      setIsAddModalOpen(false)
      setModalMessage(response)
      setIsModalResponseOpen(true)
      getAllRates()
    })
  }

  const onEdit = async (values) => {
    const formData = new FormData()
    formData.append('RoomRateId', currentRoom.id)
    formData.append('RoomCategory', values.RoomCategory)
    formData.append('RoomDescription', values.RoomDescription)
    formData.append('RoomCost', values.RoomCost)

    if (fileInput.current.files[0]) {
      formData.append('RoomCategoryImage', fileInput.current.files[0])
    }

    const response = await EditRoomRate(formData)
    setIsEditModalOpen(false)
    setModalMessage(response)
    setIsModalResponseOpen(true)
    getAllRates()
  }

  const setEditValue = (rateId) => {
    setCurrentRoom(
      roomRates.find((rr) => {
        return rr.id === rateId
      })
    )
    setIsEditModalOpen(true)
  }

  const setDeleteValue = async (roomRateId) => {
    setCurrentRoom(roomRateId)
    setIsDeleteModalOpen(true)
  }

  const onDelete = async () => {
    const response = await deleteRoom(currentRoom)
    setIsDeleteModalOpen(false)
    setModalMessage(response)
    setIsModalResponseOpen(true)
    getAllRates()
  }

  useEffect(() => {
    getAllRates()
  }, [])

  useEffect(() => {
    reset()
  }, [isAddModalOpen, isEditModalOpen])

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
            name="RoomCategory"
            rules={{ required: true, min: 1 }}
            defaultValue=''
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.RoomCategory}
                label="Categoría"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="RoomCost"
            rules={{ required: true }}
            defaultValue=''
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                autoFocus
                margin="dense"
                type="number"
                fullWidth
                variant="standard"
                error={!!errors.RoomCost}
                label="Costo"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="RoomDescription"
            rules={{ required: true }}
            defaultValue=''
            render={({ field: { ...field } }) => (
              <TextField
                {...field}
                multiline
                fullWidth
                autoFocus
                variant="standard"
                margin="dense"
                rows={3}
                error={!!errors.RoomDescription}
                type="text"
                label="Descripción"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="image"
            rules={{ required: true }}
            defaultValue=''
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={fileInput}
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="dense"
                type="file"
                fullWidth
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
      {currentRoom
        ? (
        <>
          <Box>
            <h3>Imagen actual</h3>
            <Box
              component="img"
              sx={{ maxWidth: { xs: 175, md: 400 } }}
              alt={'room-img'}
              src={currentRoom.img}
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
                  name="RoomCategory"
                  rules={{ required: true, min: 1 }}
                  defaultValue={currentRoom.category}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      autoFocus
                      margin="dense"
                      type="text"
                      fullWidth
                      error={!!errors.RoomCategory}
                      label="Categoría"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="RoomCost"
                  rules={{ required: true, min: 1 }}
                  defaultValue={currentRoom.cost}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      autoFocus
                      margin="dense"
                      type="number"
                      fullWidth
                      error={!!errors.RoomCost}
                      label="Costo"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="RoomDescription"
                  rules={{ required: true, min: 1 }}
                  defaultValue={currentRoom.description}
                  render={({ field: { ...field } }) => (
                    <TextField
                      {...field}
                      multiline
                      fullWidth
                      autoFocus
                      margin="dense"
                      rows={4}
                      error={!!errors.RoomDescription}
                      type="text"
                      label="Descripción"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="image"
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={fileInput}
                      InputLabelProps={{ shrink: true }}
                      autoFocus
                      margin="dense"
                      type="file"
                      fullWidth
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
        Administración de Habitaciones
      </Box>
      {roomRates
        ? (
        <>
          <AddButton onAdd={() => setIsAddModalOpen(true)} />
          <CustomizedTable
            action={true}
            onEdit={setEditValue}
            withImage={'img'}
            onDelete={setDeleteValue}
            columns={columns}
            rows={roomRates || []}
          />
        </>
          )
        : (
        <LoaderSpinner />
          )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={'Insertar Habitación'}
        idForm="add_form"
        content={addModalBody}
      />
      <Modal
        isOpen={isModalResponseOpen}
        onClose={() => setIsModalResponseOpen(false)}
        onSubmit={() => setIsModalResponseOpen(false)}
        title={'Mensaje del sistema'}
        content={modalMessage}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={'Eliminar Habitación'}
        onSubmit={onDelete}
        content="¿Está seguro de eliminar esta habitación?"
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        maxWidth="lg"
        idForm="edit_form"
        title={'Modificar Habitación'}
        content={editModalBody}
      />
    </>
  )
}

export default ManageRooms
