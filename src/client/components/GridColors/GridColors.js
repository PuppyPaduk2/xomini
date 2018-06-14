import React, { Component } from 'react';
import _ from 'lodash';

export default class GridColors extends Component {
   static defaultProps = {
      colors: [],
      columns: 1
   };

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
      const props = this.props;
      const rows = _.chunk(props.colors, props.columns).map((row, rowIndex) => {
         const colors = row.map((config, configIndex) => {
            const color = config.color;
            const style= {
               backgroundColor: color
            };
            const colorClick = props.colorClick instanceof Function
               ? props.colorClick.bind(this, config)
               : undefined;
            let className = ['color'];

            if (config.lock) {
               className.push('lock');
            }

            return <div className={ className.join(' ') }
               key={[rowIndex, configIndex].join('/')}
               style={style}
               onClick={colorClick}></div>;
         });
   
         return <div className="row" key={rowIndex}>{colors}</div>
      });

      return <div className="grid-colors">{rows}</div>;
   }
}