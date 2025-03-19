import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setLoginTokens } from "./http-connections/authService";
import { BASE_URL } from "./Utils";
import { useNavigate } from "react-router-dom";
import useActualUser from "./useActualUser";

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const { setActualUser } = useActualUser();
  const googleResponseMessage = async (response: CredentialResponse) => {
    try {
      const res = await axios.post(BASE_URL + "/auth/google", {
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
