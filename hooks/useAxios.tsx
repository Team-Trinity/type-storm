import axios from "axios";

export const useAxios = () => {
    const instance = axios.create({
        // baseURL: "http://localhost:5000",
        baseURL: "https://type-storm-server-one.vercel.app/api/v1/users",
        timeout: 1000
    });
    return instance;
};
