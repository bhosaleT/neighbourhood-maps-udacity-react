import React from "react";
import "../CSS/App.scss";
import Header from "./Header";

export class Container extends React.Component {
  componentDidMount() {
    this.loadMap();
  }

  /* This function calls the load script function which will add the script tag to the html file which in turn will draw the map. */
  loadMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgByDyHejXcnEYiAohk2kMYN0npMXsJTc&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  /* 
        //////// INITIALISE MAP ////////////
        ** creating a new variable map which will be added to the place where we want our map module to show up.
        ** here we will add the latitude and longitude of where we want the map to focus on.
  */
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 19.076, lng: 72.8777 },
      zoom: 12
    });
  };

  render() {
    return (
      <main>
        <Header />
        <div id="map" />
      </main>
    );
  }
}

/* 
 <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCgByDyHejXcnEYiAohk2kMYN0npMXsJTc&callback=initMap"
    async defer></script
*/

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
