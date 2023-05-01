import React, { useMemo } from 'react';

import './index.css';

export const NewItemInput = (
  {
    aprooveNewTask, 
    inputRef 
  }: { 
    aprooveNewTask: (() => void),
    inputRef: React.RefObject<HTMLInputElement>|null,
  } = {
    aprooveNewTask: (() => {}),
    inputRef: null,
  }) => {
console.log('newiteminput!')
  return (
    <input
      className="new_item_input"
      onChange={ aprooveNewTask }
      ref={ inputRef }/>
  );
};