import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setLoginTokens } from "./http-connections/authService";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "./config";
import { User } from "./types/User";
import { ENDPOINTS } from "./endpoints";

type GoogleLoginButtonProps = {
  setActualUser: (user: User | undefined) => void;
};
export default function GoogleLoginButton({
  setActualUser,
}: GoogleLoginButtonProps) {
  const navigate = useNavigate();
  const googleResponseMessage = async (response: CredentialResponse) => {
    try {
      const res = await axios.post(SERVER_BASE_URL + ENDPOINTS.GOOGLE, {
        credential: response.credential,
      });
      setLoginTokens({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      setActualUser({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const googleErrorMessage = () => {
    console.log("Google Error");
  };
  return (
    <GoogleLogin
      onSuccess={googleResponseMessage}
      onError={googleErrorMessage}
    />
  );
}
