import React from "react";

function RenderFriendReq(props) {
  console.log("Here in RenderFriendReq");
  const renderFriendReq =
    props.signedInUser.friend_requests.length === 0
      ? ""
      : props.signedInUser.friend_requests.map((e, i) => {
          if (e.inbound._id === props.signedInUser._id) {
            console.log("working in renderFRiendReq");

            const handleAcceptFReq = () => {
              console.log("working");
              const options = {
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ friendReq: e }),
              };
              fetch(
                `http://localhost:3000/users/${props.signedInUser._id}/update/addFriend`,
                options
              )
                .then((res) => res.json())
                .then((res) => {
                  if (res.status === "success") {
                    console.log(res);
                    props.setSignedInUser(res.user);
                  }
                });
            };
            const handleDeclineFreq = () => {
              console.log("working");
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
