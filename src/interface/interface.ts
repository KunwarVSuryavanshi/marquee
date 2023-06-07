export interface ICredential {
  userName: string;
  password: string;
  token: string;
}

export interface ICredentialsContext {
  credentials: ICredential[];
}