const GetChatbox = async (chatUsers) => {
  fetch(
    `http://localhost:3000/users/getChatbox/${chatUsers[0]}/${chatUsers[1]}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("here in getChatboxs");
      if (res.status === "success") return res;
    });
};

export default GetChatbox;
