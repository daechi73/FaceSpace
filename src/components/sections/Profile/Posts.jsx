import React from "react";
import "./Posts.css";

function Posts(props) {
  const renderUserPosts = props.posts.map((e, i) => {
    return (
      <div className="profile-posts-post" key={i}>
        {e.post_content}
      </div>
    );
  });
  return (
    <div className="profile-posts">
      <div className="profile-posts-title">Past posts</div>
      {renderUserPosts}
    </div>
  );
}

export default Posts;
