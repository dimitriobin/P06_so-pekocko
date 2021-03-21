import http from "../http-common";

exports.getAll = () => {
  return http.get("/sauces");
};

exports.createOne = (data) => {
  return http.post("/sauces", data);
};

exports.getOne = (id) => {
  return http.get(`/sauces/${id}`);
};

exports.updateOne = (id, data) => {
  return http.put(`/sauces/${id}`, data);
};

exports.deleteOne = (id) => {
  return http.delete(`/sauces/${id}`);
};

exports.likeOne = (id, data) => {
  return http.post(`/sauces/${id}/like`, data);
};
