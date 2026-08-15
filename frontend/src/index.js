import axios from "axios";

export const clientServer = axios.create({
    baseURL:'https://skinova-k3bm.onrender.com/'
});