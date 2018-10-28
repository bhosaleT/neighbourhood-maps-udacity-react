import axios from "axios";

export default {
  /* 
  -- This function will call on the FourSquare API to get venues and return them 
  -- The location and the amount of venues you want is provided through params. 
  */
  discoverLocations() {
    const discoverURL = "https://api.foursquare.com/v2/venues/explore?";
    const discoverParams = {
      client_id: "1LRTD1LJXLOI2LCU4FCEVD5RVNJB3MY4OUKRGXYKUYDTR501",
      client_secret: "5JRAY0SYRZMPSVXTDLW0OHUIVW4MB0GKXF25SA22LCKTMZ0S",
      near: "Mumbai",
      limit: "12",
      v: "20181020"
    };

    return axios
      .get(discoverURL + new URLSearchParams(discoverParams))
      .then(response => {
        return response.data.response.groups[0].items;
      })
      .catch(error => {
        return `Something went wrong ` + error;
      });
  },
  /* 
  -- This function will call the foursquare API to get venue details for one particular location.
  -- The only params required are the location venue_id this id is captured from the discoverLocations venue_id.
  */
  getLocationDetails(venueId) {
    const locationDetailsURL = `https://api.foursquare.com/v2/venues/${venueId}?`;
    const detailsParams = {
      client_id: "1LRTD1LJXLOI2LCU4FCEVD5RVNJB3MY4OUKRGXYKUYDTR501",
      client_secret: "5JRAY0SYRZMPSVXTDLW0OHUIVW4MB0GKXF25SA22LCKTMZ0S",
      v: "20181027",
      limit: "1"
    };

    return axios
      .get(locationDetailsURL + new URLSearchParams(detailsParams))
      .then(response => {
        return response.data.response.venue;
      })
      .catch(error => {
        return `Something went wrong ` + error;
      });
  }
};
