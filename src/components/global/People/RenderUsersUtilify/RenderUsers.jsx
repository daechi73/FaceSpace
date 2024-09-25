import React from "react";
import FriendsUtility from "./FriendsUtility";
import RenderUserClickMenu from "../../UserClickMenu/RenderUserClickMenu";
import UserMenu from "../../UserClickMenu/UserMenu";

//props: people, signedInUser, setSignedInUser,
//       setUserProfile,showMenu,setShowMenuUsername,showMenuUsername
//       chatbox, setChatbox, chatUsers, setChatUsers

function RenderUsers(props) {
  console.log("Here In RenderUsers");

  const handleUsernameClick = (e) => {
    UserMenu(
      props.showMenu,
      props.setShowMenu,
      props.setShowMenuUsername,
      e.target.innerText
    );
  };

  const renderUsers = props.people.map((e, i) => {
    const friendReq = () => {
      const options = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toAddUserId: e._id }),
      };
      fetch(
        `http://localhost:3000/users/${props.user._id}/update/addFriendReq`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("In renderUSers add friend");
          props.setSignedInUser(res.user);
        });
    };

    const handleAcceptFReq = () => {
      FriendsUtility().addFriends(
        FriendsUtility().findFriendReq(e, props.user),
        props.user,
        props.setSignedInUser
      );
    };
    const handleDeclineFReq = () => {
      FriendsUtility().declineFriendReq(
        FriendsUtility().findFriendReq(e, props.user),
        props.user,
        props.setSignedInUser
      );
    };
    const filterInOutFReq = () => {
      for (let j = 0; j < props.user.friend_requests.length; j++) {
        if (props.user.friend_requests[j].inbound._id === e._id) {
          return "inbound";
        }
        if (props.user.friend_requests[j].outbound._id === e._id) {
          return "outbound";
        }
      }
      return false;
    };
    const checkIfFriends = () => {
      for (let j = 0; j < props.user.friends.length; j++) {
        if (props.user.friends[j]._id === e._id) return true;
      }
      return false;
    };

    return (
      <div className={props.className + "-people-user"} key={i}>
        <div className={props.className + "-people-user-user"}>
          {/* <ProfileLink
            username={e.user_name}
            setUserProfile={props.setUserProfile}
          /> */}
          <div
            className={props.className + "-people-user-user-username"}
            onClick={handleUsernameClick}
          >
            {e.user_name}
          </div>
        </div>
        {filterInOutFReq() === "inbound" ? (
          <div className={props.className + "-people-people-user-status"}>
            Waiting for response
          </div>
        ) : filterInOutFReq() === "outbound" ? (
          <div className={props.className + "-people-people-user-status"}>
            <div
              className={
                props.className + "-people-people-user-status-acceptBtn"
              }
              onClick={handleAcceptFReq}
            >
              Accept
            </div>
            <div
              className={
                props.className + "-people-people-user-status-declineBtn"
              }
              onClick={handleDeclineFReq}
            >
              Decline
            </div>
          </div>
        ) : checkIfFriends() ? (
          <div
            className={props.className + "-people-people-user-alreadyFriends"}
          >
            friends
          </div>
        ) : (
          <div
            className={props.className + "-people-people-user-addBtn"}
            onClick={friendReq}
          >
            +
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={props.className + "-people-people-user-container"}>
      <div className={props.className + "-people-people-user-title"}>Users</div>
      {renderUsers}
      {props.showMenu ? (
        <RenderUserClickMenu
          username={props.showMenuUsername}
          setUserProfile={props.setUserProfile}
          setShowMenu={props.setShowMenu}
          chatbox={props.chatbox}
          setChatbox={props.setChatbox}
          chatUsers={props.chatUsers}
          setChatUsers={props.setChatUsers}
          signedInUser={props.user}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default RenderUsers;
