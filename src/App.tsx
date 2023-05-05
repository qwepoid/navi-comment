import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CommentWidget from "./components/CommentWidget";

function App() {
  return (
    <div className="w-screen h-screen m-12">
      <CommentWidget />
    </div>
  );
}

export default App;
