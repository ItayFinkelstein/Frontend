import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ActualUserContextProvider } from "./Component1.tsx";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="330253108659-nat3lcc6p0hjqhgumoss0cbnonnb0e8a.apps.googleusercontent.com">
    <StrictMode>
      <ActualUserContextProvider>
        <App />
      </ActualUserContextProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
