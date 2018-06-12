import React, { Component } from 'react';
import template from './App/App.jsx';

import styles from  './App/App.less';

export default class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         name: 'It is name'
      };
   }

   render() {
      return template(this.state);
   }
}
