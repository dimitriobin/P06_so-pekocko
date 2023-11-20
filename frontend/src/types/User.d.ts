export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

export interface AuthenticatedUser {
  user: User;
  token: string;
}
