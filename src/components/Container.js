import React from "react";
import Header from "./Header";
import {GoogleApiWrapper} from 'google-maps-react';
import {Map} from './Map';
import "../CSS/App.scss";

export class Container extends React.Component {
  render() {
      const style= {
          width: '100vw',
          height: '100vh'
      }
    return (
      <div>
        <Header />
        <div style={style}>
        <Map google={this.props.google}/>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCgByDyHejXcnEYiAohk2kMYN0npMXsJTc'
})(Container)