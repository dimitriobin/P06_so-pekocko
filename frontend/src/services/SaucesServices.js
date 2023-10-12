import http from "../http-common";
import authHeader from "./auth-header";
import AuthService from "./AuthServices";

const getAll = () => {
  return http
    .get("/sauces", { headers: authHeader() })
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      if (
        error.response.status === 401 &&
        error.response.data === "Please login"
      ) {
        AuthService.logout();
      } else {
        return Promise.reject(error);
      }
    });
};

const createOne = (data) => {
  return http
    .post("/sauces", data, { headers: authHeader() })
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      if (
        error.response.status === 401 &&
        error.response.data === "Please login"
      ) {
        AuthService.logout();
      } else {
        return Promise.reject(error);
      }
    });
};

const getOne = (id) => {
  return http
    .get(`/sauces/${id}`, { headers: authHeader() })
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      if (
        error.response.status === 401 &&
        error.response.data === "Please login"
      ) {
        AuthService.logout();
      } else {
        return Promise.reject(error);
      }
    });
};

const updateOne = (id, data) => {
  return http
    .put(`/sauces/${id}`, data, { headers: authHeader() })
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      if (
        error.response.status === 401 &&
        error.response.data === "Please login"
      ) {
        AuthService.logout();
      } else {
        return Promise.reject(error);
      }
    });
};

const deleteOne = (id) => {
  return http
    .delete(`/sauces/${id}`, { headers: authHeader() })
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      if (
        error.response.status === 401 &&
        error.response.data === "Please login"
      ) {
        AuthService.logout();
      } else {
        return Promise.reject(error);
      }
    });
};

const likeOne = (id, data) => {
  return http
    .post(`/sauces/${id}/like`, data, { headers: authHeader() })
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      if (
        error.response.status === 401 &&
        error.response.data === "Please login"
      ) {
        AuthService.logout();
      } else {
        return Promise.reject(error);
      }
    });
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
