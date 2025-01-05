import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import PageNotFound from "./components/pages/PageNotFound";
import LandingPage from "./components/pages/LandingPage";
import Headers from "./components/global/headers/Headers";
import Profile from "./components/pages/Profile";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSocketIoConnection from "./components/sections/AppJs/useSocketIoConnection";
import useResumeLogin from "./components/sections/AppJs/useResumeLogin";
import "./App.css";

function App() {
  const { url } = useParams();
  const [signedInUser, setSignedInUser] = useState();
  const [userProfile, setUserProfile] = useState();
  const [people, setPeople] = useState([]);
  const [chatbox, setChatbox] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [resetChatSystem, setResetChatSystem] = useState(null);
  const socket = useSocketIoConnection();

  const navigate = useNavigate();
  useResumeLogin({
    signedInUser,
    setSignedInUser,
    setUserProfile,
    people,
    setPeople,
  });

  console.log("here in app");
  // console.log(signedInUser);
  console.log(url);
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
              setPeople={setPeople}
              user={signedInUser}
              chatbox={chatbox}
              chatUsers={chatUsers}
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

      {/* <button
        onClick={() => {
          console.log(signedInUser);
        }}
        className="checkSignedInUserBtn"
      >
        click
      </button> */}
    </>
  );
}

export default App;
