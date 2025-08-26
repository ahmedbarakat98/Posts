import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import FeedPage from './pages/FeedPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PostDetailsPage from './pages/PostDetailsPage.jsx';
import Login from './pages/login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './layouts/ProtectedRoute.jsx';
import AuthProtectedRoute from './layouts/AuthProtectedRoute.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import UploadPhoto from './pages/UploadPhoto.jsx';



const router = createBrowserRouter([
  {path: '', element: <MainLayout />, children: [
    {index:true , element: <ProtectedRoute><FeedPage /></ProtectedRoute>},
    {path: 'profile' , element: <ProtectedRoute><ProfilePage /></ProtectedRoute>},
    {path: 'post-details/:id', element: <ProtectedRoute><PostDetailsPage /></ProtectedRoute>},
    {path: '*', element: <ErrorPage />},
  ]},
  {path: '', element: <AuthLayout />, children: [
    {path: 'login', element: <AuthProtectedRoute><Login /></AuthProtectedRoute>},
    {path: 'register', element:<AuthProtectedRoute><Register /></AuthProtectedRoute>},
    {path: 'change-password', element:<AuthProtectedRoute><ChangePassword /></AuthProtectedRoute>},
    {path: 'upload-photo', element:<AuthProtectedRoute><UploadPhoto /></AuthProtectedRoute>},
    {path: '*', element: <Login />},
  ]
  },
])


export default function App() {
  return <>
  <RouterProvider router={router} />
  </>
}
