import React from 'react';
import { connect } from 'react-redux';
import ComponentSocket from '../ComponentSocket';
import tAppBar from './templates/appBar.jsx';
import tBottomNav from './templates/bottomNav.jsx';

import { actions as gameActions } from '../../../reducers/userConfig';

export class Gamespace extends ComponentSocket {
   state = {
      openPlayersList: false
   };

   handleChange = (event, value) => {
      if (value === 'exit') {
         this.props.dispatch(gameActions.reset());
      } else if (value === 'players') {
         this.setState({ openPlayersList: true });
      }
   };

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

            <div className="bottom">
               {
                  tBottomNav(this.state, {
                     bottomNavigation: this.handleChange,
                     closePlayersList: this.closePlayersList
                  })
               }
            </div>
         </div>
      );
   };
};

export default connect(store => store)(Gamespace);
