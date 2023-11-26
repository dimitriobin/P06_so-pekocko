import { serverInstance } from '../http-common';
import { CreateSaucePayload, Sauce } from '../types/Sauce';
import { authHeader } from './auth-header';

export const getAll = async (): Promise<Sauce[]> => {
  const response = await serverInstance.get<Sauce[]>('/sauces', { headers: authHeader() });
  return response.data;
};

export const createOne = async (payload: CreateSaucePayload): Promise<Sauce> => {
  const response = await serverInstance.post<Sauce>('/sauces', payload, {
    headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getOne = async (id: string | number) => {
  const response = await serverInstance.get<Sauce>(`/sauces/${id}`, {
    headers: authHeader()
  });
  return await response.data;
};

const updateOne = async (id: string | number, data: FormData): Promise<Sauce> => {
  const response = await serverInstance.patch(`/sauces/${id}`, data, {
    headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' }
  });
  return await response.data;
};

const deleteOne = async (id: string | number) => {
  const response = await serverInstance.delete(`/sauces/${id}`, {
    headers: authHeader()
  });
  return await response.data;
};

const likeOne = async ({
  sauceId,
  userId
}: {
  sauceId: string | number;
  userId: string | number;
}) => {
  const response = await serverInstance.post(
    `/sauces/${sauceId}/like`,
    {
      userId
    },
    {
      headers: authHeader()
    }
  );
  return await response.data;
};

const dislikeOne = async ({
  sauceId,
  userId
}: {
  sauceId: string | number;
  userId: string | number;
}) => {
  const response = await serverInstance.post(
    `/sauces/${sauceId}/dislike`,
    {
      userId
    },
    {
      headers: authHeader()
    }
  );
  return await response.data;
};

const unLikeOne = async ({
  sauceId,
  userId
}: {
  sauceId: string | number;
  userId: string | number;
}) => {
  const response = await serverInstance.post(
    `/sauces/${sauceId}/unlike`,
    {
      userId
    },
    {
      headers: authHeader()
    }
  );
  return await response.data;
};

const unDislikeOne = async ({
  sauceId,
  userId
}: {
  sauceId: string | number;
  userId: string | number;
}) => {
  const response = await serverInstance.post(
    `/sauces/${sauceId}/undislike`,
    {
      userId
    },
    {
      headers: authHeader()
    }
  );
  return await response.data;
};

const sauceService = {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  likeOne,
  unLikeOne,
  dislikeOne,
  unDislikeOne
};

export default sauceService;
