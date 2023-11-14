import { AxiosResponse } from 'axios';
import { serverInstance } from '../http-common';
import { LoginPayload, RegisterPayload } from '../types/api/Auth';
import { User } from '../types/User';

const register = async (payload: RegisterPayload): Promise<AxiosResponse<User>> => {
  const response = await serverInstance.post('auth/signup', payload);
  return await response.data();
};

const login = async (payload: LoginPayload): Promise<User | undefined> => {
  const response = await serverInstance.post('auth/login', payload);
  const user = await response.data;
  if (user.token) {
    localStorage.setItem('user', JSON.stringify(user));
    return Promise.resolve(user);
  } else {
    return Promise.reject(undefined);
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = (): User => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default authService;
