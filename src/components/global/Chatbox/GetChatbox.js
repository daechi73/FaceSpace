const GetChatbox = async (chatUsers) => {
  fetch(
    `https://facespace-backend.netlify.app/api/users/getChatbox/${chatUsers[0]}/${chatUsers[1]}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("here in getChatboxs");
      if (res.status === "success") return res;
    });
};

export default GetChatbox;
