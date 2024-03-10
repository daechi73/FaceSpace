import React from "react";
import "./LandingPage.css";
import Posts from "../sections/LandingPage/Posts/Posts";
import People from "../sections/LandingPage/People/People.jsx";

function LandingPage(props) {
  console.log("here in landingPage");
  return (
    <div className="landingPage">
      <Posts signedInUser={props.signedInUser} />
      <People
        signedInUser={props.signedInUser}
        setSignedInUser={props.setSignedInUser}
      />
    </div>
  );
}

export default LandingPage;
