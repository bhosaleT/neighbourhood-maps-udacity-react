import React from "react";
import markerImageBasic from "../images/location2.svg";
import markerImageHotel from "../images/office.svg";
import markerImageTheater from "../images/video-camera.svg";
import markerImageBakery from "../images/pie-chart.svg";
import markerImageScenic from "../images/camera.svg";
import markerImageRestro from "../images/spoon-knife.svg";
import api from "./utils/api";

import LocationList from "./LocationList";

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.closeInfoWindow = this.closeInfoWindow.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.initMap = this.initMap.bind(this);
  }
  state = {
    locations: [],
    markerImage: null,
    map: "",
    infowindow: ""
  };

  /* 
  -- calling the FOURSQUARE API to  get thelocations.
  -- set state the locations
  */

  componentDidMount() {
    api.discoverLocations().then(locations => {
      this.setState(
        {
          locations: locations
        },
        this.loadMap()
      );
    });
  }

  /* SELECT MARKER
  -- Showing different markers for different type of markers.
  */

  selectMarker(currentLocationType) {
    if (currentLocationType === "Hotel") {
      this.setState({
        markerImage: markerImageHotel
      });
    } else if (currentLocationType === "Theater") {
      this.setState({
        markerImage: markerImageTheater
      });
    } else if (currentLocationType === "Bakery") {
      this.setState({
        markerImage: markerImageBakery
      });
    } else if (currentLocationType === "Scenic Lookout") {
      this.setState({
        markerImage: markerImageScenic
      });
    } else if (
      currentLocationType === "Coffee Shop" ||
      "American Restaurant" ||
      "Fast Food Restaurant"
    ) {
      this.setState({
        markerImage: markerImageRestro
      });
    } else {
      this.setState({
        markerImage: markerImageBasic
      });
    }
  }
  /* 
  -- Loading the map and initialising it.
*/
  loadMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgByDyHejXcnEYiAohk2kMYN0npMXsJTc&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  /* 
  -- Creating the MAP.
  */
  initMap = () => {
    var self = this;
    /* Light Grey style for the map obtained from snazzy maps. */
    var styles = [{ featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] }, { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] }, { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }] }, { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] }, { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] }, { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 21 }] }, { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] }, { elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }] }, { elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#CB4C51" }, { lightness: 40 }] }, { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] }, { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#fefefe" }, { lightness: 20 }] }, { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }] }];
    /* setting up the map */
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 19.0,
        lng: 72.8424
      },
      zoom: 12,
      styles: styles,
      disableDefaultUI: true
      // gestureHandling: "greedy",
      // mapTypeControl: false
    });

    window.google.maps.event.addListener(map, "click", function() {
      self.closeInfoWindow();
    });

    /* Initialising the infoWindow */
    var infowindow = new window.google.maps.InfoWindow({});

    this.setState({
      map: map,
      infowindow: infowindow
    });

    var allLocations = [];
    this.state.locations.forEach(location => {
      this.selectMarker(location.venue.categories[0].name);
      /* Creating the marker
       -- adding .marker and .display to location element
       -- adding an event listener to the marker.
       */
      var marker = new window.google.maps.Marker({
        position: {
          lat: location.venue.location.lat,
          lng: location.venue.location.lng
        },
        map: map,
        icon: this.state.markerImage,
        animation: window.google.maps.Animation.DROP,
        title: location.venue.name
      });
      location.marker = marker;
      location.display = true;

      marker.addListener("click", function() {
        self.openInfoWindow(location);
      });

      allLocations.push(location);
    });
    /* Readding the locations list to the state with marker information added to it. */
    this.setState({
      locations: allLocations
    });
  };

  /* 
  -- The openInfoWindow takes in the location element.
  -- From it we call the getWindowData which will call our foursquare API and get venue details.
  */
  openInfoWindow(location) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, location.marker);
    this.state.infowindow.setContent("Looking Up . . . ");
    this.getWindowData(location);
  }

  closeInfoWindow() {
    this.state.infowindow.close();
  }

  /* GET WINDOW DATA
   -- Call the API using venue.id .
   -- Formatting the data in the form I want it to be shown.
  */
  getWindowData(location) {
    var self = this;
    var venueId = location.venue.id;
    api.getLocationDetails(venueId).then(response => {
      var number;
      if (response.contact.formattedPhone !== undefined) {
        number = response.contact.formattedPhone;
      } else {
        number = "Number not provided";
      }
      var prefix = response.bestPhoto.prefix;
      var suffix = response.bestPhoto.suffix;
      var imgSrc = `${prefix}100x100${suffix}`;
      var reply = `<div id="iw-container">
      <h2 class="iw-title">${response.name}</h2>
      <div class="iw-content">
      <h4 class="iw-subTitle">Visit:</h4>
      <img src=${imgSrc}>
      <a href=${response.canonicalUrl}>${response.name}</a>
       <h4 class="iw-subTitle">Contacts:</h4>
      <p>${response.location.formattedAddress[0]}</p>
      <p>${response.location.formattedAddress[1]}</p>
      <p>${response.location.formattedAddress[2]}</p>
      <p>${response.location.formattedAddress[3]}</p>
      <p>${number}</p>
        <h4 class="iw-subTitle">Rating:</h4>
      <p>Rating: ${response.rating} </p>
      </div>
      </div>`;
      self.state.infowindow.setContent(reply);
    });
  }

  render() {
    return (
      <div className="body-content">
        <LocationList
          closeInfoWindow={this.closeInfoWindow}
          openInfoWindow={this.openInfoWindow}
          allLocations={this.state.locations}
        />{" "}
        <div className="map-container">
          <div className="body-content__map" id="map" />
        </div>{" "}
      </div>
    );
  }
}

/* LOADSCRIPT
-- Add the map script to html.
*/

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
