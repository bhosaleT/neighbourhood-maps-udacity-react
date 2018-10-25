import React from "react";

export default class LocationList extends React.Component {
  state = {
      searchInput: ''
  }

  handleChange = (event) => {
      this.setState({
          searchInput: event.target.value.trim()
      })
      this.props.filterLocations(this.state.searchInput);
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
          {this.props.locations.map(location => (
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
