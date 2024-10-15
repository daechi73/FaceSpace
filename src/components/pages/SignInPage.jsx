import React from "react";
import { useState, useEffect } from "react";
import "./SignInPage.css";
import { useNavigate, Link } from "react-router-dom";

function SignInPage(props) {
  console.log("here in signInpage");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSigninBtn = () => {
    const options = {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "https://facespace-backend.onrender.com/",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch("https://facespace-backend.onrender.com/users/sign_in", options)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          setUsername("");
          setPassword("");
          console.log(res.user);
          props.setSignedInUser(res.user);
          localStorage.removeItem("signedInUser");
          localStorage.setItem("signedInUser", res.user._id);
          navigate("/home");
        } else {
          setErrorMsg(res);
        }
      });
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const addEnterKeyEvent = (e) => {
      if (e.key === "Enter") handleSigninBtn();
    };
    window.addEventListener("keydown", addEnterKeyEvent);
    return () => window.removeEventListener("keydown", addEnterKeyEvent);
  });
  return (
    <div className="signInPage" id="signInPage">
      <div className="signInPage-title">Welcome to Facespace</div>
      <div className="signInPage-instruction">Please sign in </div>
      <div className="signInForm">
        <input
          type="text"
          className="signInForm-username"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          className="signInForm-password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="signInBtn" onClick={handleSigninBtn}>
          Sign in
        </button>
      </div>
      <div className="signUpLink">
        <Link to="/sign_up">Sign Up</Link>
      </div>
      <div className="signInPage-errorMsgs errorMsgs">
        <div className="signInPage-errorMsg errorMsg">{errorMsg}</div>
      </div>
    </div>
  );
}

export default SignInPage;
