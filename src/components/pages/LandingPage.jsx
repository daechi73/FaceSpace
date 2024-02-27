import React from "react";
import "./LandingPage.css";
import Posts from "../sections/LandingPage/Posts/Posts";

function LandingPage(props) {
  return (
    <div className="landingPage">
      <Posts signedInUser={props.signedInUser} />
    </div>
  );
}

export default LandingPage;
