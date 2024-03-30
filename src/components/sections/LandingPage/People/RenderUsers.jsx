import React from "react";

function RenderUsers(props) {
  const renderUsers = props.people.map((e, i) => {
    const friendReq = () => {
      const options = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toAddUserId: e._id }),
      };
      fetch(
        `http://localhost:3000/users/${props.signedInUser._id}/update/addFriendReq`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("In renderUSers add friend");
          console.log(res);
          props.setSignedInUser(res.user);
        });
    };

    const filterInOutFReq = () => {
      for (let j = 0; j < props.signedInUser.friend_requests.length; j++) {
        if (props.signedInUser.friend_requests[j].inbound._id === e._id) {
          return "inbound";
        }
        if (props.signedInUser.friend_requests[j].outbound._id === e._id) {
          return "outbound";
        }
      }
      return false;
    };

    return (
      <div className="landingPage-people-user" key={i}>
        <div className="landingPage-People-user-user">{e.user_name}</div>
        {filterInOutFReq() === "inbound" ? (
          <div className="landingPage-people-user-status">
            Waiting for response
          </div>
        ) : filterInOutFReq() === "outbound" ? (
          <div className="landingPage-people-user-status">
            <div className="landingPage-people-user-status-acceptBtn">
              Accept
            </div>
            <div className="landingPage-people-user-status-declineBtn">
              Decline
            </div>
          </div>
        ) : (
          <div className="landingPage-people-user-addBtn" onClick={friendReq}>
            +
          </div>
        )}
      </div>
    );
  });

  return <>{renderUsers}</>;
}

export default RenderUsers;
