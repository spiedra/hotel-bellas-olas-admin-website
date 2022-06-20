import React, { Fragment } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const UpdateCardItem = (props) => {
  return (
    <Box
      style={{ marginBottom: '10px', marginTop: '10px' }}
      sx={{ minWidth: 275 }}
    >
      <Card variant="outlined">
        <Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {props.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={props.onClick} size="small">
              Seleccionar
            </Button>
          </CardActions>
        </Fragment>
      </Card>
    </Box>
  )
}

export default UpdateCardItem
