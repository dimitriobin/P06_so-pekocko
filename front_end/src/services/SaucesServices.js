import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/sauces", { headers: authHeader() });
};

const createOne = (data) => {
  return http.post("/sauces", data, { headers: authHeader() });
};

const getOne = (id) => {
  return http.get(`/sauces/${id}`, { headers: authHeader() });
};

const updateOne = (id, data) => {
  return http.put(`/sauces/${id}`, data, { headers: authHeader() });
};

const deleteOne = (id) => {
  return http.delete(`/sauces/${id}`, { headers: authHeader() });
};

const likeOne = (id, data) => {
  return http.post(`/sauces/${id}/like`, data, { headers: authHeader() });
};

const sauceService = {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  likeOne,
};

export default sauceService;
