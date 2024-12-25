import { useState, useEffect } from "react";

const useRemoveChatboxNewMessage = (props) => {
  const [res, setRes] = useState(null);
  console.log("IN useremovechatboxnewmessage");
  useEffect(() => {
    if (props.chatboxId !== null) {
      const options = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empty_message: "" }),
      };
      fetch(
        `${import.meta.env.VITE_API}chatboxes/${
          props.chatboxId
        }/update/new_message`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          setRes(res);
        });
    }
  }, [props.chatboxId]);

  return res;
};

export default useRemoveChatboxNewMessage;
