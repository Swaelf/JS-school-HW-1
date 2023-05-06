import React from 'react';

export default interface Interface {
  defaultChecked?: boolean,
  onChange?: (() => void),
  inputRef?: React.RefObject<HTMLInputElement>|null,
}