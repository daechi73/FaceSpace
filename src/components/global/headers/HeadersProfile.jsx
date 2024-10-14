import React from "react";
import "./HeadersProfile.css";
import { useNavigate, Link } from "react-router-dom";
import ProfileLink from "../../sections/Profile/ProfileLink";

function Profile(props) {
  const navigate = useNavigate();
  const handleSignOutBtn = () => {
    fetch("https://facespace-backend.onrender.com/users/sign_out", { mode: "cors" })
      .then((res) => res.json())
      .then((res) => {
        props.setSignedInUser(res.user);
        localStorage.removeItem("signedInUser");
        props.setChatbox(null);
        props.setChatUsers([]);
        navigate("/FaceSpace");
      });
  };

  // const handleUsernameClick = () => {
  //   props.setUserProfile(props.signedInUser.username);
  //   localStorage.removeItem("userProfile");
  //   localStorage.setItem("userProfile", props.signedInUser.username);
  //   //props.setResetProfile !== "" ? props.setResetProfile("reset") : "";
  //   navigate("/profile");
  // };

  return (
    <div className="headers-profile">
      {/* <div className="headers-profile-username" onClick={handleUsernameClick}>
        {props.signedInUser}
      </div> */}
      <ProfileLink
        username={props.signedInUser.user_name}
        setUserProfile={props.setUserProfile}
        linkText={props.signedInUser.user_name}
      />
      <div className="headers-profile-signOut" onClick={handleSignOutBtn}>
        Sign out
      </div>
    </div>
  );
}

export default Profile;
