import { useState, useEffect } from "react";

//props.chatbox, props.chatUsers, props.signedInUser,
// setMsgs, setChatboxId,

function useGetChatbox(props) {
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API}users/getChatbox/${props.chatUsers[0]}/${
        props.chatUsers[1]
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("here in chatbox fetch");
        if (res.status === "success") {
          props.setMsgs(res.chatbox.messages);
          //resets changes in chatboxID will change said chatbox's new_message into ""
          if (
            res.chatbox.new_message !== "" &&
            res.chatbox.new_message !== props.signedInUser.user_name
          ) {
            props.setChatboxId(res.chatbox._id);
          }
          //console.log(res.chatbox.messages[res.chatbox.messages.length - 1]);
        } else props.setMsgs([]);
      });
    //chatbox state will update when
  }, [props.chatbox]);
}
export default useGetChatbox;
