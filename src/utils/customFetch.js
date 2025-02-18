import axios from "axios";

const prodUrl = "https://notes-sphere.onrender.com/api/v1";
// const devUrl = "http://localhost:6300/api/v1";

const customFetch = axios.create({
  baseURL: prodUrl,
});

export default customFetch;
