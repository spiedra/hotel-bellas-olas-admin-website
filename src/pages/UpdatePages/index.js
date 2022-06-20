// import { Box } from '@mui/material'
import React from 'react'
import updateItems from './const/index'
import UpdateCardItem from '../../components/UpdateCardItem'
import { useNavigate } from 'react-router'

const UpdatePages = () => {
  const navigate = useNavigate()

  const onNavigateModule = (route) => {
    navigate(`/admin/${route}`)
  }

  return (
  <>
   {updateItems.map(item => {
     return (
     <UpdateCardItem
     title={item.title}
     description={item.description}
     onClick={() => onNavigateModule(item.route)}
     key={item.id}/>
     )
   })}
  </>
  )
}

export default UpdatePages
