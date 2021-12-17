import { createStore } from 'redux';
import event from '../store/event';

let store;

export default function configureStore() {
 
  store = createStore(
    event, ['INITIAL_STATE']
  );

  return store;
}

export function getStore() {
    return store;
}
// function createReducer(asyncReducers) {
//   return (state, action) => {
//     for (const key in state) {
//       if (key !== 'event' && !has(asyncReducers, key)) {
//         state[key] = undefined;
//         delete state[key];
//       }
//     }

   

//     const combinedReducer = combineReducers({
//       global,
//       ...asyncReducers,
//     });
//     return combinedReducer(state, action);
//   };
// }