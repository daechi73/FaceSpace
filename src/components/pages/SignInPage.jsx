import React from "react";
import { useState } from "react";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";
function SignInPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSigninBtn = (e) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch("http://localhost:3000/users/sign_in", options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          setUsername("");
          setPassword("");
          props.setSignedInUser(res.user);
          navigate("/home");
        }
      });
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="signInPage">
      <div className="signInForm">
        <input
          type="text"
          className="signInForm-userName"
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
    </div>
  );
}

export default SignInPage;
