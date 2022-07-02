import React, { useEffect, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'

import { Box, TextField, Grid, MenuItem } from '@mui/material'

import Modal from '../../components/Modal'
import CustomizedTable from '../../components/Table'
import AddButton from '../../components/AddButton'

import { deleteRoom } from '../../services/Deletes/deleteRoom'
import { getRooms } from '../../services/Gets/getRooms'
import { getRoomCategoryName } from '../../services/Gets/getRoomCategoryName'
import addRoom from '../../services/Posts/addRoom'
import { editRoom } from '../../services/Puts/editRoom'

import { LoaderSpinner } from '../../components/Loader'

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'roomNumber', label: 'Numero', minWidth: 100 },
  { id: 'roomName', label: 'Nombre Habitación', minWidth: 100 },
  { id: 'roomCategory', label: 'Categoría', minWidth: 100 },
  { id: 'status', label: 'Estado', minWidth: 100 }
]

const ManageRoom = () => {
  const [rooms, setRooms] = useState()
  const [roomCategoryNames, setRoomCategoryNames] = useState()
  const [currentRoom, setCurrentRoom] = useState()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isModalResponseOpen, setIsModalResponseOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const getAllRooms = () => {
    getRooms().then((response) => {
      setRooms(response)
    })
  }

  const onAdd = (values) => {
    const formData = new FormData()
    formData.append('RoomNumber', values.roomNumber)
    formData.append('RoomName', values.roomName)
    formData.append(
      'RoomCategoryId',
      roomCategoryNames.find((item) => {
        return item.roomCategory === values.roomCategory
      }).roomCategoryId
    )

    addRoom(formData).then((response) => {
      setIsAddModalOpen(false)
      setModalMessage(response)
      setIsModalResponseOpen(true)
      getAllRooms()
    })
  }

  const onEdit = (values) => {
    const formData = new FormData()
    formData.append('RoomId', currentRoom.id)
    formData.append('RoomNumber', values.roomNumber)
    formData.append('RoomName', values.roomName)
    formData.append(
      'RoomCategoryId',
      roomCategoryNames.find((item) => {
        return item.roomCategory === values.roomCategory
      }).roomCategoryId
    )

    editRoom(formData).then((response) => {
      setIsEditModalOpen(false)
      setModalMessage(response)
      setIsModalResponseOpen(true)
      getAllRooms()
    })
  }

  const setEditValue = (rateId) => {
    setCurrentRoom(
      rooms.find((rr) => {
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
    getAllRooms()
  }

  useEffect(() => {
    getAllRooms()
  }, [])

  useEffect(() => {
    getRoomCategoryName().then((response) => {
      setRoomCategoryNames(response)
    })
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
            name="roomNumber"
            rules={{ required: true, min: 1 }}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                autoFocus
                margin="dense"
                type="number"
                fullWidth
                variant="standard"
                error={!!errors.roomNumber}
                label="Numero de habitación"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="roomName"
            rules={{ required: true }}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                autoFocus
                margin="dense"
                fullWidth
                variant="standard"
                error={!!errors.roomName}
                label="Nombre de habitación"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="roomCategory"
            rules={{ required: true }}
            defaultValue=""
            render={({ field: { ...field } }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="standard"
                margin="dense"
                error={!!errors.roomCategory}
                label="Categoría"
              >
                {roomCategoryNames.map((item) => {
                  return (
                    <MenuItem
                      key={item.roomCategoryId}
                      value={item.roomCategory}
                    >
                      {item.roomCategory}
                    </MenuItem>
                  )
                })}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )

  const editModalBody = (
    <>
      {currentRoom && (
        <Box
          component="form"
          id="edit_form"
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
                name="roomNumber"
                rules={{ required: true, min: 1 }}
                defaultValue={currentRoom.roomNumber}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    autoFocus
                    margin="dense"
                    type="number"
                    fullWidth
                    variant="standard"
                    error={!!errors.roomNumber}
                    label="Numero de habitación"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="roomName"
                rules={{ required: true }}
                defaultValue={currentRoom.roomName}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    autoFocus
                    margin="dense"
                    fullWidth
                    variant="standard"
                    error={!!errors.roomName}
                    label="Nombre de habitación"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="roomCategory"
                rules={{ required: true }}
                defaultValue={currentRoom.roomCategory}
                render={({ field: { ...field } }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    variant="standard"
                    margin="dense"
                    error={!!errors.roomCategory}
                    label="Categoría"
                  >
                    {roomCategoryNames.map((item) => {
                      return (
                        <MenuItem
                          key={item.roomCategoryId}
                          value={item.roomCategory}
                        >
                          {item.roomCategory}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )

  return (
    <>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración | Habitaciones
      </Box>
      {rooms
        ? (
        <>
          <AddButton onAdd={() => setIsAddModalOpen(true)} />
          <CustomizedTable
            action={true}
            onEdit={setEditValue}
            onDelete={setDeleteValue}
            columns={columns}
            rows={rooms || []}
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
        idForm="edit_form"
        title={'Modificar Habitación'}
        content={editModalBody}
      />
    </>
  )
}

export default ManageRoom
