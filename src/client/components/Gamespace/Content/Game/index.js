import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import { actions as gameActions } from 'reducers/game';

export class Game extends Component {
   createGame = () => {
      const { dispatch, userConfig } = this.props;

      dispatch(gameActions.create(userConfig.login));
   };

   render() {
      const { game } = this.props;
      let content;

      if (game) {
         content = game.id;
      } else {
         content = (
            <Button
               variant="contained"
               size="small"
               color="primary"
               onClick={this.createGame}
            >
               Create game
               <VideogameAsset className="create-game-icon" />
            </Button>
         );
      }

      return (
         <div className="game">
            {content}
         </div>
      );
   };
};

export default connect(store => store)(Game);
