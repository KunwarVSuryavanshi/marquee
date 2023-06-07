import { Outlet } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './context/AuthContext'

function App() {
  // const authContext = useContext(AuthContext);

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default App
