/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { getSeasons } from '../../services/Gets/getSeasons'
import CustomizedTable from '../../components/Table'
import AddButton from '../../components/AddButton'
import Modal from '../../components/Modal'
import { Box, Button, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { addSeason } from '../../services/Posts/addSeason'
import { DeleteSeason } from '../../services/Deletes/deleteSeason'

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
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      type: '',
      PercentApply: 0
    }
  })
  const [seasons, setSeasons] = useState()
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false)
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })
  const [currentEditSeason, setCurrentEditSeason] = useState({ id: -1, type: '', percent: 0 })

  const getAllSeasons = () => {
    getSeasons().then(response => {
      setSeasons(response)
    })
  }

  useEffect(() => {
    getAllSeasons()
  }, [])

  const onAdd = async (values) => {
    const formData = new FormData()
    formData.append('type', values.type)
    formData.append('PercentApply', values.percent)
    const response = await addSeason(formData)
    setIsInsertModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    getAllSeasons()
  }

  const setEditValue = (seasonId) => {
    setCurrentEditSeason(seasons.filter((s) => { return s.id === seasonId })[0])
  }

  const onEdit = () => {

  }

  const onDelete = async (seasonId) => {
    console.log('a borrar: ' + seasonId)
    const response = await DeleteSeason(seasonId)
    setIsInsertModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    getAllSeasons()
  }

  const ModalInsertBody = () => {
    return (
        <>
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
              name="type"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
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
                  error={!!errors.percent}
                  label="Porcentaje a aplicar"
                />
              )}
            />
          </Box>
          <Button
              sx={{ mr: '1rem' }}
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginBottom: '50px' }}
            >
              Aceptar
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => setIsInsertModalOpen(false)}
              style={{ marginBottom: '50px' }}
            >
              Cancelar
            </Button>
            </Box>
        </>
    )
  }
  return (
        <>
            <h1>Administración de temporadas</h1>
            <AddButton onAdd={() => setIsInsertModalOpen(true)}/>
                {seasons
                  ? (
            <CustomizedTable action={true} onEdit={setEditValue} onDelete={onDelete} columns={columns} rows={seasons || []} />
                    )
                  : (
                      ''
                    )}
            <Modal
            isOpen ={isInsertModalOpen}
            onClose={() => setIsInsertModalOpen(false)}
            title={'Insertar temporada'}
            modalBody={<ModalInsertBody/>}
            />
            <Modal
            isOpen ={stateModal.isOpen}
            onClose={() => setStateModal({ isOpen: false })}
            title={'Mensaje del sistema'}
            modalBody={stateModal.msg}
            />
        </>
  )
}

export default ManageSeason
