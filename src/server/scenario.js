import State from '../Scenario/io/State';

/**
 * @param {Namespace} io
 */
export default function(io) {
   let state = new State();

   console.log('#log', state);
}
