import { react, useState, useEffect } from "react";
import ProfilePostDel from "./ProfilePostDelAPI";
import PostDelAPI from "../../global/Post/PostDelApi";
import "./MyPosts.css";

function MyPosts(props) {
  const [posts, setPosts] = useState([]);
  const [resetMyPosts, setResetMyPosts] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${props.posted_userId}/userPosts`)
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
      <div className="profile-myPosts-posts">{renderPosts}</div>
    </div>
  );
}

export default MyPosts;
