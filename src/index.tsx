import * as React from "react";
import { render } from "react-dom";

import Carousel from "./components/Carousel";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Carousel
        label="Images from Unsplash"
        items={[
          {
            id: "a",
            description: "first description",
            imageURL: "https://images.unsplash.com/photo-1569910233753-e699ad04f124?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixlib=rb-1.2.1&q=80&w=800"
          },
          {
            id: "b",
            description: "second description",
            imageURL: "https://images.unsplash.com/photo-1569834381406-2aaca6e03b29?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixlib=rb-1.2.1&q=80&w=800"
          },
          {
            id: "c",
            description: "third description",
            imageURL: "https://images.unsplash.com/photo-1570613856979-5b4ee86535a1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixlib=rb-1.2.1&q=80&w=800"
          }
        ]}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
