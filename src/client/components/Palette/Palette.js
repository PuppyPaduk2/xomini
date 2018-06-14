import React, { Component } from 'react';
import template from './Palette.template';

export default class Palette extends Component {
   constructor(props) {
      super(props);

      this.state = {
         colors: props.colors instanceof Array
            ? props.colors
            : [],
         columns: 3
      };
   }

   render() {
      return template.call(this, this.state);
   }
}
