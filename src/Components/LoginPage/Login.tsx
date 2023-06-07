import { useContext, useState } from "react";
import { CredentialsContext } from "../../context/CredentialsContext";
import { ICredential } from "../../interface/interface";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const credentials = useContext<Array<ICredential>>(CredentialsContext);
  const { isAuthenticated, setAuthInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter a username and password');
      return;
    }
    if (credentials.find((cred) => cred.userName === username && cred.password === password)) {
      console.log('credentials: ', credentials, isAuthenticated, setAuthInfo)
      setAuthInfo(true);
      navigate('/dashboard');
    }
  }

  const handleChange = (req: string, event: React.ChangeEvent<HTMLInputElement>) => {
    switch (req) {
      case 'username':
        setUsername(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        console.log('default: ', event.target.value);
        break;
    }
  };
  return (
    <div className="login_root">
      <div>Login to your account</div>
      <div className="form">
        <div className="username">
          <label>Username: </label>
          <input type="text" placeholder="Username" onChange={(e) => handleChange('username', e)} />
        </div>
        <div className="password">
          <label>Password: </label>
          <input type="password" placeholder="Password" onChange={(e) => handleChange('password', e)} />
        </div>
        <div className="login" onClick={handleLogin}>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;