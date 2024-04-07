import React from "react";
import { Link } from "react-router-dom";

function ProfileLink(props) {
  const handleLink = () => {
    props.setProfileUser(props.username);
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
