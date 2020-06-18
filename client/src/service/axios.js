import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

if (localStorage.getItem("jwt_token")) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("jwt_token");
}
