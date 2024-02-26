import React from "react";
import "./Posts.css";
import { useState, useEffect } from "react";

function Posts(props) {
  const [posts, setPosts] = useState();
  const [post, setPost] = useState();
  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        if (res.status === "failed") setPosts(res.msg);
      });
  });
  const handlePostBtn = () => {
    console.log(props.signedInUser);
    const options = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: props.signedInUser,
        post: post,
      }),
    };
    fetch("http://localhost:3000/posts/post", options)
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  const handlePostChange = (e) => {
    setPost(e.target.value);
  };
  return (
    <div className="landingPage-posts-container">
      <div className="landingPage-posts-form">
        <textarea
          className="landingPage-posts-postBox"
          name="postBox"
          cols="80"
          rows="6"
          onChange={handlePostChange}
          value={post}
        />
        <button className="landingPage-posts-form-btn" onClick={handlePostBtn}>
          Post
        </button>
      </div>
      <div className="landingPage-posts-posts">{posts}</div>
    </div>
  );
}

export default Posts;
