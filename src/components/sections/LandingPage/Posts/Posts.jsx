import React from "react";
import "./Posts.css";
import { useState, useEffect } from "react";

function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState();
  const [resetPosts, setResetPost] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "failed") "setPosts(res.msg)";
        else {
          setPosts(res.posts);
        }
      });
  }, [resetPosts]);
  const handlePostBtn = () => {
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
      .then((res) => {
        if (res.status === "success") {
          setResetPost(resetPosts + 1);
          setPost("");
        }
      });
  };
  const handlePostChange = (e) => {
    setPost(e.target.value);
  };
  const renderPosts = posts.map((e, i) => {
    return (
      <div className="landingPage-posts-posts-post" key={i}>
        <div className="landingPage-posts-posts-post-postContent">
          {e.post_content}
        </div>
        <div className="landingPage-posts-posts-post-info">
          <div className="landingPage-posts-posts-post-author">
            {e.posted_user.user_name}
          </div>
          <div className="landingPage-posts-posts-post-posted-date">
            {e.dated_posted_formatted}
          </div>
          <div className="landingPage-posts-posts-post-posted-likes">
            likes: {e.likes.length}
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="landingPage-posts-container">
      <div className="landingPage-posts-title">Community Wall</div>
      <div className="landingPage-posts-form">
        <textarea
          className="landingPage-posts-postBox"
          name="postBox"
          // cols="80"
          // rows="6"
          onChange={handlePostChange}
          value={post}
        />
        <button className="landingPage-posts-form-btn" onClick={handlePostBtn}>
          Post
        </button>
      </div>
      <div className="landingPage-posts-posts">{renderPosts}</div>
    </div>
  );
}

export default Posts;
