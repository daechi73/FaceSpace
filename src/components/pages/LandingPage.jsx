import React from "react";
import "./LandingPage.css";
import Posts from "../sections/LandingPage/Posts/Posts";
import People from "../sections/LandingPage/People/People.jsx";

function LandingPage(props) {
  return (
    <div className="landingPage">
      <Posts signedInUser={props.signedInUser} />
      <People signedInUser={props.signedInUser} />
    </div>
  );
}

export default LandingPage;
