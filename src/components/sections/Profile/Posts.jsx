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
  console.log(props.posts);
  return <div className="profile-posts">{renderUserPosts}</div>;
}

export default Posts;
