import React from "react";
import { useEffect, useState } from "react";
import "./People.css";
import RenderUsers from "./RenderUsers";
import RenderFriends from "./RenderFriends";
import RenderFriendReq from "./RenderFriendReq";

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

  return (
    <div className="landingPage-people">
      <div className="landingPage-people-friends-container">
        <div className="landingPage-people-friends-friendReq">
          {" "}
          <RenderFriendReq signedInUser={props.signedInUser} />
        </div>

        <div className="landingPage-people-friends-friends">
          <RenderFriends signedInUser={props.signedInUser} />
        </div>
      </div>
      <div className="landingPage-people-user-container">
        <RenderUsers
          people={people}
          signedInUser={props.signedInUser}
          setSignedInUser={props.setSignedInUser}
        />
      </div>
    </div>
  );
}

export default People;
