import React from "react";

export default class LocationList extends React.Component {
  constructor(props) {
    super(props);

    this.showOptions = this.showOptions.bind(this);
  }

  state = {
    searchInput: "",
    locations: [],
    showingOptions: false
  };

  /* HANDLE CHANGE 
  -- HANDLING THE INPUT CHANGE TO FILTER LOCATIONS LIST.
  -- setting the marker visible and invisible based on the filtering list.
  -- Adding the new list to the locations state.
  */

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

  /* Changing the text of the Show/Hide buttons and triggering the visibility of the options list. */
  showOptions() {
    this.setState(
      {
        showingOptions: !this.state.showingOptions,
        locations: this.props.allLocations
      },
      this.showSideBar
    );

    // sideBar.style.display === "none"
    //   ? (sideBar.style.display = "block")
    //   : (sideBar.style.display = "none");
  }

  showSideBar() {
    const sideBar = document.querySelector(".location-list");
    if (this.state.showingOptions === true) {
      sideBar.style.left = "0";
    } else {
      sideBar.style.left = "-700px";
    }
  }

  render() {
    return (
      <div className="list">
        <button className="button" onClick={this.showOptions}>
          {" "}
          {this.state.showingOptions ? "Hide Options " : "Show Options"}{" "}
        </button>{" "}
        <div className="location-list">
          <input
            className="location-list__input"
            placeholder="Search Location"
            onChange={this.handleChange}
            value={this.state.searchInput}
            type="text"
          />
          <ul>
            {" "}
            {this.state.locations.map(location => (
              <li
                onClick={this.props.openInfoWindow.bind(this, location)}
                className="location-list__item"
                key={location.venue.name}
              >
                {location.venue.name}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>{" "}
      </div>
    );
  }
}
