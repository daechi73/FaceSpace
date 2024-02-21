import React from "react";
import "./SignUpPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
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
  return (
    <div className="signUpPage">
      <div className="signUpPage-backBtn">
        <Link to="/">Back</Link>
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
          type="text"
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
          cols="30"
          rows="10"
          className="signUpPage-form-bio"
          placeholder="Introduce yourself here.."
          onChange={handleBioChange}
          value={bio}
        ></textarea>
        <button className="signUpBtn">SIgn up</button>
      </div>
    </div>
  );
}

export default SignUpPage;
