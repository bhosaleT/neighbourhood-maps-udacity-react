import axios from "axios";

export default {
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
