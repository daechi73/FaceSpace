import React from "react";
import ProfileLink from "../../../sections/Profile/ProfileLink";
import "./RenderFriends.css";

function RenderFriends(props) {
  console.log("here in RenderFriends");
  const renderFriends =
    props.user.friends.length === 0 ? (
      <div
        className={
          props.className +
          "-people-friends-friends-noFriends" +
          " renderFriends-friends"
        }
      >
        "You have no friends"
      </div>
    ) : (
      props.user.friends.map((e, i) => {
        return (
          <div
            className={
              props.className +
              "-people-friends-friends-friend" +
              " renderFriends-friends-friend"
            }
            key={i}
          >
            {/* <ProfileLink
              username={e.user_name}
              setUserProfile={props.setUserProfile}
              setResetProfile={props.setResetProfile}
              linkText={e.user_name}
            /> */}
            <div
              className={
                props.className +
                "-people-friends-friends-friend-username renderFriends-friends-friend-username cursor-pointer"
              }
              onClick={props.handleUsernameClick}
            >
              {e.user_name}
            </div>
          </div>
        );
      })
    );
  return (
    <div
      className={
        props.className + "-people-friends-friends" + " renderFriends-friends"
      }
    >
      <div
        className={
          props.className +
          "-people-friends-friends-title" +
          " renderFriends-friends-title"
        }
      >
        Friends
      </div>
      <div
        className={
          props.className +
          "-people-friends-friends-friends" +
          " renderFriends-friends-friends"
        }
      >
        {renderFriends}
      </div>
    </div>
  );
}

export default RenderFriends;
