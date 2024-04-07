import React from "react";
import "./Headers.css";
import Profile from "./Profile";
import { Link } from "react-router-dom";

function Headers(props) {
  return (
    <div className="headers">
      <div className="headers-title">
        <Link to="/home">FaceSpace</Link>
      </div>
      <Profile
        signedInUser={props.signedInUser.user_name}
        setSignedInUser={props.setSignedInUser}
      />
    </div>
  );
}

export default Headers;
