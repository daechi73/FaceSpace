import React from "react";
import { useEffect, useState } from "react";
import "./Posts.css";
import ProfilePostDel from "./ProfilePostDelAPI";
import PostDelAPI from "../../global/Post/PostDelApi";

function Posts(props) {
  // const renderUserPosts = props.profileWall.posts.map((e, i) => {
  //   return (
  //     <div className="profile-posts-post" key={i}>
  //       {e.post_content}
  //     </div>
  //   );
  // });
  const [profileWall, setProfileWall] = useState([]);
  const [postbox, setPostbox] = useState("");

  console.log("In Profile Posts");
  useEffect(() => {
    fetch(
      `http://localhost:3000/profileWalls/${props.userProfile.profileWall._id}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("here in Posts useEffect");
        console.log(res);
        setProfileWall(res.profileWall);
      });
  }, []);

  const handlePostDelBtn = async (e) => {
    const profileWallPostDelStatus = await ProfilePostDel(
      e,
      profileWall,
      setProfileWall
    );
    if (profileWallPostDelStatus) PostDelAPI(e);
  };

  const renderProfileWall = Array.isArray(profileWall.posts)
    ? profileWall.posts.length === 0
      ? "Nothing to render"
      : profileWall.posts.map((e, i) => {
          return (
            <div className="profile-posts-post" key={i}>
              <div className="profile-posts-post-content">{e.post_content}</div>
              <div className="profile-posts-post-author">
                {e.posted_user.user_name}
              </div>
              {props.signedInUser.user_name === e.posted_user.user_name ? (
                <div
                  className="profile-posts-post-delete"
                  onClick={handlePostDelBtn}
                  id={e._id}
                >
                  del
                </div>
              ) : (
                ""
              )}
              <div className="profile-posts-post-date-posted">
                {e.date_posted}
              </div>
            </div>
          );
        })
    : "";

  const handlePostboxChange = (e) => {
    setPostbox(e.target.value);
  };

  const handlePostBtn = () => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileWall: props.userProfile.profileWall,
        post: postbox,
        user: props.signedInUser,
      }),
    };
    fetch(`http://localhost:3000/posts/postProfileWall`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProfileWall(res.profileWall);
        setPostbox("");
      });
  };

  return (
    <div className="profile-posts">
      <div className="profile-posts-title">Profile Wall</div>
      <div className="profile-posts-form">
        <textarea
          name="postbox"
          id="profile-posts-form-postbox"
          className="profile-posts-form-postbox"
          onChange={handlePostboxChange}
          value={postbox}
        ></textarea>
        <button className="profile-posts-form-button" onClick={handlePostBtn}>
          Post
        </button>
      </div>
      {renderProfileWall}
    </div>
  );
}

export default Posts;
