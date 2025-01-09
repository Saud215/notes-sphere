import axios from "axios";

const devUrl = "https://notes-sphere-server/api/v1";

const customFetch = axios.create({
  baseURL: devUrl,
});

export default customFetch;
