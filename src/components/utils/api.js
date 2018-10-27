import axios from "axios";

export default {
  discoverLocations() {
    const discoverURL = "https://api.foursquare.com/v2/venues/explore?";
    const discoverParams = {
      client_id: "KMDK0FOEEB5PV5MJSBM0L2IWM5TP0G45415PQZT1SWOMLBXA",
      client_secret: "5HN5WGHUHAMYR5EPUD3G3XPNBAQ0FJITLHRWJI3DPFWO4DCK",
      near: "Mumbai",
      limit: "15",
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
      client_id: "KMDK0FOEEB5PV5MJSBM0L2IWM5TP0G45415PQZT1SWOMLBXA",
      client_secret: "5HN5WGHUHAMYR5EPUD3G3XPNBAQ0FJITLHRWJI3DPFWO4DCK",
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
