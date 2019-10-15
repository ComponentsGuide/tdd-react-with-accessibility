import * as React from "react";
import { render } from "react-dom";

import Carousel from "./components/Carousel";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Carousel />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
