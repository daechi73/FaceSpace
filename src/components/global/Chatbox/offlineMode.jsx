import MessageApi from "./MessageApi";
import ChatboxApi from "./ChatboxApi";
import AddChatboxToUser from "./AddChatboxToUser";

//props.chatUsers, setMsgs, props.resetChatSystem, props.setResetChatSystem
const offlineMode = async (props) => {
  const req = {
    sender: props.chatUsers[0],
    receiver: props.chatUsers[1],
    msg: props.msg,
  };

  const createMessage = await MessageApi(req);
  let chatbox;
  createMessage.status === "success"
    ? (chatbox = await ChatboxApi(createMessage.message))
    : console.log(createMessage.msg);
  if (chatbox.method === "created") {
    const response = await AddChatboxToUser(
      chatbox.chatbox,
      props.chatUsers[0]
    );
    // props.setSignedInUser(response.user);
    props.setMsgs(response.chatbox.messages);
    // console.log(response.chatbox);
  } else {
    //const getUpdatedUser = GetUpdatedUser(props.chatUsers[0]);
    // props.setSignedInUser(getUpdatedUser.user);
    // console.log("finalStage");
    // console.log(chatbox.chatbox.messages);
    props.setMsgs(chatbox.chatbox.messages);
  }
  props.setMsg("");
  const resetChatSystem = (resetChatSystem, setResetChatSystem) => {
    if (resetChatSystem === null) return setResetChatSystem(1);
    else return setResetChatSystem(resetChatSystem + 1);
  };
  resetChatSystem(props.resetChatSystem, props.setResetChatSystem);
};

export default offlineMode;
