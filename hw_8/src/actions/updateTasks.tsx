import ItemInterface from '../Interfaces/ItemInterface';

export const UPDATE_TASKS = 'UPDATE_TASKS';

export const updateTasks = (payload: ItemInterface[]|ItemInterface) => {
  return {
    type: UPDATE_TASKS,
    payload,
  };
};