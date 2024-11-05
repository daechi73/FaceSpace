import { useState, useEffect } from "react";

const userGetChatUsers = (signedInUserId, resetChatSystem) => {
  const [users, setUsers] = useState([]);
  let chatboxes;

  useEffect(() => {
    fetch(`https://facespace-backend.netlify.app/api/users/${signedInUserId}`)
      .then((res) => res.json())
      .then((res) => {
        chatboxes = res.user.chatbox;
        const tempUsers = [];

        const findOtherUser = (users) => {
          for (let i = 0; i < users.length; i++) {
            if (users[i].user_name !== res.user.user_name) {
              return users[i];
            }
          }
        };

        chatboxes.forEach((e) => {
          const otherUser = findOtherUser(e.users);
          if (res.user.user_name === e.new_message || e.new_message === "") {
            tempUsers.push({ user: otherUser, new_message: false });
          } else tempUsers.push({ user: otherUser, new_message: true });
          setUsers(tempUsers);
        });
      });
  }, [resetChatSystem]);
  return users;
};

export default userGetChatUsers;
