import React from "react";
import { useEffect, useState } from "react";
import "./People.css";

function People(props) {
  const [people, setPeople] = useState([]);
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
        console.log(res);
        if (res.status === "success") setPeople(res.users);
      });
  }, []);
  const renderUsers = people.map((e, i) => {
    return (
      <div className="landingPage-people-user" key={i}>
        <div className="landingPage-People-user-user">{e.user_name}</div>
        <div className="landingPage-people-user-addBtn">+</div>
      </div>
    );
  });
  return (
    <div className="landingPage-people">
      <div className="landingPage-people-user-wrapper">{renderUsers}</div>
    </div>
  );
}

export default People;
