const ChatboxApi = (message) => {
  let response;
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }),
  };
  return fetch("http://localhost:3000/chatboxes/add_messages", options)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return (response = res);
    });
};

export default ChatboxApi;
