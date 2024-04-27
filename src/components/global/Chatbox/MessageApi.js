const MessageApi = async (req) => {
  console.log("here in Messageapi");
  let response;
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  };
  return fetch("http://localhost:3000/messages/create", options)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success") {
        response = res;
        return response;
      }
    });
};

export default MessageApi;
