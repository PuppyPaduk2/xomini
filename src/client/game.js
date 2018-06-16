import _ from 'lodash';

export const game = {

   defaultState: () => {
      return {
         begin: false,
         end: false,
         players: [],
         map: []
      };
   },

   defaultMapElement: () => {
      return {
         lock: true,
         color: 'black'
      };
   },

   createRowElements: state => {
      return state.players.map(() => game.defaultMapElement());
   },

   isPlay: state => {
      return state.begin && !state.end;
   },

   /**
    * @param {Object} state
    * @param {Boolean} add
    */
   players: (state, players) => {
      if (!state.begin) {
         const playersOldCount = state.players.length;
         const playersNewCount = players.length;
         const map = state.map;

         state.players = players;

         if (playersNewCount > playersOldCount) {
            map.push(game.defaultMapElement());
         } else if (playersNewCount < playersOldCount) {
            map.pop();
         }

         return state;
      } else {
         return 'The game has already started!';
      }
   },

   lastRowUnlock: state => {
      if (game.isPlay(state)) {
         _.takeRight(state.map, state.players.length).forEach(element => {
            element.lock = false;
         });
      }
   },

   addRow: state => {
      if (game.isPlay(state)) {
         state.map = state.map.concat(game.createRowElements(state));
      }
   },

   nextRound: state => {
      game.lastRowUnlock(state);
      game.addRow(state);
   }

};
