import React, { useEffect, useState, useRef } from 'react'

import CustomizedTable from '../../components/Table'
import Modal from '../../components/Modal'
import AddButton from '../../components/AddButton'
import { LoaderSpinner } from '../../components/Loader'

import { useForm, Controller } from 'react-hook-form'

import { Box, TextField, Grid } from '@mui/material'

import { getAdvertisingInfo } from '../../services/Gets/getAdvertisingInfo'
import { editAdvertisingInfo } from '../../services/Puts/editAdvertisingInfo'
import { addAdvertising } from '../../services/Posts/addAdvertising'
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
  const [currentAdvertising, setCurrentAdvertising] = useState()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const fileInput = useRef()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    reset()
  }, [isAddModalOpen, isEditModalOpen])

  useEffect(() => {
    getAllAdvertising()
  }, [])

  const getAllAdvertising = () => {
    getAdvertisingInfo().then((response) => {
      setAdvertisingList(response)
    })
  }

  const onAdd = (values) => {
    const formData = new FormData()
    formData.append('AdLink', values.AdLink)
    formData.append('AdInfo', values.AdInfo)
    formData.append('Image', fileInput.current.files[0])

    addAdvertising(formData).then((response) => {
      setIsAddModalOpen(false)
      setStateModal({ msg: response, isOpen: true })
      getAllAdvertising()
    })
  }

  const onEdit = async (values) => {
    const formData = new FormData()
    formData.append('AdvertisingId', currentAdvertising.id)
    formData.append('AdLink', values.AdLink)
    formData.append('AdInfo', values.AdInfo)

    if (fileInput.current.files[0]) {
      formData.append('Image', fileInput.current.files[0])
    }

    const response = await editAdvertisingInfo(formData)
    setStateModal({ msg: response, isOpen: true })
    setIsEditModalOpen(false)
    getAllAdvertising()
  }

  const onDelete = async () => {
    const response = await DeleteAdvertising(currentAdvertising)
    setIsDeleteModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    getAllAdvertising()
  }

  const setEditValue = (featureId) => {
    setCurrentAdvertising(
      advertisingList.find((f) => {
        return f.id === featureId
      })
    )
    setIsEditModalOpen(true)
  }

  const setDeleteValue = async (featureId) => {
    setCurrentAdvertising(featureId)
    setIsDeleteModalOpen(true)
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
            name="AdLink"
            rules={{ required: true }}
            render={({ field: { ...field } }) => (
              <TextField
                {...field}
                type="text"
                autoFocus
                margin="dense"
                fullWidth
                variant="standard"
                error={!!errors.AdLink}
                label="URL"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="AdInfo"
            rules={{ required: true }}
            render={({ field: { ...field } }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.AdInfo}
                label="Información"
              ></TextField>
            )}
          />
        </Grid>
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
      {currentAdvertising
        ? (
        <>
          <Box>
            <h3>Imagen actual</h3>
            <Box
              component="img"
              sx={{ maxWidth: { xs: 175, md: 400 } }}
              alt={'advertising-img'}
              src={currentAdvertising.img}
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
                  name="AdLink"
                  rules={{ required: true, min: 1 }}
                  defaultValue={currentAdvertising.adLink}
                  render={({ field: { ...field } }) => (
                    <TextField
                      {...field}
                      type="text"
                      error={!!errors.AdLink}
                      margin="dense"
                      fullWidth
                      label="URL"
                      defaultValue={currentAdvertising.adLink}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="AdInfo"
                  rules={{ required: true, min: 1 }}
                  defaultValue={currentAdvertising.info}
                  render={({ field: { ...field } }) => (
                    <TextField
                      {...field}
                      type="text"
                      error={!!errors.AdInfo}
                      margin="dense"
                      fullWidth
                      label="Información"
                      defaultValue={currentAdvertising.info}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="image"
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
      <Box>
        <Box
          component="h1"
          sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
        >
          Administración | Publicidad
        </Box>
        {advertisingList
          ? (
          <>
            <AddButton onAdd={() => setIsAddModalOpen(true)} />
            <CustomizedTable
              action={true}
              onEdit={setEditValue}
              withImage={'img'}
              onDelete={setDeleteValue}
              columns={columns}
              rows={advertisingList || []}
            />
          </>
            )
          : (
          <LoaderSpinner />
            )}
      </Box>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={'Insertar Anuncio'}
        idForm="add_form"
        content={addModalBody}
      />
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={'Modificar Anuncio'}
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
        title={'Eliminar Anuncio'}
        onSubmit={onDelete}
        content="¿Está seguro de eliminar este anuncio?"
      />
    </>
  )
}

export default Advertising
