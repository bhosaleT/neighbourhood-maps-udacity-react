import React from 'react';

export default class LocationList extends React.Component{
    render(){
        return(
            <div className="location-list">
                <ul>
                    {
                        this.props.locations.map(location => (
                            <li className="location-list__item" key={location.venue.name}>{location.venue.name}</li>
                        ))
                    }
                </ul>
                  <div className="legal">
                   &copy;2018 by Tejas Bhosale.
                  </div>
            </div>
           
          
        )
    }
}