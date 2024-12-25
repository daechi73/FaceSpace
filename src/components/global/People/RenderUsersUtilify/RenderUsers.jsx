import React from "react";
import FriendsUtility from "./FriendsUtility";

import "./RenderUsers.css";

function RenderUsers(props) {
  console.log("Here In RenderUsers");

  const renderUsers = props.people.map((e, i) => {
    const friendReq = () => {
      const options = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toAddUserId: e._id }),
      };
      fetch(
        `${import.meta.env.VITE_API}users/${
          props.user._id
        }/update/addFriendReq`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("In renderUSers add friend");
          props.setSignedInUser(res.user);
        });
    };

    const handleAcceptFReq = () => {
      FriendsUtility().addFriends(
        FriendsUtility().findFriendReq(e, props.user),
        props.user,
        props.setSignedInUser
      );
    };
    const handleDeclineFReq = () => {
      FriendsUtility().declineFriendReq(
        FriendsUtility().findFriendReq(e, props.user),
        props.user,
        props.setSignedInUser
      );
    };
    const filterInOutFReq = () => {
      for (let j = 0; j < props.user.friend_requests.length; j++) {
        if (props.user.friend_requests[j].inbound._id === e._id) {
          return "inbound";
        }
        if (props.user.friend_requests[j].outbound._id === e._id) {
          return "outbound";
        }
      }
      return false;
    };
    const checkIfFriends = () => {
      for (let j = 0; j < props.user.friends.length; j++) {
        if (props.user.friends[j]._id === e._id) return true;
      }
      return false;
    };

    return (
      <div
        className={props.className + "-people-user" + " renderUsers-user"}
        key={i}
      >
        <div
          className={
            props.className + "-people-user-user" + " renderUsers-user-user"
          }
        >
          {/* <ProfileLink
            username={e.user_name}
            setUserProfile={props.setUserProfile}
          /> */}

          <div
            className={
              props.className +
              "-people-user-user-username" +
              " renderUsers-user-user-username" +
              " cursor-pointer" +
              " username-handleUsernameClick"
            }
            onClick={props.handleUsernameClick}
          >
            {e.user_name}
          </div>
        </div>
        {filterInOutFReq() === "inbound" ? (
          <div
            className={
              props.className +
              "-people-user-status" +
              " renderUsers-user-status"
            }
          >
            (...)
          </div>
        ) : filterInOutFReq() === "outbound" ? (
          <div
            className={
              props.className +
              "-people-user-status" +
              " renderUsers-user-status"
            }
          >
            <div
              className={
                props.className +
                "-people-user-status-acceptBtn" +
                " renderUsers-user-status-acceptBtn" +
                " cursor-pointer"
              }
              onClick={handleAcceptFReq}
            >
              ☑
            </div>
            <div
              className={
                props.className +
                "-people-user-status-declineBtn" +
                " renderUsers-user-status-declineBtn" +
                " cursor-pointer"
              }
              onClick={handleDeclineFReq}
            >
              ☒
            </div>
          </div>
        ) : checkIfFriends() ? (
          <div
            className={
              props.className +
              "-people-user-alreadyFriends" +
              " renderUsers-user-alreadyFriends"
            }
          >
            ✅
          </div>
        ) : (
          <div
            className={
              props.className +
              "-people-user-addBtn" +
              " renderUsers-user-addBtn" +
              " cursor-pointer"
            }
            onClick={friendReq}
          >
            ＋
          </div>
        )}
      </div>
    );
  });

  return (
    <div
      className={
        props.className +
        "-people-users-container" +
        " renderUsers-users-container"
      }
    >
      <div
        className={
          props.className + "-people-users-title" + " renderUsers-users-title"
        }
      >
        Users
      </div>
      <div className={props.className + "-people-users" + " renderUsers-users"}>
        {renderUsers}
      </div>
    </div>
  );
}

export default RenderUsers;
