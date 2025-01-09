import axios from "axios";

const devUrl = "https://notes-sphere-server.onrender.com/api/v1";
// const devUrl = "http://localhost:6300/api/v1";

const customFetch = axios.create({
  baseURL: devUrl,
});

export default customFetch;
