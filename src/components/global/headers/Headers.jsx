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
        signedInUser={props.signedInUser}
        setSignedInUser={props.setSignedInUser}
        setChatbox={props.setChatbox}
        setChatUsers={props.setChatUsers}
        setUserProfile={props.setUserProfile}
      />
      <div className="headers-borderBottom"></div>
    </div>
  );
}

export default Headers;
