import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RenderUserClickMenu from "../../global/UserClickMenu/RenderUserClickMenu";

function ProfileLink(props) {
  const handleLinkClick = () => {
    console.log("here in profileLink handleLinkClick");
    props.setUserProfile(props.username);
    localStorage.removeItem("userProfile");
    localStorage.setItem("userProfile", props.username);
    props.setResetProfile !== "" ? props.setResetProfile("reset") : "";
  };
  return (
    <div className="profileLink">
      <Link to="/profile" onClick={handleLinkClick}>
        Profile
      </Link>
    </div>
  );
}

export default ProfileLink;
