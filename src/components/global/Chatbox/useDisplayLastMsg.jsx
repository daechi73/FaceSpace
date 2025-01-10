import { useEffect } from "react";

function useDisplayLastMsg(props) {
  useEffect(() => {
    if (props.displayRef.current) {
      console.log("In useDIsplayLastMsg");
      props.displayRef.current.scrollTo(
        0,
        props.displayRef.current.scrollHeight
      );
    }
  });
}

export default useDisplayLastMsg;
