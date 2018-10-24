import React from 'react';

export default class LocationList extends React.Component{
    render(){
        return(
            <ul>
                {
                    this.props.locations.map(location => (
                        <li>{location.venue.name}</li>
                    ))
                }
            </ul>
          
        )
    }
}