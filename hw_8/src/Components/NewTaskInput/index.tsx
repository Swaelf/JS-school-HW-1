import React from 'react';

import './index.css';

export const NewTaskInput = (
  {
    aprooveName, 
    inputRef 
  }: { 
    aprooveName?: (() => void),
    inputRef?: React.RefObject<HTMLInputElement>|null,
  } = {
    aprooveName: (() => {}),
    inputRef: null,
  }) => {

  return (
    <input
      className="new_item_input"
      onChange={ aprooveName }
      placeholder='New Task'
      ref={ inputRef }/>
  );
};