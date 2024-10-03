import React from "react";
import { useEffect, useState, useRef } from "react";
import "./MyWall.css";
import ProfilePostDel from "./ProfilePostDelAPI";
import PostDelAPI from "../../global/Post/PostDelApi";

function MyWall(props) {
  // const renderUserPosts = props.profileWall.posts.map((e, i) => {
  //   return (
  //     <div className="profile-posts-post" key={i}>
  //       {e.post_content}
  //     </div>
  //   );
  // });
  const [profileWall, setProfileWall] = useState([]);
  const [postbox, setPostbox] = useState("");
  const [scroll, setScroll] = useState("");

  const postsDiv = useRef();
  const scrollUpDiv = useRef();
  const scrollDownDiv = useRef();

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

  useEffect(() => {
    //hides/shows scrollDown/Up arrows
    if (postsDiv.current) {
      if (postsDiv.current.scrollHeight > 241) {
        setScroll(" show");
      } else {
        setScroll("");
      }
      postsDiv.current.scrollTo(0, postsDiv.current.scrollHeight);
    }

    //event listeners for scrollDown/Up arrows

    let postDivScrollDownActivate,
      postDivScrollDownDeactivate,
      postDivScrollUpActivate,
      postdivScrollUpDeactivate;

    if (postsDiv.current && scrollDownDiv.current) {
      let scrollDown;

      postDivScrollDownActivate = () => {
        scrollDown = setInterval(() => {
          postsDiv.current.scrollTop += 15;
        }, 50);
      };
      postDivScrollDownDeactivate = () => {
        clearInterval(scrollDown);
      };

      scrollDownDiv.current.addEventListener(
        "mouseover",
        postDivScrollDownActivate
      );
      scrollDownDiv.current.addEventListener(
        "mouseout",
        postDivScrollDownDeactivate
      );
    }

    if (postsDiv.current && scrollUpDiv.current) {
      let scrollUp;
      postDivScrollUpActivate = () => {
        scrollUp = setInterval(() => {
          postsDiv.current.scrollTop -= 15;
        }, 50);
      };

      postdivScrollUpDeactivate = () => {
        clearInterval(scrollUp);
      };

      scrollUpDiv.current.addEventListener(
        "mouseover",
        postDivScrollUpActivate
      );
      scrollUpDiv.current.addEventListener(
        "mouseout",
        postdivScrollUpDeactivate
      );
    }
    return () => {
      scrollDownDiv.current.removeEventListener(
        "mouseover",
        postDivScrollDownActivate
      );
      scrollDownDiv.current.removeEventListener(
        "mouseout",
        postDivScrollDownDeactivate
      );

      scrollUpDiv.current.removeEventListener(
        "mouseover",
        postDivScrollUpActivate
      );
      scrollUpDiv.current.removeEventListener(
        "mouseout",
        postdivScrollUpDeactivate
      );
    };
  });

  const handlePostDelBtn = async (e) => {
    const profileWallPostDelStatus = await ProfilePostDel(
      e,
      profileWall,
      setProfileWall
    );
    if (profileWallPostDelStatus) PostDelAPI(e, props.signedInUser);
  };

  const renderProfileWall = Array.isArray(profileWall.posts)
    ? profileWall.posts.length === 0
      ? "Nothing to render"
      : profileWall.posts.map((e, i) => {
          return (
            <div className="profile-posts-post" key={i}>
              <div className="profile-posts-post-content">{e.post_content}</div>
              <div className="profile-posts-post-info">
                <div className="profile-posts-post-author">
                  {e.posted_user.user_name}
                </div>

                <div className="profile-posts-post-date-posted">
                  {e.dated_posted_formatted}
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
      <div
        className={"profile-posts-scrollUp blink cursor-pointer" + scroll}
        ref={scrollUpDiv}
      >
        ︽
      </div>
      <div className="profile-posts-hideBar">
        <div className="profile-posts-posts" ref={postsDiv}>
          {renderProfileWall}
        </div>
      </div>
      <div
        className={"profile-posts-scrollDown blink2 cursor-pointer" + scroll}
        ref={scrollDownDiv}
      >
        ︾
      </div>
    </div>
  );
}

export default MyWall;
