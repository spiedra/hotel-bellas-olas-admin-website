import React from 'react'

import HomeIcon from '@mui/icons-material/Home'
import EditIcon from '@mui/icons-material/Edit'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import BedroomChildIcon from '@mui/icons-material/BedroomChild'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

export const navbarItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: 'Inicio',
    route: 'home'
  },
  {
    id: 1,
    icon: <EditIcon />,
    label: 'Administración de Paginas',
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
    label: 'Administración de Categoría de Habitaciones',
    route: 'manage-rooms-category'
  },
  {
    id: 4,
    icon: <BedroomChildIcon />,
    label: 'Administración de Habitaciones',
    route: 'manage-rooms'
  },
  {
    id: 5,
    icon: <FactCheckIcon />,
    label: 'Estado del hotel hoy',
    route: 'hotel-status'
  },
  {
    id: 6,
    icon: <EventAvailableIcon />,
    label: 'Disponibilidad de habitaciones',
    route: 'room-availability'
  },

  {
    id: 7,
    icon: <ThunderstormIcon />,
    label: 'Administración de Temporadas',
    route: 'seasons'
  },
  {
    id: 8,
    icon: <LocalOfferIcon />,
    label: 'Administración de ofertas',
    route: 'offers'
  },
  {
    id: 9,
    icon: <AddPhotoAlternateIcon />,
    label: 'Administración de Publicidad',
    route: 'advertising'
  }
]
