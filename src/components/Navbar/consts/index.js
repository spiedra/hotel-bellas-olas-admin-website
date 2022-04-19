import React from 'react'

import PeopleIcon from '@mui/icons-material/People'
import PublicIcon from '@mui/icons-material/Public'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import CellTowerIcon from '@mui/icons-material/CellTower'
import SchoolIcon from '@mui/icons-material/School'

export const navbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: 'Estilo de aprendizaje #1',
    route: 'learning-style'
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    label: 'Estilo de aprendizaje #2',
    route: 'learning-style'
  },
  {
    id: 2,
    icon: <SchoolIcon />,
    label: 'Recinto de origen',
    route: 'student-home-campus'
  },
  {
    id: 3,
    icon: <PublicIcon />,
    label: 'Genero de estudiante',
    route: 'student-gender'
  },
  {
    id: 4,
    icon: <LightbulbIcon />,
    label: 'Tipo de profesor',
    route: 'teacher-type'
  },
  {
    id: 5,
    icon: <CellTowerIcon />,
    label: 'Clasificación de redes',
    route: 'network-classification'
  }
]
