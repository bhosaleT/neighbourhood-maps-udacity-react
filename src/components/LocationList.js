import React from "react";
import api from "./utils/api";

export default class LocationList extends React.Component {
  state = {
    searchInput: "",
    locations: []
  };

  handleChange = event => {
    const query = event.target.value.trim();

    let showingLocations = [];
    this.props.allLocations.forEach(location => {
      if (location.venue.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        showingLocations.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });

    this.setState({
      searchInput: query,
      locations: showingLocations
    });
  };

  componentWillMount() {
    api.discoverLocations().then(locations => {
      this.setState({
        locations: locations
      });
    });
  }

  render() {
    return (
      <div className="location-list">
        <input
          className="location-list__input"
          placeholder="Search Location"
          onChange={this.handleChange}
          value={this.state.searchInput}
          type="text"
        />
        <ul>
          {this.state.locations.map(location => (
            <li
              onClick={this.props.openInfoWindow.bind(this, location)}
              className="location-list__item"
              key={location.venue.name}
            >
              {location.venue.name}
            </li>
          ))}
        </ul>
        <div className="legal">&copy;2018 by Tejas Bhosale.</div>
      </div>
    );
  }
}
