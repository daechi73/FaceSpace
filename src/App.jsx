import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import PageNotFound from "./components/pages/PageNotFound";
import LandingPage from "./components/pages/LandingPage";
import Headers from "./components/global/headers/Headers";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./App.css";

function App() {
  const { url } = useParams();
  const [signedInUser, setSignedInUser] = useState();

  useEffect(() => {
    if (!signedInUser && localStorage.getItem("signedInUser")) {
      console.log("here in app useEffect in App");
      fetch(
        `http://localhost:3000/users/${localStorage.getItem("signedInUser")}`,
        {
          mode: "cors",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setSignedInUser(res.user);
        });
    }
  });
  console.log("here in app");
  return (
    <>
      {signedInUser ? (
        <>
          <Headers
            signedInUser={signedInUser}
            setSignedInUser={setSignedInUser}
          />
          {url === "home" ? (
            <LandingPage signedInUser={signedInUser} />
          ) : (
            <PageNotFound />
          )}
        </>
      ) : (
        <>
          {url === undefined ? (
            <SignInPage setSignedInUser={setSignedInUser} />
          ) : url === "sign_up" ? (
            <SignUpPage />
          ) : (
            <PageNotFound />
          )}
        </>
      )}

      <button
        onClick={() => {
          console.log(signedInUser);
        }}
      >
        click
      </button>
    </>
  );
}

export default App;
