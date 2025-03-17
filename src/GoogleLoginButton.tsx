import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginButton() {
  const googleResponseMessage = async (response: CredentialResponse) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/google", {
        credential: response.credential,
      });
      console.log(res.data);
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
