import Cookies from "js-cookie";
import apiClient from "./api-client";

const login = async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password });
    const { accessToken, refreshToken } = response.data;

    Cookies.set("jwt", accessToken, { expires: 1 });
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
};

const register = async (name: string, email: string, password: string) => {
    await apiClient.post("/auth/register", { name, email, password });
    return login(email, password);
};

const logout = async (navigate: () => void) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        console.error("Missing refresh token");
        return;
    }

    try {
        await apiClient.post("/auth/logout", { refreshToken });

        Cookies.remove("jwt");
        localStorage.removeItem("refreshToken");

        navigate();
    } catch (error) {
        console.error("There was an error logging out!", error);
    }
};

export { login, register, logout };