import React from "react";
import "./Headers.css";
import Profile from "./Profile";

function Headers(props) {
  return (
    <div className="headers">
      <div className="headers-title">FaceSpace</div>
      <Profile
        signedInUser={props.signedInUser.user_name}
        setSignedInUser={props.setSignedInUser}
      />
    </div>
  );
}

export default Headers;
