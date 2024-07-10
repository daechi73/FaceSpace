import { useState, useEffect } from "react";

const useRemoveChatboxNewMessage = (props) => {
  const [res, setRes] = useState(null);
  console.log("IN useremovechatboxnewmessage");
  console.log(props.chatboxId);
  useEffect(() => {
    if (props.chatboxId !== null) {
      const options = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empty_message: "" }),
      };
      console.log("in if statement in useremovechatboxnewmessage");
      fetch(
        `http://localhost:3000/chatboxes/${props.chatboxId}/update/new_message`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("here in useremovechatboxnewmessage .then");
          console.log(res);
          setRes(res);
        });
    }
  }, [props.chatboxId]);

  return res;
};

export default useRemoveChatboxNewMessage;
