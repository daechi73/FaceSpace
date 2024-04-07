import React from "react";
import { Link } from "react-router-dom";

function ProfileLink(props) {
  const handleLink = () => {
    props.setUserProfile(props.username);
    localStorage.removeItem("userProfile");
    localStorage.setItem("userProfile", props.username);
  };
  return (
    <div className="profileLink">
      <Link to="/profile" onClick={handleLink}>
        {props.username}
      </Link>
    </div>
  );
}

export default ProfileLink;
