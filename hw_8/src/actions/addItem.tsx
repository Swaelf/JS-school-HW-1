import ItemInterface from '../Interfaces/ItemInterface';

export const ADD_ITEM = 'ADD_ITEM';

export const addItem = (payload: ItemInterface[]|ItemInterface) => {
  return {
    type: ADD_ITEM,
    payload,
  };
};
