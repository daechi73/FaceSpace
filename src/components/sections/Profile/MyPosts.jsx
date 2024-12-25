import { react, useState, useEffect, useRef } from "react";
import ProfilePostDel from "./ProfilePostDelAPI";
import PostDelAPI from "../../global/Post/PostDelApi";
import "./MyPosts.css";

function MyPosts(props) {
  const [posts, setPosts] = useState([]);
  const [resetMyPosts, setResetMyPosts] = useState(0);
  const [scroll, setScroll] = useState("");

  const postsDiv = useRef();
  const scrollUpDiv = useRef();
  const scrollDownDiv = useRef();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}posts/${props.posted_userId}/userPosts`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "Success") {
          console.log(res);
          setPosts(res.posts);
        }
      });
  }, [resetMyPosts]);

  const handlePostDelBtn = async (e) => {
    const success = await PostDelAPI(e, props.signedInUser);
    if (success) setResetMyPosts(resetMyPosts + 1);
  };

  useEffect(() => {
    //hides/shows scrollDown/Up arrows
    if (postsDiv.current) {
      console.log(postsDiv.current.scrollHeight);
      if (postsDiv.current.scrollHeight > 267) {
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

  const renderPosts =
    posts.length !== 0
      ? posts.map((e, i) => {
          return (
            <div className="profile-myPosts-post" key={i}>
              <div className="profile-myPosts-post-content">
                {e.post_content}
              </div>
              <div className="profile-myPosts-post-info">
                <div className="profile-myPosts-post-author">
                  {e.posted_user.user_name}
                </div>

                <div className="profile-posts-post-date">
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
      : "You made no posts";
  return (
    <div className="profile-myPosts">
      <div className="profile-myPosts-title">My Posts</div>
      <div
        className={"profile-myPosts-scrollUp blink cursor-pointer" + scroll}
        ref={scrollUpDiv}
      >
        ︽
      </div>
      <div className="profile-myPosts-hidebar">
        <div className="profile-myPosts-posts" ref={postsDiv}>
          {renderPosts}
        </div>
      </div>
      <div
        className={"profile-myPosts-scrollDown blink2 cursor-pointer" + scroll}
        ref={scrollDownDiv}
      >
        ︾
      </div>
    </div>
  );
}

export default MyPosts;
