import React from "react";
import "./Profile.css";
import Posts from "../sections/Profile/Posts";
import RenderFriends from "../global/People/RenderUsersUtilify/RenderFriends";
import RenderUsers from "../global/People/RenderUsersUtilify/RenderUsers";
import ChatSystem from "../global/ChatSystem/ChatSystem";
import { useEffect, useState } from "react";

function Profile(props) {
  console.log("In Profile");
  const [userProfileInfo, setUserProfileInfo] = useState();
  const [resetProfile, setResetProfile] = useState("");
  const [myShow, setMyShow] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/users/username/${props.userProfile}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserProfileInfo(res.user);
      });
  }, [resetProfile]);

  const myPostBtnHandler = () => {
    console.log("mypostBtn working");
    setMyShow("myPost");
  };
  const myWallBtnHandler = () => {
    console.log("myWallBtn Working");
    setMyShow("myWall");
  };

  const userValidate = userProfileInfo.user_name === props.user.user_name;

  console.log("heree in profilee");
  return (
    <div className="profile-container">
      {userProfileInfo ? (
        <>
          <div className="profile-userInfo">
            <div className="profile-username profile-userInfo-tag">
              {/* <div className="profile-username-title">Username:</div> */}
              <div className="profile-username-username">
                {userProfileInfo.user_name}
              </div>
            </div>
            <div className="profile-bio profile-userInfo-tag">
              {/* <div className="profile-bio-title">Bio:</div> */}
              <div className="profile-bio-bio">{userProfileInfo.bio}</div>
            </div>
          </div>
          <ChatSystem
            signedInUser={props.user}
            setChatUsers={props.setChatUsers}
            setChatbox={props.setChatbox}
            chatbox={props.chatbox}
            resetChatSystem={props.resetChatSystem}
          />
          {userValidate ? (
            <div className="profile-tab">
              <div
                className="profile-tab-profileWall profile-tab-tab"
                onClick={myWallBtnHandler}
              >
                MyWall
              </div>
              <div
                className="profile-tab-userPosts profile-tab-tab"
                onClick={myPostBtnHandler}
              >
                MyPosts
              </div>
            </div>
          ) : (
            <></>
          )}
          <Posts
            userProfile={userProfileInfo}
            signedInUser={props.user}
            userValidate={userProfileInfo.user_name === props.user.user_name}
          />

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
