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
      const options = {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cache: "no-cache",
        },
        credentials: "same-origin",
      };
      fetch(
        `http://localhost:3000/users/${localStorage.getItem("signedInUser")}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          console.log(res.user);
          setSignedInUser(res.user);
        });
    }
  });
  console.log("here in app");
  // console.log(signedInUser);
  return (
    <>
      {signedInUser ? (
        <>
          <Headers
            signedInUser={signedInUser}
            setSignedInUser={setSignedInUser}
          />
          {url === "home" ? (
            <LandingPage
              signedInUser={signedInUser}
              setSignedInUser={setSignedInUser}
            />
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
