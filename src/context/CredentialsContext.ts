//This context is used to store the mock data for login, which is used in the LoginCredential.tsx file.
import { createContext } from "react";
import data from "../mockData/login"

export const CredentialsContext = createContext(data);  