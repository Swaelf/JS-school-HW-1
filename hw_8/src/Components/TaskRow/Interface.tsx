import React from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';

export default interface Interface {
  task: ItemInterface,
  taskList: ItemInterface[], 
  setTaskList: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>
}