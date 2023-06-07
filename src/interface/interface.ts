export interface ICredential {
  userName: string;
  password: string;
}

export interface ICredentialsContext {
  credentials: ICredential[];
}