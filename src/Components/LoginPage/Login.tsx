import { useContext, useState } from "react";
import { CredentialsContext } from "../../context/CredentialsContext";
import { ICredential } from "../../interface/interface";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TextField } from "@mui/material";
import './Login.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const credentials = useContext<Array<ICredential>>(CredentialsContext);
  const { setAuthInfo } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    console.log(event)
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();

  // All these logic could be replaced if I had to use supabase/ firebase /MSAL kinda cloud service, but for now I am using this
  const handleLogin = () => {
    if (!username || !password) {
      setMessage('Please enter username and password')
      setOpen(true);
      return;
    }
    const mockApiResponse = credentials.filter((cred) => cred.userName === username && cred.password === password);
    if (mockApiResponse.length > 0) {
      console.log(mockApiResponse)
      setMessage('Login Successful')
      setOpen(true)
      setAuthInfo(true);
      navigate('/dashboard');
      localStorage.setItem('authDetails', JSON.stringify({ userName: mockApiResponse?.[0].userName, password: mockApiResponse?.[0]?.password, token: mockApiResponse?.[0]?.token }));
    } else {
      setMessage('Username and password did not match')
      setOpen(true);
    }
  }

  const handleChange = (req: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (req) {
      case 'username':
        setUsername(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <div className="wrapper_log">
      <div id="login" className="login_root">
        <div className="heading">Login to your account</div>
        <div className="form">
          <div className="username">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              type="text"
              placeholder="Username"
              onChange={(e) => handleChange('username', e)}
            />
          </div>
          <div className="password">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange('password', e)}
            />
          </div>
          <div className="login">
            <button className="btn" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};

export default Login;