const GetChatbox = (chatUsers) => {
  console.log(chatUsers);
  fetch(
    `http://localhost:3000/users/getChatbox/${chatUsers[0]}/${chatUsers[1]}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("here in getChatboxs");
      console.log(res);
    });
};

export default GetChatbox;
