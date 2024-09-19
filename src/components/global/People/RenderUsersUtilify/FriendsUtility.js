const FriendsUtility = () => {
  const findFriendReq = (user, signedInUser) => {
    for (let i = 0; i < signedInUser.friend_requests.length; i++) {
      if (signedInUser.friend_requests[i].outbound._id === user._id) {
        return signedInUser.friend_requests[i];
      }
    }
  };
  const deleteFriendReqFromDb = (friendReq, signedInUser) => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signedInUserId: signedInUser.id }),
    };
    fetch(
      `http://localhost:3000/friendRequests/${friendReq.id}/delete`,
      options
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  const addFriends = (friendReq, signedInUser, setSignedInUser) => {
    const options = {
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        friendReq: friendReq,
      }),
    };
    fetch(
      `http://localhost:3000/users/${signedInUser._id}/update/addFriend`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          console.log(res);
          deleteFriendReqFromDb(friendReq, signedInUser);
          setSignedInUser(res.user);
        }
      });
  };
  const declineFriendReq = (friendReq, signedInUser, setSignedInUser) => {
    const options = {
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ friendReq: friendReq }),
    };
    fetch(
      `http://localhost:3000/users/${signedInUser._id}/update/declineFriendReq`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        deleteFriendReqFromDb(friendReq, signedInUser);
        setSignedInUser(res.user);
      });
  };

  return { addFriends, findFriendReq, declineFriendReq };
};

export default FriendsUtility;
