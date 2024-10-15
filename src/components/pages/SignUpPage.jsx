import React from "react";
import "./SignUpPage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [errorMsgs, setErrorMsgs] = useState([]);

  const navigate = useNavigate();

  const renderErrorMessages = errorMsgs.map((e, i) => {
    return (
      <div key={i} className="signInPage-errorMsg errorMsg">
        {e.msg}
      </div>
    );
  });

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSignUpBtn = (e) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        email: email,
        bio: bio,
      }),
    };
    fetch("http://localhost:3000/users/sign_up", options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          navigate("/FaceSpace");
        } else {
          setErrorMsgs(res.errors);
        }
      });
  };

  useEffect(() => {
    const addEnterKeyEvent = (e) => {
      if (e.key === "Enter") handleSignUpBtn();
    };
    window.addEventListener("keydown", addEnterKeyEvent);
    return () => window.removeEventListener("keydown", addEnterKeyEvent);
  });
  return (
    <div className="signUpPage">
      <div className="signUpPage-backBtn">
        <Link to="/FaceSpace/">Back</Link>
      </div>
      <div className="signUpPage-title">Sign Up</div>
      <div className="signUpPage-form">
        <input
          type="text"
          className="signUpPage-form-username signUpPage-form-input"
          name="username"
          placeholder="Username"
          onChange={handleUsernameChange}
          value={username}
        />
        <input
          type="password"
          className="signUpPage-form-password signUpPage-form-input"
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
        <input
          type="text"
          className="signUpPage-form-name signUpPage-form-input"
          name="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
        <input
          type="text"
          className="signUpPage-form-email signUpPage-form-input"
          name="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
        <textarea
          name="bio"
          id="signUpPage-form-bio"
          cols="40"
          rows="10"
          className="signUpPage-form-bio"
          placeholder="Introduce yourself here.."
          onChange={handleBioChange}
          value={bio}
        ></textarea>
        <button className="signUpBtn" onClick={handleSignUpBtn}>
          SIgn up
        </button>
        <div className="signUpPage-errorMsgs">{renderErrorMessages}</div>
      </div>
    </div>
  );
}

export default SignUpPage;
