import React from "react";
import FriendsUtility from "./FriendsUtility";
import RenderUserClickMenu from "../../UserClickMenu/RenderUserClickMenu";

function RenderFriendReq(props) {
  console.log("Here in RenderFriendReq");
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

            return (
              <div className="landingPage-people-friends-request" key={i}>
                {/* <ProfileLink
                  username={e.outbound.user_name}
                  setUserProfile={props.setUserProfile}
                /> */}
                <div className="landingPage-people-friends-request-username">
                  {e.outbound.user_name}
                </div>
                {props.showMenu ? (
                  <RenderUserClickMenu
                    username={e.outbound.user_name}
                    setUserProfile={props.setUserProfile}
                    setShowMenu={props.setShowMenu}
                  />
                ) : (
                  <></>
                )}
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
