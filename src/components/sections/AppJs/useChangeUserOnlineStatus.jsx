import { useEffect, useState } from "react";

function useChangeUserOnlineStatus(props) {
  useEffect(() => {
    if (props.signedInUser) {
      if (props.signedInUser.online === "false") {
        if (props.socket) {
          console.log("In useChangeUserOnlineStatus");
          let socketId;
          props.socket.on("connect", () => {
            socketId = props.socket.id;
            console.log(socketId);
            const options = {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ socketId: socketId }),
            };
            fetch(
              `${import.meta.env.VITE_API}users/userOnline/${
                props.signedInUser.id
              }`,
              options
            )
              .then((res) => res.json())
              .then((res) => console.log(res));
          });
        }
      }
    }
  });
}

export default useChangeUserOnlineStatus;
