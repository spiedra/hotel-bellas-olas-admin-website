import { theme } from '../../styles/theme'

const drawerWidth = 300

export const navbarStyles = {
  icons: {
    color: theme.palette.primary.main,
    marginLeft: '20px'
  },
  text: {
    '& span': {
      marginLeft: '-10px',
      fontSize: '16px'
    }
  },
  appBar: {
    width: '100%',
    position: 'fixed'
  },
  toolbarClose: {
    justifyContent: 'flex-end'
  },
  nav: {
    width: { md: drawerWidth },
    flexShrink: { sm: 0 }
  },
  iconButton: {
    mr: 2,
    display: { md: 'none' }
  }
}
