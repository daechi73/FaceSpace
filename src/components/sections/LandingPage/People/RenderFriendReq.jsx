import React from "react";
import FriendsUtility from "./FriendsUtility";

function RenderFriendReq(props) {
  console.log("Here in RenderFriendReq");
  const renderFriendReq =
    props.signedInUser.friend_requests.length === 0
      ? ""
      : props.signedInUser.friend_requests.map((e, i) => {
          if (e.inbound._id === props.signedInUser._id) {
            console.log("working in renderFRiendReq");
            const handleAcceptFReq = () => {
              FriendsUtility().addFriends(
                e,
                props.signedInUser,
                props.setSignedInUser
              );
            };

            const handleDeclineFReq = () => {
              FriendsUtility().declineFriendReq(
                e,
                props.signedInUser.props.setSignedInUser
              );
            };

            return (
              <div className="landingPage-people-friends-request" key={i}>
                {e.outbound.user_name}
                <div
                  className="landingPage-people-friends-request-acceptBtn"
                  onClick={handleAcceptFReq}
                >
                  Accept
                </div>
                <div
                  className="landingPage-people-friends-request-declineBtn"
                  onClick={handleDeclineFReq}
                >
                  decline
                </div>
              </div>
            );
          }
        });
  return <>{renderFriendReq}</>;
}

export default RenderFriendReq;
