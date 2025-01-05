import { useState, useEffect } from "react";

const useResumeLogin = (props) => {
  if (!props.signedInUser && localStorage.getItem("signedInUser")) {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    fetch(`${import.meta.env.VITE_API}users/resignIn`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          props.setSignedInUser(res.user);
          console.log("LoginResume Success");
        }
      });
  }
  if (localStorage.getItem("userProfile")) {
    props.setUserProfile(localStorage.getItem("userProfile"));
  }
  if (localStorage.getItem("people") && props.people.length === 0)
    props.setPeople(JSON.parse(localStorage.getItem("people")));
};

export default useResumeLogin;
