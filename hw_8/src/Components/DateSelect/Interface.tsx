import React from 'react';

export default interface Iterface {
  currentDate: string,
  inputRef?: React.RefObject<HTMLInputElement>|null,
  labelRef?: React.RefObject<HTMLLabelElement>|null
}