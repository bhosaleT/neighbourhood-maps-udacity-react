import React from "react";
import ReactDOM from "react-dom";

export class Map extends React.Component {
  constructor(props){
    this.map = React.createRef();
  }
  componentDidMount() {
    this.loadMap();
  }
  loadMap() {
    //loading the map.
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      this.map = new maps.Map(node, mapConfig);
    }
  }
  render() {
    return <div ref={this.map}>Loading Map......</div>;
  }
}
