import React from 'react';

import './index.css';

export const NewTaskInput = (
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