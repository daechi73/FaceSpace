import React from "react";
import { useEffect, useState } from "react";
import "./People.css";

function People(props) {
  const [people, setPeople] = useState([]);

  console.log("here in people");

  useEffect(() => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: props.signedInUser }),
    };
    fetch("http://localhost:3000/users/other_users", options)
      .then((res) => res.json())
      .then((res) => {
        console.log("in people useEffect");
        console.log(res);
        if (res.status === "success") setPeople(res.users);
      });
  }, []);
  const renderUsers = people.map((e, i) => {
    const addFriend = () => {
      const options = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toAddUserId: e._id }),
      };
      fetch(
        `http://localhost:3000/users/${props.signedInUser._id}/update/addFriend`,
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
          <div className="landingPage-people-user-status">Accept decline</div>
        ) : (
          <div className="landingPage-people-user-addBtn" onClick={addFriend}>
            +
          </div>
        )}
      </div>
    );
  });

  const renderFriends =
    props.signedInUser.friends.length === 0
      ? "You have no friends"
      : props.signedinUser.friends.map((e, i) => {
          return (
            <div className="landingPage-people-friends" key={i}>
              {e.user_name}
            </div>
          );
        });

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
  return (
    <div className="landingPage-people">
      <div className="landingPage-people-friends-container">
        {renderFriendReq}
        {renderFriends}
      </div>
      <div className="landingPage-people-user-container">{renderUsers}</div>
    </div>
  );
}

export default People;
