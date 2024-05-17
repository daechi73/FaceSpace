import React from "react";
import "./HeadersProfile.css";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();
  const handleSignOutBtn = () => {
    fetch("http://localhost:3000/users/sign_out", { mode: "cors" })
      .then((res) => res.json())
      .then((res) => {
        props.setSignedInUser(res.user);
        localStorage.removeItem("signedInUser");
        props.setChatbox(null);
        props.setChatUsers([]);
        navigate("/");
      });
  };
  return (
    <div className="headers-profile">
      <div className="headers-profile-username">{props.signedInUser}</div>
      <div className="headers-profile-signOut" onClick={handleSignOutBtn}>
        Sign out
      </div>
    </div>
  );
}

export default Profile;
