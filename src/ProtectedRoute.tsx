import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
type Props = {
  children: string | JSX.Element | JSX.Element[];
}
const ProtectedRoute = ({ children }: Props) => {
  const authContext = useContext(AuthContext);
  if (authContext?.isAuthenticated || sessionStorage.getItem('authDetails')) {
    return (
      <div>{children}</div>
    )
  }
  return <Navigate to='/login' replace />
}

export default ProtectedRoute