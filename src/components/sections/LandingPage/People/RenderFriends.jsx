import React from "react";

function RenderFriends(props) {
  const renderFriends =
    props.signedInUser.friends.length === 0 ? (
      <div className="landingPage-people-friends">"You have no friends"</div>
    ) : (
      props.signedInUser.friends.map((e, i) => {
        return (
          <div className="landingPage-people-friends" key={i}>
            {e.user_name}
          </div>
        );
      })
    );
  return <>{renderFriends}</>;
}

export default RenderFriends;
