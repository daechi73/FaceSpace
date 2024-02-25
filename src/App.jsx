import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import PageNotFound from "./components/pages/PageNotFound";
import LandingPage from "./components/pages/LandingPage";
import Headers from "./components/global/headers/Headers";
import { useState } from "react";
import { useParams } from "react-router-dom";

import "./App.css";

function App() {
  const { url } = useParams();

  const [count, setCount] = useState(0);
  const [signedInUser, setSignedInUser] = useState("");
  return (
    <>
      {url === undefined ? "" : <Headers signedInUser={signedInUser} />}
      {url === undefined ? (
        <SignInPage setSignedInUser={setSignedInUser} />
      ) : url === "sign_up" ? (
        <SignUpPage />
      ) : url === "home" ? (
        <LandingPage signedInUser={signedInUser} />
      ) : (
        <PageNotFound />
      )}
    </>
  );
}

export default App;
