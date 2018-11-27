import React from "react";
import "../CSS/App.scss";
import Header from "./Header";
import Map from "./Map";
import "./utils/api";

export class Container extends React.Component {
 /* Main File to hold in all the components */
  
  render() {
    return (
      <main>
        <Header />
        <Map />
      </main>
    );
  }
}
