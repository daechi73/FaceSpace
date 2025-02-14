const AddChatboxToUser = async (chatbox, signedInUser) => {
  console.log("Here in AddChaTBoxToUser");
  let response;
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatbox: chatbox }),
  };
  return fetch(
    `${import.meta.env.VITE_API}users/${signedInUser}/update/addChatbox`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("here in addchatboxtouser");
      return (response = res);
    });
};

export default AddChatboxToUser;
