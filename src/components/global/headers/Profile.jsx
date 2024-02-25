import React from "react";
import "./Profile.css";

function Profile(props) {
  return <div className="headers-profile">{props.signedInUser}</div>;
}

export default Profile;
