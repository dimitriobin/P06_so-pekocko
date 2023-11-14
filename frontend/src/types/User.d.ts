export interface User {
  user: {
    id: number;
    email: string;
    name: string;
    password: string;
  };
  token: string;
}
