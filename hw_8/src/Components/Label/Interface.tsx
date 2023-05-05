import React from 'react';
import ItemInterface from '../../Interfaces/ItemInterface'

export default interface Interface {
  labelRef?: React.RefObject<HTMLLabelElement>|null,
  text: string,
  className: string,
  onClick: (() => void)
}