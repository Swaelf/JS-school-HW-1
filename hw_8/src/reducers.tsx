import { combineReducers } from 'redux';
import ItemInterace from './Interfaces/ItemInterface'

const initialState: ItemInterace[] = [];

const tasksReducer = (state: ItemInterace[] = initialState, action: any ) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let newState: ItemInterace[] = [...state];

      if (Array.isArray(action.payload)) {
        for (let task of action.payload) {
          newState = [...newState, task]
        }
      } else {
        newState = [...newState, action.payload];
      }
      return [...newState];

    case 'UPDATE_TASKS':
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  tasks: tasksReducer,
});