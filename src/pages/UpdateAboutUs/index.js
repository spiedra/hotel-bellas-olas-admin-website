/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { getAboutUsInfo } from '../../services/Gets/getAboutUsInfo'
import { Button, TextareaAutosize, Box, TextField, Grid } from '@mui/material'
import updateStyles from './styles'
import { Controller, useForm } from 'react-hook-form'
import CustomizedTable from '../../components/Table'
import { LoaderSpinner } from '../../components/Loader'
import AddButton from '../../components/AddButton'
import Modal from '../../components/Modal'
import { addGalleryImage } from '../../services/Posts/addGalleryImage'
import { EditAboutUsText } from '../../services/Puts/EditAboutUsText'
import { DeleteImageGallery } from '../../services/Deletes/deleteImageGallery'
import { EditGalleryImage } from '../../services/Puts/editGalleryImage'

import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'img', label: 'Imagen', maxWidth: 400 }
]
const UpdateAboutUs = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState({
    aboutUsText: '',
    imgList: []
  })
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false)
  const [currentEditImage, setCurrentEditFeature] = useState({
    id: '',
    image: ''
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentDeleteFeature, setCurrentDeleteFeature] = useState()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [stateModal, setStateModal] = useState({ msg: '', isOpen: false })
  const fileInput = useRef()

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      AboutUsText: '',
      Image: ''
    }
  })
  const fetchAboutUsInfo = () => {
    getAboutUsInfo().then((response) => {
      setAboutUsInfo({
        aboutUsText: response.aboutUsText,
        imgList: response.imgList
      })
    })
  }
  useEffect(() => {
    fetchAboutUsInfo()
  }, [])

  const onSaveAboutUsText = async (values) => {
    const formData = new FormData()
    formData.append('AboutUsText', values.AboutUsText)
    const response = await EditAboutUsText(formData)
    setStateModal({ msg: response, isOpen: true })
  }

  const onConfirmDelete = (imageId) => {
    setCurrentDeleteFeature(imageId)
    setIsConfirmModalOpen(true)
  }

  const setEditValue = (imageId) => {
    setIsEditModalOpen(true)
    setCurrentEditFeature(
      aboutUsInfo.imgList.filter((img) => {
        return img.id === imageId
      })[0]
    )
  }

  const onSaveChangeImage = async () => {
    if (fileInput.current.files[0]) {
      const formData = new FormData()
      formData.append('ImageId', currentEditImage.id)
      formData.append('Image', fileInput.current.files[0])
      const response = await EditGalleryImage(formData)
      setStateModal({ msg: response, isOpen: true })
      setIsEditModalOpen(false)
    } else {
      setStateModal({
        msg: 'Debe seleccionar una imagen primero',
        isOpen: true
      })
    }
    fetchAboutUsInfo()
  }

  const onAdd = () => {
    if (!fileInput.current.files[0]) {
      setStateModal({
        msg: 'Debe seleccionar una imagen primero',
        isOpen: true
      })
    } else {
      const formData = new FormData()
      formData.append('Image', fileInput.current.files[0])
      addGalleryImage(formData).then((response) => {
        setStateModal({ msg: response, isOpen: true })
        fetchAboutUsInfo()
      })
      setIsInsertModalOpen(false)
    }
  }

  const onDelete = async () => {
    const response = await DeleteImageGallery(currentDeleteFeature)
    setIsConfirmModalOpen(false)
    setStateModal({ msg: response, isOpen: true })
    fetchAboutUsInfo()
  }

  const ModalEditBody = () => {
    return (
      <>
        <Box sx={updateStyles.subContainer}>
          <Box sx={{ mb: '.5rem' }}>
            <h3>Imagen actual</h3>
            {currentEditImage
              ? (
              <Box
                component="img"
                style={{ width: '300px' }}
                sx={updateStyles.Image}
                alt={'gallery-img'}
                src={currentEditImage.img}
              ></Box>
                )
              : (
              <LoaderSpinner />
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
            onSubmit={handleSubmit(onSaveChangeImage)}
          >
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%'
                }}
              >
                <h3>Cambiar por otra imagen</h3>
                <TextField
                  inputRef={fileInput}
                  sx={{ maxWidth: { xs: '100%', md: '55%' }, mt: '0.5rem' }}
                  type="file"
                />
              </Box>
            </>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                my: '4rem'
              }}
            >
              <Button
                sx={{ mr: '1rem' }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Guardar cambios
              </Button>
              <Button
                sx={{ mr: '1rem' }}
                type="submit"
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
  const ModalInsertBody = () => {
    return (
      <>
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
          onSubmit={handleSubmit(onAdd)}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box component="label" sx={{ mt: '0.5rem' }}>
              Subir una imagen
            </Box>
            <TextField
              fullWidth
              inputRef={fileInput}
              sx={{ maxWidth: { xs: '100%', md: '55%' }, mt: '0.5rem' }}
              type="file"
            />
          </Box>
          <Button
            sx={{ mr: '1rem' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Guardar
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
      </>
    )
  }
  return (
    <>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración | Pagina de Sobre Nosotros
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: '1rem' }}
        onClick={() => navigate('/admin/manage-gallery')}
      >
        Modificar la Galería <EditIcon sx={{ ml: '.5rem' }} />
      </Button>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            my: 1,
            width: { xs: '37ch', md: '70ch' }
          }
        }}
        autoComplete="off"
        onSubmit={handleSubmit(onSaveAboutUsText)}
      >
        <Grid
          container
          justifyContent="flex-start"
          spacing={{ xs: 0.5, sm: 0.5, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item>
            <Controller
              control={control}
              name="AboutUsText"
              rules={{ required: true, min: 1 }}
              defaultValue={aboutUsInfo.aboutUsText}
              render={({ field: { ref, value, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  autoFocus
                  defaultValue={aboutUsInfo.aboutUsText}
                  margin="dense"
                  type="text"
                  multiline
                  InputLabelProps={{ shrink: true }}
                  row={10}
                  error={!!errors.AboutUsText}
                  fullWidth
                  label="Texto sobre nosotros"
                />
              )}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: '.8rem' }}
        >
          Aceptar
        </Button>
      </Box>
      {/* <Box sx={{}}>
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
          onSubmit={handleSubmit(onSaveAboutUsText)}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <h3>Texto sobre nosotros</h3>
                <TextareaAutosize
                  minRows={10}
                  onChange={(e) => setAboutUsInfo({ ...aboutUsInfo, aboutUsText: e.target.value })}
                  value={aboutUsInfo.aboutUsText}
                />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              my: '2rem'
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
          </Box>
        </Box>
      </Box> */}
      {/* <Box
        sx={{ marginTop: '150px' }}
      >
        <h3>Galería de imágenes</h3>
 <AddButton onAdd={() => setIsInsertModalOpen(true)}/>
      {

            aboutUsInfo.imgList
              ? <CustomizedTable action={true} onEdit={setEditValue} withImage={'img'} onDelete={(onConfirmDelete)} columns={columns} rows={aboutUsInfo.imgList || []} />
              : <LoaderSpinner/>
      }
      <Modal
            isOpen ={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={'Modificar imagen'}
            modalBody={<ModalEditBody/>}
        />
        <Modal
            isOpen ={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            title={'¿Está seguro que desea eliminar?'}
            modalBody={
                <>Se eliminará la imagen #{currentDeleteFeature}</>
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
                isOpen ={isInsertModalOpen}
                onClose={() => setIsInsertModalOpen(false)}
                title={'Agregar imagen a galería'}
                modalBody={<ModalInsertBody/>}
          />
          <Modal
            isOpen ={stateModal.isOpen}
            onClose={() => setStateModal({ isOpen: false })}
            title={'Mensaje del sistema'}
            modalBody={stateModal.msg}
        />
        </Box> */}
      {/* </Box> */}
      <Modal
        isOpen={stateModal.isOpen}
        onClose={() => setStateModal({ isOpen: false })}
        onSubmit={() => setStateModal({ isOpen: false })}
        title={'Mensaje del sistema'}
        content={stateModal.msg}
      />
    </>
  )
}

export default UpdateAboutUs
