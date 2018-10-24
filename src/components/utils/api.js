import axios from 'axios';

export default {
    discoverLocations() {
        const discoverURL = 'https://api.foursquare.com/v2/venues/explore?';
        const discoverParams = {
            client_id: "KMDK0FOEEB5PV5MJSBM0L2IWM5TP0G45415PQZT1SWOMLBXA",
            client_secret: "NW5R1KYT0OUMOKZ1H3M0KYQTA5JRYBAX4GENMV3XBX3GTQFK",
            near: "Mumbai",
            limit: "10",
            venuPhotos:"1",
            v:"20181020" 
        }

        return axios.get(discoverURL + new URLSearchParams(discoverParams))
        .then(response => {
            return response.data.response.groups[0].items;
        })
        .catch(error => {
           return `Something went wrong ` + error;
        })
    }
}