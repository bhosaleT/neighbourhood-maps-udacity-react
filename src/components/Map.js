import React from "react";
import markerImageBasic from "../images/marker.png";
import markerImageHotel from "../images/hotel-small.png";
import markerImageTheater from "../images/theater.png";
import markerImageBakery from "../images/bakery.png";
import markerImageScenic from "../images/photo.png";
import markerImageRestro from "../images/restro-small.png";
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

  loadMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCgByDyHejXcnEYiAohk2kMYN0npMXsJTc&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    var self = this;

    var styles = [
      {
        featureType: "landscape",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        stylers: [
          {
            hue: "#00aaff"
          },
          {
            saturation: -100
          },
          {
            gamma: 2.15
          },
          {
            lightness: 12
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "on"
          },
          {
            lightness: 24
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            lightness: 57
          }
        ]
      }
    ];

    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 19.0,
        lng: 72.8424
      },
      zoom: 13,
      styles: styles,
      disableDefaultUI: true,
      // gestureHandling: "greedy",
      mapTypeControl: false
    });

    window.google.maps.event.addListener(map, "click", function() {
      self.closeInfoWindow();
    });

    var infowindow = new window.google.maps.InfoWindow({});

    this.setState({
      map: map,
      infowindow: infowindow
    });

    var allLocations = [];
    this.state.locations.forEach(location => {
      this.selectMarker(location.venue.categories[0].name);

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

    this.setState({
      locations: allLocations
    });
  };

  openInfoWindow(location) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, location.marker);
    this.state.infowindow.setContent("Looking Up . . . ");
    this.getWindowData(location);
  }

  closeInfoWindow() {
    this.state.infowindow.close();
  }

  getWindowData(location) {
    var self = this;
    var venueId = location.venue.id;
    api.getLocationDetails(venueId).then(response => {
      var reply = response;
      self.state.infowindow.setContent(reply);
    });
  }

  render() {
    return <div className="body-content">
        <LocationList closeInfoWindow={this.closeInfoWindow} openInfoWindow={this.openInfoWindow} allLocations={this.state.locations} />
        <div className="map-container">
          <div className="body-content__map" id="map" />
        </div>
      </div>;
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
