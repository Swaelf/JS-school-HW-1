import React from 'react';

export default interface Interface {
  buttonRef?: React.RefObject<HTMLButtonElement>|null,
  text?: string,
  className: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean
}