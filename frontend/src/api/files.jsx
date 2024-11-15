import axios from "axios";
import { getToken } from "./auth";

const API_URL = "http://localhost:3000";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    console.log("El token: ",token);
    
    if (token) config.headers["authorization"] = `Bearer ${token}`;
    return config;
});

export const getFiles = async () => {
    try {
        const response = await axiosInstance.get("/files");
        return response.data;
    } catch (error) {
        console.error("Error para cargar archivos: ", error);
        throw error;
    }
};

export const createFile = async(fileData) => {
    try {
        const response = await axiosInstance.post("/files", fileData);
        return response.data;
    } catch (error) {
        console.error("Error al crear archivo: ", error);
        console.error("Detalle: ", error.response);
        throw error;
    }
};

export const updateFile = async (id, fileData) => {
    try {
        const response = await axiosInstance.put(`/files/${id}`, fileData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar archivo: ", error);
        throw error;
    }
};

export const deleteFile = async (id) => {
    try {
        const response = await axiosInstance.delete(`/files/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar archivo: ", error);
        throw error;
    }
};



