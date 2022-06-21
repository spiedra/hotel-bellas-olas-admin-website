import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../src/styles/theme'

import App from './App'

import Advertising from './pages/Advertising'
import HotelStatus from './pages/HotelStatus'
import NotFound from './pages/NotFound'
import ReservationList from './pages/ReservationList'
import RoomAvailability from './pages/RoomAvailability'
import UpdatePages from './pages/UpdatePages'
import UpdateHome from './pages/UpdateHome'
import Home from './pages/Home'
import ManageSeason from './pages/ManageSeason'
import UpdateFeatures from './pages/UpdateFeatures'
import UpdateAboutUs from './pages/UpdateAboutUs'
import UpdateContactUs from './pages/UpdateContactUs'

import Login from './components/Login'
import AuthState from './components/Authentication/AuthState'
import ProtectedRoutes from './components/Authentication/ProtectedRoutes'
import ManageRooms from './pages/ManageRooms'
import ManageGallery from './pages/ManageGallery'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <AuthState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="admin" element={<App />}>
                <Route path="home" element={<Home />} />
                <Route path="update-pages" element={<UpdatePages />} />
                <Route path="reservation-list" element={<ReservationList />} />
                <Route path="manage-rooms" element={<ManageRooms />} />
                <Route path="hotel-status" element={<HotelStatus />} />
                <Route path="update-home" element={<UpdateHome />} />
                <Route path="update-features" element={<UpdateFeatures />} />
                <Route path="update-about-us" element={<UpdateAboutUs />} />
                <Route path="update-contact-us" element={<UpdateContactUs />} />
                <Route path="manage-gallery" element={<ManageGallery />} />
                <Route
                  path="room-availability"
                  element={<RoomAvailability />}
                />
                <Route path="seasons" element={<ManageSeason />} />
                <Route path="advertising" element={<Advertising />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthState>
    </ThemeProvider>
  </React.StrictMode>
)
