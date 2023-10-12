import axios from "axios";

export default axios.create({
  baseURL: "https://p06-so-peckoko-api.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
