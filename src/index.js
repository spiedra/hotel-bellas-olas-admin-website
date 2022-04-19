import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App'
import Advertising from './pages/Advertising'
import Home from './pages/Home'
import HotelStatus from './pages/HotelStatus'
import ManageRooms from './pages/ManageRooms'
import NotFound from './pages/NotFound'
import ReservationList from './pages/ReservationList'
import RoomAvailability from './pages/RoomAvailability'
import UpdatePages from './pages/UpdatePages'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="update-pages" element={<UpdatePages />} />
          <Route path="reservation-list" element={<ReservationList />} />
          <Route path="manage-rooms" element={<ManageRooms />} />
          <Route path="hotel-status" element={<HotelStatus />} />
          <Route path="room-availability" element={<RoomAvailability />} />
          <Route path="advertising" element={<Advertising />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
