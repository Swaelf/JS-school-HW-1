import React from 'react';

export default interface Interface {
  inputRef?: React.RefObject<HTMLInputElement>|null,
  className: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  placeholder?: string
}