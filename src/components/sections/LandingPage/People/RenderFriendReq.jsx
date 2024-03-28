import React from "react";

function RenderFriendReq(props) {
  const renderFriendReq =
    props.signedInUser.friend_requests.length === 0
      ? ""
      : props.signedInUser.friend_requests.map((e, i) => {
          console.log(e.inbound._id);
          console.log(props.signedInUser._id);
          if (e.inbound._id === props.signedInUser._id) {
            console.log("working in renderFRiendReq");
            return (
              <div className="landingPage-people-friends-request" key={i}>
                {e.outbound.user_name}
                <div className="landingPage-people-friends-request-acceptBtn">
                  Accept
                </div>
                <div className="landingPage-people-friends-request-declineBtn">
                  decline
                </div>
              </div>
            );
          }
        });
  return <>{renderFriendReq}</>;
}

export default RenderFriendReq;
