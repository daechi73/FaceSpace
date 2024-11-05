import React from "react";
import "./Posts.css";
import PostDelAPI from "../../../global/Post/PostDelApi";
import { useState, useEffect, useRef } from "react";

function Posts(props) {
  const [posts, setPosts] = useState();
  const [post, setPost] = useState();
  const [resetPosts, setResetPost] = useState(0);
  const [scroll, setScroll] = useState("");

  const postsDiv = useRef();
  const scrollUpDiv = useRef();
  const scrollDownDiv = useRef();

  useEffect(() => {
    fetch("https://facespace-backend.netlify.app/api/posts", { mode: "cors" })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "failed") {
          console.log(res);
          setPosts(res.msg);
        } else {
          console.log("LandingPage resetting post useEffect");
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
    fetch("https://facespace-backend.netlify.app/api/posts/postMain", options)
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
  const handlePostDelBtn = async (e) => {
    const postDeleted = await PostDelAPI(e, props.signedInUser);
    if (postDeleted) {
      console.log("LandingPage posts updating..");
      setResetPost(resetPosts + 1);
    }
  };

  const renderPosts = Array.isArray(posts)
    ? posts.map((e, i) => {
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
              {props.signedInUser.user_name === e.posted_user.user_name ? (
                <div
                  className="landingPage-posts-posts-post-delBtn"
                  id={e._id}
                  onClick={handlePostDelBtn}
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
    : posts;

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
      if (
        postsDiv.current &&
        scrollUpDiv.current &&
        postsDiv.current &&
        scrollDownDiv.current
      ) {
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
      }
    };
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
      <div
        className={"landingPage-posts-scrollUp blink cursor-pointer" + scroll}
        ref={scrollUpDiv}
      >
        ︽
      </div>
      <div className="landingPage-posts-posts" ref={postsDiv}>
        {renderPosts}
      </div>
      <div
        className={
          "landingPage-posts-scrollDown blink2 cursor-pointer" + scroll
        }
        ref={scrollDownDiv}
      >
        ︾
      </div>
      <div className="landingPage-posts-borderLeft"></div>
      <div className="landingPage-posts-borderRight"></div>
    </div>
  );
}

export default Posts;
