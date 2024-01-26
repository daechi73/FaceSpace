import React from "react";
import "./SignInPage.css";
function SignInPage() {
  return (
    <div className="signInPage">
      <div className="signInForm">
        <input
          type="text"
          className="signInForm-userName"
          placeholder="userName"
        />
        <input
          type="password"
          className="signInForm-password"
          placeholder="password"
        />
        <button className="signInBtn">Sign in</button>
      </div>
    </div>
  );
}

export default SignInPage;
