import React from "react";
import ProfileLink from "../../../sections/Profile/ProfileLink";

function RenderFriends(props) {
  console.log("here in RenderFriends");
  const renderFriends =
    props.user.friends.length === 0 ? (
      <div className="landingPage-people-friends">"You have no friends"</div>
    ) : (
      props.user.friends.map((e, i) => {
        return (
          <div className="landingPage-people-friends" key={i}>
            <ProfileLink
              username={e.user_name}
              setUserProfile={props.setUserProfile}
              setResetProfile={props.setResetProfile}
              linkText={e.user_name}
            />
          </div>
        );
      })
    );
  return <>{renderFriends}</>;
}

export default RenderFriends;