import React from 'react';

export default interface Interface {
  buttonRef?: React.RefObject<HTMLButtonElement>|null,
  to?: string,
  from?: string,
  text?: string,
  className: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>|any,
  disabled?: boolean
}