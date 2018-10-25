import React from "react";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

export default class LocationList extends React.Component {
  state = {
    searchInput: ""
  };

  handleChange = event => {
    const query = event.target.value;
    this.setState({
      searchInput: query
    });
  };

  render() {
    let showingLocations;
    if (this.state.searchInput) {
      const match = new RegExp(escapeRegExp(this.state.searchInput.trim()), "i");
      showingLocations = this.props.locations.filter(location =>
        match.test(location.venue.name)
      );
    } else {
      showingLocations = this.props.locations;
    }

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
          {showingLocations.map(location => (
            <li className="location-list__item" key={location.venue.name}>
              {location.venue.name}
            </li>
          ))}
        </ul>
        <div className="legal">&copy;2018 by Tejas Bhosale.</div>
      </div>
    );
  }
}
