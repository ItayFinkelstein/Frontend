import Cookies from "js-cookie";
import apiClient from "./apiClient";
import { ENDPOINTS } from "../endpoints";

const authPrefix: string = "/auth";

const login = async (email: string, password: string) => {
  const response = await apiClient.post(authPrefix + ENDPOINTS.LOGIN, {
    email,
    password,
  });

  setLoginTokens({
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  });
  return response.data;
};

export const setLoginTokens = (data: {
  accessToken: string;
  refreshToken: string;
}) => {
  Cookies.set("jwt", data.accessToken, { expires: 1 });
  localStorage.setItem("refreshToken", data.refreshToken);
};

const register = async (
  name: string,
  email: string,
  password: string,
  avatarUrl: string
) => {
  await apiClient.post(authPrefix + ENDPOINTS.REGISTER, {
    name,
    email,
    password,
    avatarUrl,
  });
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
