import { useState } from "react";
import SignInPage from "./components/pages/SignInPage";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <SignInPage />;
}

export default App;
