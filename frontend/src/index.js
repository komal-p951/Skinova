import axios from "axios";

export const clientServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://skinova-k3bm.onrender.com/'
});