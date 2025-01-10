import { useState, useEffect } from "react";

const useResumeLogin = (props) => {
  useEffect(() => {
    if (!props.signedInUser && localStorage.getItem("signedInUser")) {
      console.log("in useResumeLogin");
      const options = {
        mode: "cors",
        credentials: "include",
      };
      fetch(`${import.meta.env.VITE_API}users/resignIn`, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            console.log("LoginResume Success");
            props.setInitialSignIn(true);
            props.setSignedInUser(res.user);
            if (localStorage.getItem("userProfile")) {
              props.setUserProfile(localStorage.getItem("userProfile"));
            }
            if (localStorage.getItem("people") && props.people.length === 0)
              props.setPeople(JSON.parse(localStorage.getItem("people")));
          } else {
            console.log(res);
          }
        });
    }
  }, []);
};

export default useResumeLogin;
