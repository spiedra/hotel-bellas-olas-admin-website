import React from 'react'

import HomeIcon from '@mui/icons-material/Home'
import EditIcon from '@mui/icons-material/Edit'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

export const navbarItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: 'Inicio',
    route: '/'
  },
  {
    id: 1,
    icon: <EditIcon />,
    label: 'Modificar Paginas',
    route: 'update-pages'
  },
  {
    id: 2,
    icon: <FormatListNumberedIcon />,
    label: 'Listado de reservaciones',
    route: 'reservation-list'
  },
  {
    id: 3,
    icon: <RoomPreferencesIcon />,
    label: 'Administrar habitaciones',
    route: 'manage-rooms'
  },
  {
    id: 4,
    icon: <FactCheckIcon />,
    label: 'Estado del hotel',
    route: 'hotel-status'
  },
  {
    id: 5,
    icon: <EventAvailableIcon />,
    label: 'Disponibilidad de habitaciones',
    route: 'room-availability'
  },
  {
    id: 6,
    icon: <AddPhotoAlternateIcon />,
    label: 'Publicidad',
    route: 'advertising'
  }
]
