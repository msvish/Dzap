import React from "react";

import CenteredForm from "./Components/Form/Form";

import "./App.css";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <CenteredForm />
    </div>
  );
}

export default App;
