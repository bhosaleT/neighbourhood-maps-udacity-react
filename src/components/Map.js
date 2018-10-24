import React from "react";

export default class Map extends React.Component {
  componentDidMount() {
    this.loadMap();
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
        stylers: [
          {
            color: "#d3d3d3"
          }
        ]
      },
      {
        featureType: "transit",
        stylers: [
          {
            color: "#808080"
          },
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#b3b3b3"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#ffffff"
          },
          {
            weight: 1.8
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#d7d7d7"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#ebebeb"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            color: "#a7a7a7"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#efefef"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#696969"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "on"
          },
          {
            color: "#737373"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.icon",
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
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#d6d6d6"
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
      {},
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#dadada"
          }
        ]
      }
    ];

    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 19.076, lng: 72.8777 },
      zoom: 12,
      styles: styles,
      disableDefaultUI: true
    });
    
    // const markerImage = "../images/marker.png ";
    var marker = new window.google.maps.Marker({
        position:{ lat: 19.076, lng: 72.8777 },
        map: map,
        // icon: markerImage,
        animation: window.google.maps.Animation.DROP,
        title: 'Hello World'
    })
  };

  render() {
    return <div id="map" />;
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
