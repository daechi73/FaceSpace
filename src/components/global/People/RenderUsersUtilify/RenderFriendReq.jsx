import React from "react";
import { useState } from "react";
import FriendsUtility from "./FriendsUtility";
import RenderUserClickMenu from "../../UserClickMenu/RenderUserClickMenu";
import "./RenderFriendReq.css";

function RenderFriendReq(props) {
  console.log("Here in RenderFriendReq");

  const [friendReq, setFriendFreq] = useState(false);
  const renderFriendReq =
    props.user.friend_requests.length === 0
      ? ""
      : props.user.friend_requests.map((e, i) => {
          if (e.inbound._id === props.user._id) {
            console.log("working in renderFRiendReq");
            const handleAcceptFReq = () => {
              FriendsUtility().addFriends(e, props.user, props.setSignedInUser);
            };

            const handleDeclineFReq = () => {
              FriendsUtility().declineFriendReq(
                e,
                props.user.props.setSignedInUser
              );
            };
            if (friendReq === false) setFriendFreq(true);

            return (
              <div
                className={
                  props.className +
                  "-people-friends-friendReq-request" +
                  " renderFriendReq-friendReq-request"
                }
                key={i}
              >
                {/* <ProfileLink
                  username={e.outbound.user_name}
                  setUserProfile={props.setUserProfile}
                /> */}
                <div
                  className={
                    props.className +
                    "-people-friends-friendReq-request-username" +
                    " renderFriendReq-friendReq-request-username" +
                    " username-handleUsernameClick"
                  }
                  onClick={props.handleUsernameClick}
                >
                  {e.outbound.user_name}
                </div>

                <div
                  className={
                    props.className +
                    "-people-friends-friendReq-request-acceptBtn" +
                    " renderFriendReq-friendReq-request-acceptBtn" +
                    " cursor-pointer"
                  }
                  onClick={handleAcceptFReq}
                >
                  ☑
                </div>
                <div
                  className={
                    props.className +
                    "-people-friends-friendReq-request-declineBtn" +
                    " renderFriendReq-friendReq-request-declineBtn" +
                    " cursor-pointer"
                  }
                  onClick={handleDeclineFReq}
                >
                  ☒
                </div>
              </div>
            );
          }
        });
  return (
    <div
      className={
        props.className +
        "-people-friends-friendReq-container" +
        " renderFriendReq-container"
      }
    >
      <div
        className={
          props.className +
          "-people-friends-friendReq-title" +
          " renderFriendReq-title"
        }
      >
        Friend Request
      </div>
      {!friendReq ? (
        <div
          className={
            props.className +
            "-people-friends-friendReq-noFriendReq" +
            " renderFriendReq-noFriendReq"
          }
        >
          "You have no Friend Request"
        </div>
      ) : (
        <div
          className={
            props.className +
            "-people-friends-friendReqs" +
            " renderFriendReq-friendReqs"
          }
        >
          {renderFriendReq}
        </div>
      )}
    </div>
  );
}

export default RenderFriendReq;
