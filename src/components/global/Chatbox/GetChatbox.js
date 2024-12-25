const GetChatbox = async (chatUsers) => {
  fetch(
    `${import.meta.env.VITE_API}users/getChatbox/${chatUsers[0]}/${
      chatUsers[1]
    }`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("here in getChatboxs");
      if (res.status === "success") return res;
    });
};

export default GetChatbox;
