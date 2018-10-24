import React from "react";
import "../CSS/App.scss";
import Header from "./Header";
import Map from "./Map";
import "./utils/api";
import api from "./utils/api";

export class Container extends React.Component {
  state = {
    locations: []
  };

  componentDidMount() {
    api.discoverLocations().then(locations => {
      this.setState({
        locations
      });
    });
  }

  render() {
    return (
      <main>
        <Header />
        <Map />
      </main>
    );
  }
}
