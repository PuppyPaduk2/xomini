import React, { Component } from 'react';
import template from './GridColors.template';

export default class GridColors extends Component {
   static defaultProps = {
      colors: [],
      columns: 1
   }

   // constructor(props) {
   //    super(props);

      // props.colors = props.colors instanceof Array
      //    ? props.colors
      //    : [];
      // props.columns = typeof props.columns === 'number'
      //    ? props.columns
      //    : 1;

      // this.state = {
      //    colors: props.colors instanceof Array
      //       ? props.colors
      //       : [],
      //    columns: typeof props.columns === 'number'
      //       ? props.columns
      //       : 1
      // };

      // try {
      //    socket.on('player:selectedColor', this.selectedColor);
      // } catch(e) {
      //    // pass
      // }
   // }

   // /**
   //  * @param {Object} config
   //  */
   // colorClick(config) {
      // socket.emit('player:selectedColor', config);
   // }

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