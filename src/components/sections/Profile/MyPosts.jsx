import { react, useState, useEffect } from "react";
import "./MyPosts.css";

function MyPosts(props) {
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${props.posted_userId}/userPosts`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }, []);
  return <div className="profile-myPosts">MyPosts</div>;
}

export default MyPosts;
