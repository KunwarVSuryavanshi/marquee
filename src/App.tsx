import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    location.pathname === '/' ?
      <div className="App">
        <h1>Welcome to TODO app.</h1>
        <div className='navigate nv' onClick={() => navigate('/dashboard')}>Click here to check your dashboard</div>
      </div>
      :
      <Outlet />
  )
}

export default App
