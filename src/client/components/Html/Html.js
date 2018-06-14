import React, { Component } from 'react';
import _ from 'lodash';
import template from './Html.template';

export default class Html extends Component {
   constructor(props) {
      props = _.pick(props, [
         'tilte',
         'content',
         'initialData'
      ]);

      super(props);

      if (props.initialData instanceof Object) {
         props.initialData = JSON.stringify(props.initialData);
      }

      this.state = props;
   }

   render() {
      return template.call(this, this.state);
   }
}