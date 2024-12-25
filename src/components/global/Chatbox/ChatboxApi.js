const ChatboxApi = async (message) => {
  console.log("here in chatboxapi");
  let response;
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }),
  };
  return fetch(`${import.meta.env.VITE_API}chatboxes/add_messages`, options)
    .then((res) => res.json())
    .then((res) => {
      return (response = res);
    });
};

export default ChatboxApi;
