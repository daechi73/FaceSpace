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

  const [count, setCount] = useState(0);
  const [signedInUser, setSignedInUser] = useState();

  useEffect(() => {
    if (!signedInUser && localStorage.getItem("signedInUser")) {
      console.log("here in app useEffect");
      fetch(`http://localhost:3000/users/65d5664decf0c63384f7e002`, {
        mode: "cors",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setSignedInUser(res.user);
        });
    }
  });
  console.log("here in app");
  return (
    <>
      {signedInUser ? (
        <>
          <Headers signedInUser={signedInUser} />
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
