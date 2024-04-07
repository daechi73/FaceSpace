import React from "react";
import "./Profile.css";
import Posts from "../sections/Profile/Posts";
import { useEffect, useState } from "react";

function Profile(props) {
  console.log("In Profile");
  const [profileUser, setProfileUser] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/users/username/${props.userProfile}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProfileUser(res.user);
      });
  }, []);
  console.log(profileUser);
  return (
    <div className="profile-container">
      {profileUser ? (
        <>
          <div className="profile-username">{profileUser.user_name}</div>
          <Posts posts={profileUser.posts} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;