import React, { useEffect, useState } from 'react'
import { getSeasons } from '../../services/Gets/getSeasons'
import CustomizedTable from '../../components/Table'
import AddButton from '../../components/AddButton'
import Modal from '../../components/Modal'
import { Box, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { addSeason } from '../../services/Posts/addSeason'
import { DeleteSeason } from '../../services/Deletes/deleteSeason'
import { LoaderSpinner } from '../../components/Loader'
import { editSeason } from '../../services/Puts/editSeason'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'type', label: 'Tipo', minWidth: 100 },
  {
    id: 'percent',
    label: 'Porcentaje',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  }
]

const ManageSeason = () => {
  const [seasons, setSeasons] = useState()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isModalResponseOpen, setIsModalResponseOpen] = useState(false)
  const [response, setResponse] = useState()
  const [currentSeason, setCurrentSeason] = useState({ type: '', percent: 0 })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const getAllSeasons = () => {
    getSeasons().then((response) => {
      setSeasons(response)
    })
  }

  useEffect(() => {
    getAllSeasons()
  }, [])

  useEffect(() => {
    reset()
  }, [isEditModalOpen, isAddModalOpen])

  const onAdd = (values) => {
    const formData = new FormData()
    formData.append('type', values.type)
    formData.append('PercentApply', values.percent)

    addSeason(formData).then((response) => {
      setResponse(response)
      setIsAddModalOpen(false)
      setIsModalResponseOpen(true)
      getAllSeasons()
    })
  }

  const onEdit = (values) => {
    const formData = new FormData()
    formData.append('SeasonId', currentSeason.id)
    formData.append('Type', values.type || currentSeason.type)
    formData.append('PercentApply', values.percent || currentSeason.percent)

    editSeason(formData).then((response) => {
      setResponse(response)
      setIsEditModalOpen(false)
      setIsModalResponseOpen(true)
      getAllSeasons()
    })
  }

  const setEditValue = (currentRowId) => {
    setCurrentSeason(
      seasons.find((season) => {
        return season.id === currentRowId
      })
    )
    setIsEditModalOpen(true)
  }

  const setDeleteValue = (currentRowId) => {
    setCurrentSeason(
      seasons.find((season) => {
        return season.id === currentRowId
      })
    )
    setIsDeleteModalOpen(true)
  }

  const onDelete = async () => {
    await DeleteSeason(currentSeason.id)
    setIsDeleteModalOpen(false)
    getAllSeasons()
  }

  const addModalBody = (
    <Box
      component="form"
      id="add_form"
      sx={{
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
          name="type"
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
              error={!!errors.type}
              label="Tipo de temporada"
            />
          )}
        />
        <Controller
          control={control}
          name="percent"
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              autoFocus
              margin="dense"
              type="number"
              fullWidth
              variant="standard"
              error={!!errors.percent}
              label="Porcentaje a aplicar"
            />
          )}
        />
      </Box>
    </Box>
  )

  const editModalBody = (
    <Box
      component="form"
      id="edit_form"
      sx={{
        '& .MuiTextField-root': {
          width: '100%',
          my: '.5rem'
        }
      }}
      onSubmit={handleSubmit(onEdit)}
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
          name="type"
          rules={{ required: true, min: 1 }}
          defaultValue={currentSeason.type}
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              autoFocus
              margin="dense"
              type="text"
              fullWidth
              defaultValue={currentSeason.type}
              variant="standard"
              error={!!errors.type}
              label="Tipo de temporada"
            />
          )}
        />
        <Controller
          control={control}
          name="percent"
          rules={{ required: true, min: 1 }}
          defaultValue={currentSeason.percent}
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              autoFocus
              margin="dense"
              type="number"
              fullWidth
              defaultValue={currentSeason.percent}
              variant="standard"
              error={!!errors.percent}
              label="Porcentaje a aplicar"
            />
          )}
        />
      </Box>
    </Box>
  )

  return (
    <Box sx={{ mt: '3rem', ml: '1.5rem' }}>
      <h1>Administración de temporadas</h1>
      {seasons
        ? (
        <>
          <AddButton onAdd={() => setIsAddModalOpen(true)} />
          <CustomizedTable
            action={true}
            onEdit={setEditValue}
            onDelete={setDeleteValue}
            columns={columns}
            rows={seasons || []}
          />
        </>
          )
        : (
        <LoaderSpinner />
          )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Insertar Temporada"
        idForm="add_form"
        content={addModalBody}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        idForm="edit_form"
        title={'Editar Temporada'}
        content={editModalBody}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={'Eliminar Temporada'}
        onSubmit={onDelete}
        content="¿Está seguro de eliminar esta temporada?"
      />

      <Modal
        isOpen={isModalResponseOpen}
        onClose={() => setIsModalResponseOpen(false)}
        title={'Mensaje del sistema'}
        onSubmit={() => setIsModalResponseOpen(false)}
        content={response}
      />
    </Box>
  )
}

export default ManageSeason
