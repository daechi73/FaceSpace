import { useState, useEffect } from "react";

const userGetChatUsers = (signedInUserId) => {
  const [users, setUsers] = useState([]);
  let chatboxes;
  useEffect(() => {
    fetch(`http://localhost:3000/users/${signedInUserId}`)
      .then((res) => res.json())
      .then((res) => {
        chatboxes = res.user.chatbox;
        const tempUsers = [];
        chatboxes.forEach((e) => {
          tempUsers.push(e.users[1]);
          setUsers(tempUsers);
        });
      });
  }, []);
  return users;
};

export default userGetChatUsers;
