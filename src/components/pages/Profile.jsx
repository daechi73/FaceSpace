import React from "react";
import "./Profile.css";
import Posts from "../sections/Profile/Posts";
import RenderFriends from "../sections/LandingPage/People/RenderFriends";
import { useEffect, useState } from "react";

function Profile(props) {
  console.log("In Profile");
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/users/username/${props.userProfile}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserProfile(res.user);
      });
  }, []);
  console.log(userProfile);
  return (
    <div className="profile-container">
      {userProfile ? (
        <>
          <div className="profile-username">{userProfile.user_name}</div>
          <div className="profile-bio">{userProfile.bio}</div>
          <Posts posts={userProfile.posts} />
          <RenderFriends
            user={userProfile}
            setUserProfile={props.setUserProfile}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
