import React from "react";
import "./Headers.css";
import HeadersProfile from "./HeadersProfile";
import { Link } from "react-router-dom";

function Headers(props) {
  return (
    <div className="headers">
      <div className="headers-title">
        <Link to="/home">FaceSpace</Link>
      </div>
      <HeadersProfile
        signedInUser={props.signedInUser.user_name}
        setSignedInUser={props.setSignedInUser}
        setChatbox={props.setChatbox}
        setChatUsers={props.setChatUsers}
        setUserProfile={props.setUserProfile}
      />
    </div>
  );
}

export default Headers;
