import React from 'react';

import './index.css';

export const NewItemInput = (
  {
    aprooveNewTask, 
    inputRef 
  }: { 
    aprooveNewTask?: (() => void),
    inputRef?: React.RefObject<HTMLInputElement>|null,
  } = {
    aprooveNewTask: (() => {}),
    inputRef: null,
  }) => {

  return (
    <input
      className="new_item_input"
      onChange={ aprooveNewTask }
      placeholder='New Task'
      ref={ inputRef }/>
  );
};