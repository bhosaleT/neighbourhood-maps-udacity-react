import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from './components/Container.js';
import './index.css';

class Main extends React.Component {
 render(){
     return(
         <Container />
     )
 }
}

ReactDOM.render(<Main/>, document.getElementById('root') );