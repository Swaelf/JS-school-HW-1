import React from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';

export default interface Interface {
  modalWindowState: number,
  setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
  taskList: ItemInterface[],
  setTaskList: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>,
  searchPattern: string,
  setSearchPattern: React.Dispatch<React.SetStateAction<string>>
}