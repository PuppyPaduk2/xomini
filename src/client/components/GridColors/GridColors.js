import React, { Component } from 'react';
import template from './GridColors.template';

export default class GridColors extends Component {
   constructor(props) {
      super(props);

      this.state = {
         colors: props.colors instanceof Array
            ? props.colors
            : [],
         columns: typeof props.columns === 'number'
            ? props.columns
            : 1
      };

      // try {
      //    socket.on('player:selectedColor', this.selectedColor);
      // } catch(e) {
      //    // pass
      // }
   }

   /**
    * @param {Object} config
    */
   colorClick(config) {
      // socket.emit('player:selectedColor', config);
   }

   // /**
   //  * @param {Object} confg
   //  */
   // selectedColor = (config) => {
   //    const colors = this.state.colors;

   //    colors.push(config);

   //    this.setState({
   //       colors: colors
   //    });

   //    console.log('selectedColor', config);
   // }

   render() {
      return template.call(this, this.props);
   }
}