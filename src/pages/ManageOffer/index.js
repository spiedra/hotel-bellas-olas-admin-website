import React, { useEffect, useState } from 'react'
import { getOffers } from '../../services/Gets/getOffers'
import CustomizedTable from '../../components/Table'
import AddButton from '../../components/AddButton'
import Modal from '../../components/Modal'
import { Box, Grid, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { addOffer } from '../../services/Posts/addOffer'
import { deleteOffer } from '../../services/Deletes/deleteOffer'
import { LoaderSpinner } from '../../components/Loader'
import { editOffer } from '../../services/Puts/editOffer'

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'Nombre', minWidth: 80 },
  { id: 'description', label: 'Descripción', minWidth: 100 },
  { id: 'startDate', label: 'Fecha Inicial', minWidth: 70 },
  { id: 'endDate', label: 'Fecha Final', minWidth: 70 },
  {
    id: 'offerPercent',
    label: 'Porcentaje',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  }
]

const ManageOffer = () => {
  const [offers, setOffers] = useState()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isModalResponseOpen, setIsModalResponseOpen] = useState(false)
  const [response, setResponse] = useState()
  const [currentOffer, setCurrentOffer] = useState({ name: 0, description: '', startDate: '', endDate: '', percent: 0 })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const getAllOffers = () => {
    getOffers().then((response) => {
      setOffers(response)
    })
  }

  useEffect(() => {
    getAllOffers()
  }, [])

  useEffect(() => {
    reset()
  }, [isEditModalOpen, isAddModalOpen])

  const onAdd = (values) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('startDate', values.startDate)
    formData.append('endDate', values.endDate)
    formData.append('OfferPercent', values.percent)

    addOffer(formData).then((response) => {
      setResponse(response)
      setIsAddModalOpen(false)
      setIsModalResponseOpen(true)
      getAllOffers()
    })
  }

  const onEdit = (values) => {
    const formData = new FormData()
    formData.append('OfferId', currentOffer.id)
    formData.append('Name', values.name)
    formData.append('Description', values.description)
    formData.append('StartDate', values.startDate)
    formData.append('EndDate', values.endDate)
    formData.append('OfferPercent', values.percent)

    editOffer(formData).then((response) => {
      setResponse(response)
      setIsEditModalOpen(false)
      setIsModalResponseOpen(true)
      getAllOffers()
    })
  }

  const setEditValue = (currentRowId) => {
    setCurrentOffer(
      offers.find((offer) => {
        return offer.id === currentRowId
      })
    )
    setIsEditModalOpen(true)
  }

  const setDeleteValue = (currentRowId) => {
    setCurrentOffer(
      offers.find((offer) => {
        return offer.id === currentRowId
      })
    )
    setIsDeleteModalOpen(true)
  }

  const onDelete = async () => {
    await deleteOffer(currentOffer.id)
    setIsDeleteModalOpen(false)
    getAllOffers()
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
            name="name"
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
                error={!!errors.name}
                label="Nombre de la oferta"
                deafaultValues=""
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="description"
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
                error={!!errors.description}
                label="Descripción"
                deafaultValues=""
              />
            )}
          />
        </Grid>
        <Grid item>
            <Controller
              control={control}
              name="startDate"
              rules={{ required: true }}
              render={({ field: { ...field } }) => (
                <TextField
                  {...field}
                  type="date"
                  error={!!errors.startDate}
                  label="Fecha Inicial"
                  deafaultValues=""
                  fullWidth
                  variant="standard"
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="endDate"
              rules={{ required: true }}
              render={({ field: { ...field } }) => (
                <TextField
                  {...field}
                  type="date"
                  error={!!errors.endDate}
                  label="Fecha Final"
                  deafaultValues=""
                  fullWidth
                  variant="standard"
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              )}
            />
          </Grid>
        <Grid item>
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
                error={!!errors.offerPercent}
                label="Porcentaje a aplicar"
                deafaultValues=""
              />
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
      {console.log(currentOffer) }
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
            name="name"
            rules={{ required: true }}
            defaultValue={currentOffer.name}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.name}
                label="Nombre de la oferta"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="description"
            defaultValue={currentOffer.description}
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
                error={!!errors.description}
                label="Descripción"
              />
            )}
          />
        </Grid>
        <Grid item>
            <Controller
              control={control}
              name="startDate"
              defaultValue={currentOffer.startDate}
              rules={{ required: true }}
              render={({ field: { ...field } }) => (
                <TextField
                  {...field}
                  type="date"
                  error={!!errors.startDate}
                  fullWidth
                  variant="standard"
                  margin="dense"
                  label="Fecha Inicial"
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="endDate"
              defaultValue={currentOffer.endDate}
              rules={{ required: true }}
              render={({ field: { ...field } }) => (
                <TextField
                  {...field}
                  type="date"
                  error={!!errors.endDate}
                  label="Fecha Final"
                  fullWidth
                  variant="standard"
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              )}
            />
          </Grid>
        <Grid item>
          <Controller
            control={control}
            name="percent"
            defaultValue={currentOffer.offerPercent}
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
                error={!!errors.offerPercent}
                label="Porcentaje a aplicar"
              />
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
        Administración de Ofertas
      </Box>
      {offers
        ? (
        <>
          <AddButton onAdd={() => setIsAddModalOpen(true)} />
          <CustomizedTable
            action={true}
            onEdit={setEditValue}
            onDelete={setDeleteValue}
            columns={columns}
            rows={offers || []}
          />
        </>
          )
        : (
        <LoaderSpinner />
          )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Insertar oferta"
        idForm="add_form"
        content={addModalBody}
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        idForm="edit_form"
        title={'Editar oferta'}
        content={editModalBody}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={'Eliminar oferta'}
        onSubmit={onDelete}
        content="¿Está seguro de eliminar esta oferta?"
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

export default ManageOffer
