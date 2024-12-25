const MessageApi = async (req) => {
  console.log("here in Messageapi");
  const options = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  };
  return fetch(`${import.meta.env.VITE_API}messages/create`, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success") {
        return res;
      }
    });
};

export default MessageApi;
