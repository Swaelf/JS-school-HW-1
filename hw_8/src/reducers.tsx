import { createStore, combineReducers } from 'redux';
import ItemInterace from './Interfaces/ItemInterface'

const initialState: ItemInterace[] = [];

const tasksReducer = (state: ItemInterace[] = initialState, action: any ) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let newState: ItemInterace[] = [...state];
      console.log('payload =', action.payload, 'newState =', newState)

      if (Array.isArray(action.payload)) {
        for (let task of action.payload) {
          console.log('task =', task, ' newState =', newState)
          newState = [...newState, task]
        }
      } else {
        console.log('payload =', action.payload)
        newState = [...newState, action.payload];
      }
      console.log('state =', newState);
      return [...newState];

    case 'DELETE_TASK':
      const printItem = { id: action.payload.id, name: action.payload.name };
      //console.log('state', [...state, printItem]);
      return state;

    case 'UPDATE_TASKS':
      console.log('payload =', action.payload)
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  tasks: tasksReducer,
});