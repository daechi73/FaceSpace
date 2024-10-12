import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SignInPage from "./components/pages/SignInPage.jsx";
import SignUpPage from "./components/pages/SignUpPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "FaceSpace/",
    element: <App />,
  },
  {
    path: "FaceSpace/:url",
    element: <App />,
  },
  // { path: "/sign_up", element: <SignUpPage /> },
  // { path: "/home", element: <App /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
