import React from "react";
import Header from "./Header";
import "../CSS/App.scss";

export class Container extends React.Component {
  render() {
    return (
      <div>
        <Header />
        this is the map container the map goes here.
      </div>
    );
  }
}
