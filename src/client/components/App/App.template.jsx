import React from 'react';

export default function(props) {
   return <div className="app" onClick={this.click}>
      App {props.name}
   </div>;
}
