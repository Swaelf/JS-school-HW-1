import React from 'react';

export default interface Interface {
  onChange?: (() => void),
  inputRef?: React.RefObject<HTMLInputElement>|null,
}