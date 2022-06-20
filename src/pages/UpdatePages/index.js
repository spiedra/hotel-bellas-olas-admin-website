import React from 'react'

import { useNavigate } from 'react-router'

import { Box } from '@mui/material'

import updateItems from './const/index'
import UpdateCardItem from '../../components/UpdateCardItem'

const UpdatePages = () => {
  const navigate = useNavigate()

  const onNavigateModule = (route) => {
    navigate(`/admin/${route}`)
  }

  return (
    <>
      <Box
        component="h1"
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: '.8rem' }}
      >
        Administración de Paginas
      </Box>
      {updateItems.map((item) => {
        return (
          <UpdateCardItem
            title={item.title}
            description={item.description}
            onClick={() => onNavigateModule(item.route)}
            key={item.id}
          />
        )
      })}
    </>
  )
}

export default UpdatePages
