import Cookies from "js-cookie";
import apiClient from "./api-client";
import { ENDPOINTS } from "../endpoints";

const authPrefix: string = "/auth";

const login = async (email: string, password: string) => {
    const response = await apiClient.post(authPrefix + ENDPOINTS.LOGIN, { email, password });
    const { accessToken, refreshToken } = response.data;

    Cookies.set("jwt", accessToken, { expires: 1 });
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
};

const register = async (name: string, email: string, password: string) => {
    await apiClient.post(authPrefix + ENDPOINTS.REGISTER, { name, email, password });
    return login(email, password);
};

const logout = async (navigate: () => void) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        console.error("Missing refresh token");
        return;
    }

    try {
        await apiClient.post(authPrefix + ENDPOINTS.LOGOUT, { refreshToken });

        Cookies.remove("jwt");
        localStorage.removeItem("refreshToken");

        navigate();
    } catch (error) {
        console.error("There was an error logging out!", error);
    }
};

export { login, register, logout };