import { io } from "socket.io-client";
import { useState, useEffect } from "react";

function useSocketIoConnection(props) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (props.initialSignIn) {
      console.log("In useSocketIoConnection");
      // console.log(props.initialSignIn);
      let socketInstance;
      socketInstance = io.connect("http://localhost:3000");
      setSocket(socketInstance);
      socketInstance.on("connect", () => {
        console.log(`Connected to a server socket ${socketInstance.id}`);
      });
      // socketInstance.on("testing", (data) => {
      //   alert(data);
      // });

      return () => {
        if (socketInstance !== undefined) socketInstance.disconnect();
      };
    }
  }, [props.initialSignIn]);

  return socket;
}

export default useSocketIoConnection;
