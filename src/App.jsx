import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import PageNotFound from "./components/pages/PageNotFound";
import LandingPage from "./components/pages/LandingPage";
import Headers from "./components/global/headers/Headers";
import Profile from "./components/pages/Profile";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./App.css";

function App() {
  const { url } = useParams();
  const [signedInUser, setSignedInUser] = useState();
  const [userProfile, setUserProfile] = useState();

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
          setSignedInUser(res.user);
        });
    }
    if (localStorage.getItem("userProfile")) {
      setUserProfile(localStorage.getItem("userProfile"));
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
              setUserProfile={setUserProfile}
            />
          ) : url === "profile" ? (
            <Profile userProfile={userProfile} />
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
