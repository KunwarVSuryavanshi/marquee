import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
type Props = {
  children: string | JSX.Element | JSX.Element[];
}
const ProtectedRoute = ({ children }: Props) => {
  const authContext = useContext(AuthContext);
  console.log('authContext: ', authContext)
  if (authContext?.isAuthenticated) {
    return (
      <div>{children}</div>
    )
  }
  console.log('authContext2: ', authContext)
  return <Navigate to='/login' replace />
}

export default ProtectedRoute