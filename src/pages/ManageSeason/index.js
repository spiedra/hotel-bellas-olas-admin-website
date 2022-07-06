import React, { useEffect, useState } from 'react'

import { getSeasons } from '../../services/Gets/getSeasons'

import CustomizedTable from '../../components/Table'
import AddButton from '../../components/AddButton'
import Modal from '../../components/Modal'

import { Box, Grid, MenuItem, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import { addSeason } from '../../services/Posts/addSeason'
import { DeleteSeason } from '../../services/Deletes/deleteSeason'
import { LoaderSpinner } from '../../components/Loader'
import { editSeason } from '../../services/Puts/editSeason'

const columns = [
  { id: 'id', label: 'ID', minWidth: 1 },
  { id: 'type', label: 'Tipo', minWidth: 100 },
  {
    id: 'percent',
    label: 'Porcentaje',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'isActive',
    label: 'Estado',
    minWidth: 170,
    align: 'right'
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
    formData.append('IsActive', (values.isActive === 'Activa'))

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
    formData.append('Type', values.type)
    formData.append('PercentApply', values.percent)
    formData.append('IsDeleted', false)
    formData.append('IsActive', (values.isActive === 'Activa'))

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
    const response = await DeleteSeason(currentSeason.id)
    setResponse(response)
    setIsDeleteModalOpen(false)
    setIsModalResponseOpen(true)
    getAllSeasons()
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
            name="type"
            rules={{ required: true }}
            defaultValue=""
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
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="percent"
            defaultValue=""
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
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="isActive"
            rules={{ required: true }}
            defaultValue=""
            render={({ field: { ...field } }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="standard"
                margin="dense"
                error={!!errors.isActive}
                label="Estado"
              >
                <MenuItem value="Activa">Activa</MenuItem>
                <MenuItem value="Desactiva">Desactiva</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )

  const editModalBody = (
    <Box
      component="form"
      id="edit_form"
      onSubmit={handleSubmit(onEdit)}
      autoComplete="off"
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
                variant="standard"
                error={!!errors.type}
                label="Tipo de temporada"
              />
            )}
          />
        </Grid>
        <Grid item>
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
                variant="standard"
                error={!!errors.percent}
                label="Porcentaje a aplicar"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="isActive"
            rules={{ required: true }}
            defaultValue={currentSeason.isActive}
            render={({ field: { ...field } }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="standard"
                margin="dense"
                error={!!errors.isActive}
                label="Estado"
              >
                <MenuItem value="Activa">Activa</MenuItem>
                <MenuItem value="Desactiva">Desactiva</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )

  return (
    <Box>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración | Temporadas
      </Box>
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
