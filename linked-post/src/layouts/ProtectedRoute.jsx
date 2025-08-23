import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function ProtectedRoute({children}) {
  const {isLoggedIn , setIsLoggedIn } = useContext(AuthContext);
  

  return isLoggedIn ? children : <Navigate to="/login" />
  
}
