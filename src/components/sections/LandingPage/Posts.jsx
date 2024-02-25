import React from "react";
import { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "failed") setPosts(res.msg);
      });
  });
  return <div className="landingPage-posts-container">{posts}</div>;
}

export default Posts;
