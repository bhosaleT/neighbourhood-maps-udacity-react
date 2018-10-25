import React from "react";
import markerImageBasic from "../images/icon-large.png";
import markerImageHotel from "../images/hotel-large.png";
import markerImageTheater from "../images/theater-large.png";
import markerImageBakery from "../images/bakery-large.png";
import markerImageScenic from "../images/scenic-large.png";
import markerImageRestro from "../images/food.png";
import api from "./utils/api";

// import sortBy from "sort-by";
import LocationList from "./LocationList";

export default class Map extends React.Component {
  state = {
    locations: [],
    markerImage: null
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
    var styles = [
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#d3d3d3" }]
      },
      {
        featureType: "transit",
        stylers: [{ color: "#808080" }, { visibility: "off" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ visibility: "on" }, { color: "#b3b3b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }]
      },
      {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [{ visibility: "on" }, { color: "#ffffff" }, { weight: 1.8 }]
      },
      {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [{ color: "#d7d7d7" }]
      },
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [{ visibility: "on" }, { color: "#ebebeb" }]
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#a7a7a7" }]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [{ color: "#ffffff" }]
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [{ visibility: "on" }, { color: "#efefef" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#696969" }]
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ visibility: "on" }, { color: "#737373" }]
      },
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [{ color: "#d6d6d6" }]
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }]
      },
      {},
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [{ color: "#dadada" }]
      }
    ];

    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 19.0213,
        lng: 72.8424
      },
      zoom: 12,
      styles: styles,
      disableDefaultUI: true
      //   gestureHandling: 'greedy'
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
      allLocations.push(location);
    });

    this.setState({
      locations: allLocations
    });
  };

  render() {
    return (
      <div className="body-content">
        <LocationList
          allLocations={this.state.locations}
        />
        <div className="body-content__map" id="map" />
      </div>
    );
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
