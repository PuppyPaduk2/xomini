import React, { Component } from 'react';
import template from './App.template';

export default class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         name: props.name || 'It is name'
      };
   }

   click = () => {
      console.log(this);
   }

   render() {
      return template.call(this, this.state);
   }
}