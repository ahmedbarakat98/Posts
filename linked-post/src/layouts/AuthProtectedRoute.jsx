import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function AuthProtectedRoute({children}) {
  const {isLoggedIn , setIsLoggedIn } = useContext(AuthContext);
  return !isLoggedIn ? children : <Navigate to="/" />
}
