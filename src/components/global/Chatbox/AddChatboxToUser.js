const AddChatboxToUser = (chatbox, signedInUser) => {
  let response;
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatbox: chatbox }),
  };
  return fetch(
    `http://localhost:3000/users/${signedInUser.id}/addChatbox`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      if ((res.status = "success")) {
        return (response = res);
      }
    });
};

export default AddChatboxToUser;
