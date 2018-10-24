import React from "react";
import "../CSS/App.scss";
import Header from "./Header";
import Map from "./Map";
import "./utils/api";

export class Container extends React.Component {
 
  
  render() {
    return (
      <main>
        <Header />
        <Map />
      </main>
    );
  }
}
