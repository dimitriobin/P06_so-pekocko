import { AxiosError } from 'axios';
import { serverInstance } from '../http-common';
import { CreateSaucePayload, Sauce } from '../types/Sauce';
import { authHeader } from './auth-header';

export const getAll = async (): Promise<Sauce[]> => {
  const response = await serverInstance.get<Sauce[]>('/sauces', { headers: authHeader() });
  return response.data;
};

export const createOne = async (payload: CreateSaucePayload): Promise<Sauce> => {
  const response = await serverInstance.post<Sauce>('/sauces', payload, {
    headers: authHeader()
  });
  return response.data;
};

export const getOne = async (id: string | number) => {
  const response = await serverInstance.get<Sauce>(`/sauces/${id}`, {
    headers: authHeader()
  });
  return await response.data;
};

const updateOne = async (id: string | number, data: Sauce) => {
  try {
    const response = await serverInstance.put(`/sauces/${id}`, data, {
      headers: authHeader()
    });
    return await response.data();
  } catch (error) {
    if (
      (error as AxiosError).response?.status === 401 &&
      (error as AxiosError).response?.data === 'Please login'
    ) {
      //   AuthService.logout();
    } else {
      console.error(error);
    }
  }
};

const deleteOne = async (id: string | number) => {
  try {
    const response = await serverInstance.delete(`/sauces/${id}`, {
      headers: authHeader()
    });
    return await response.data();
  } catch (error) {
    if (
      (error as AxiosError).response?.status === 401 &&
      (error as AxiosError).response?.data === 'Please login'
    ) {
      //   AuthService.logout();
    } else {
      console.error(error);
    }
  }
};

const likeOne = async (id: string | number, data: unknown) => {
  try {
    const response = await serverInstance.post(`/sauces/${id}/like`, data, {
      headers: authHeader()
    });
    return await response.data();
  } catch (error) {
    if (
      (error as AxiosError).response?.status === 401 &&
      (error as AxiosError).response?.data === 'Please login'
    ) {
      //   AuthService.logout();
    } else {
      console.error(error);
    }
  }
};

const sauceService = {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  likeOne
};

export default sauceService;
