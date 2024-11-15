import axios from "axios";

const API_URL = "http://localhost:3000";

export const login = async(username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signin`, { username, password });
        localStorage.setItem("token", response.data.access_token);
        return response.data;
    } catch (error) {
        console.log("Error de autenticacion", error);
        throw error;        
    }
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const isAuthenticated =() => {
    return !!getToken();
}

export const logout =() => {
    localStorage.removeItem('token');
}

