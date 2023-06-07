import { Outlet } from 'react-router-dom';
import './App.css'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log('isAuthenticated: ', isAuthenticated);
  return (
    <Outlet />
  )
}

export default App
