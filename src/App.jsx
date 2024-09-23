import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import PageNotFound from "./components/pages/PageNotFound";
import LandingPage from "./components/pages/LandingPage";
import Headers from "./components/global/headers/Headers";
import Profile from "./components/pages/Profile";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./App.css";

function App() {
  const { url } = useParams();
  const [signedInUser, setSignedInUser] = useState();
  const [userProfile, setUserProfile] = useState();
  const [people, setPeople] = useState([]);
  const [chatbox, setChatbox] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [resetChatSystem, setResetChatSystem] = useState(null);

  const navigate = useNavigate();

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
          setSignedInUser(res.user);
        });
    }
    if (localStorage.getItem("userProfile")) {
      setUserProfile(localStorage.getItem("userProfile"));
    }
    if (localStorage.getItem("people") && people.length === 0)
      setPeople(JSON.parse(localStorage.getItem("people")));
    // localStorage.removeItem("people");
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
            setChatbox={setChatbox}
            setChatUsers={setChatUsers}
            setUserProfile={setUserProfile}
          />
          {url === "home" ? (
            <LandingPage
              signedInUser={signedInUser}
              setSignedInUser={setSignedInUser}
              setUserProfile={setUserProfile}
              people={people}
              setPeople={setPeople}
              chatbox={chatbox}
              setChatbox={setChatbox}
              chatUsers={chatUsers}
              setChatUsers={setChatUsers}
              resetChatSystem={resetChatSystem}
              setResetChatSystem={setResetChatSystem}
            />
          ) : url === "profile" ? (
            <Profile
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              people={people}
              user={signedInUser}
              setSignedInUser={setSignedInUser}
              setChatUsers={setChatUsers}
              setChatbox={setChatbox}
            />
          ) : (
            navigate("/home")
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
        className="checkSignedInUserBtn"
      >
        click
      </button>
    </>
  );
}

export default App;
