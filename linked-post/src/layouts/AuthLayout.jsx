import Navbar from '../components/Navbar';
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return <>
  <Navbar />

  <div className="flex justify-center items-center min-h-screen p-10 bg-yellow-600">
    <Outlet />
  </div>

  
  
  </>
}
