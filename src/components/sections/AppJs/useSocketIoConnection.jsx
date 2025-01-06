import { io } from "socket.io-client";
import { useState, useEffect } from "react";

function useSocketIoConnection() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let socketInstance;
    if (!socket) {
      socketInstance = io.connect("http://localhost:3000");
      setSocket(socketInstance);
      socketInstance.on("connect", () => {
        console.log(`Connected to a server socket ${socketInstance.id}`);
      });
      // socketInstance.on("testing", (data) => {
      //   alert(data);
      // });
    }

    return () => {
      if (socketInstance !== undefined) socketInstance.disconnect();
    };
  }, []);

  return socket;
}

export default useSocketIoConnection;
