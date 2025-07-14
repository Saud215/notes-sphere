import axios from "axios";

// const prodUrl = "https://notes-sphere.onrender.com/api/v1";
// const devUrl = "http://localhost:6300/api/v1";
const origin = window.location.origin;
const prodUrl = `${origin.substring(0, origin.length - 4) + "6300"}/api/v1`;

// console.log(prodUrl);

const customFetch = axios.create({
  baseURL: prodUrl,
});

export default customFetch;
