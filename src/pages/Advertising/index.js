import React, { useState } from 'react'

import { Box, Button, Grid, TextField } from '@mui/material'

import { advertisingStyles } from './styles'

const Advertising = () => {
  const [inputs, setInputs] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('submint')
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  return (
    <Box sx={advertisingStyles.mainContainer}>
      <h1>Publicidad</h1>
      <Box sx={advertisingStyles.subContainer}>
        <div>
          <h3>Imagen actual</h3>
          <Box
            component="img"
            sx={advertisingStyles.adImage}
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jtzLV8nbTiaPVkbonKgPJAHaDk%26pid%3DApi&f=1"
          ></Box>
        </div>
        <Box>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {
                my: 1,
                width: { xs: '25ch', sm: '30ch' }
              }
            }}
            onSubmit={handleSubmit}
          >
            <Grid
              container
              justifyContent="center"
              spacing={{ xs: 0.5, sm: 0.5, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item>
                <TextField
                  sx={advertisingStyles.select}
                  name=""
                  label="link"
                  value="{inputs[item.value]}"
                  onChange={handleChange}
                ></TextField>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={advertisingStyles.button}
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Advertising
