import React from "react";

function RenderFriendReq(props) {
  const handleAcceptFReq = () => {
    console.log("working");
  };
  const handleDeclineFreq = () => {
    console.log("working");
  };

  const renderFriendReq =
    props.signedInUser.friend_requests.length === 0
      ? ""
      : props.signedInUser.friend_requests.map((e, i) => {
          if (e.inbound._id === props.signedInUser._id) {
            console.log("working in renderFRiendReq");
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
                  onClick={handleDeclineFreq}
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
