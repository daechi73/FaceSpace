import React from "react";
import { useEffect, useState } from "react";
import "./Posts.css";

function Posts(props) {
  // const renderUserPosts = props.profileWall.posts.map((e, i) => {
  //   return (
  //     <div className="profile-posts-post" key={i}>
  //       {e.post_content}
  //     </div>
  //   );
  // });
  const [profileWall, setProfileWall] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/users/${props.userProfile._id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("here in Posts useEffect");
        console.log(res);
        setProfileWall(res.user.profileWall.posts);
      });
  }, []);

  const renderProfileWall =
    profileWall.length === 0
      ? "Nothing to render"
      : profileWall.posts.map((e, i) => {
          return (
            <div className="profile-posts-post" key={i}>
              <div className="profile-posts-post-content">{e.post_content}</div>
              <div className="profile-posts-post-author">{e.posted_user}</div>
              <div className="profile-posts-post-date-posted">
                {e.date_posted}
              </div>
            </div>
          );
        });

  return (
    <div className="profile-posts">
      <div className="profile-posts-title">Profile Wall</div>
      <div className="profile-posts-form">
        <textarea
          name="postbox"
          id="profile-posts-form-postbox"
          className="profile-posts-form-postbox"
        ></textarea>
        <button className="profile-posts-form-button">Post</button>
      </div>
      {renderProfileWall}
    </div>
  );
}

export default Posts;
