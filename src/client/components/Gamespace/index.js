import React, { Component } from 'react';
import { connect } from 'react-redux';
import tAppBar from './templates/appBar.jsx';
import BottomNav from './BottomNav';

export class Gamespace extends Component {

   closePlayersList = () => {
      this.setState({ openPlayersList: false });
   };

   render() {
      const { userConfig } = this.props;

      return (
         <div className="gamespace">
            <div className="top">
               {tAppBar(userConfig)}
            </div>

            <div className="content"></div>

            <BottomNav />
         </div>
      );
   };
};

export default connect(store => store)(Gamespace);
