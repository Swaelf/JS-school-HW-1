import ItemInterface from '../Interfaces/ItemInterface';

export const DELETE_TASK = 'DELETE_TASK';

export const deleteTask = (payload: ItemInterface[]|ItemInterface) => {
  return {
    type: DELETE_TASK,
    payload,
  };
};