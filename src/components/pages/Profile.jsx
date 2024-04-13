import React from "react";
import "./Profile.css";
import Posts from "../sections/Profile/Posts";
import RenderFriends from "../sections/RenderUsersUtilify/RenderFriends";
import RenderUsers from "../sections/RenderUsersUtilify/RenderUsers";
import { useEffect, useState } from "react";

function Profile(props) {
  console.log("In Profile");
  const [userProfileInfo, setUserProfileInfo] = useState();
  const [resetProfile, setResetProfile] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/users/username/${props.userProfile}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserProfileInfo(res.user);
      });
  }, [resetProfile]);

  return (
    <div className="profile-container">
      {userProfileInfo ? (
        <>
          <div className="profile-userInfo">
            <div className="profile-username profile-userInfo-tag">
              <div className="profile-username-title">Username:</div>
              <div className="profile-username-username">
                {userProfileInfo.user_name}
              </div>
            </div>
            <div className="profile-bio profile-userInfo-tag">
              <div className="profile-bio-title">Bio:</div>
              <div className="profile-bio-bio">{userProfileInfo.bio}</div>
            </div>
          </div>

          <Posts posts={userProfileInfo.posts} />
          <div className="profile-friends">
            <RenderFriends
              user={userProfileInfo}
              setUserProfile={props.setUserProfile}
              resetProfile={setResetProfile}
            />
          </div>
          <div className="profile-users">
            <RenderUsers
              people={props.people}
              user={props.user}
              setSignedInUser={props.setSignedInUser}
              setUserProfile={props.setUserProfile}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
