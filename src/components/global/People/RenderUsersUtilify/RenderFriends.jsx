import React from "react";
import ProfileLink from "../../../sections/Profile/ProfileLink";
import "./RenderFriends.css";

function RenderFriends(props) {
  console.log("here in RenderFriends");
  const renderFriends =
    props.user.friends.length === 0 ? (
      <div
        className={
          props.className + "-friends-noFriends" + " renderFriends-friends"
        }
      >
        "You have no friends"
      </div>
    ) : (
      props.user.friends.map((e, i) => {
        return (
          <div
            className={
              props.className + "-friends-friend" + " renderFriends-friend"
            }
            key={i}
          >
            <ProfileLink
              username={e.user_name}
              setUserProfile={props.setUserProfile}
              setResetProfile={props.setResetProfile}
              linkText={e.user_name}
            />
          </div>
        );
      })
    );
  return (
    <div className={props.className + "-friends" + " renderFriends-friends"}>
      <div className={props.className + "-friends-title"}>Friends</div>
      <div className={props.className + "-friends-friends"}>
        {renderFriends}
      </div>
    </div>
  );
}

export default RenderFriends;
