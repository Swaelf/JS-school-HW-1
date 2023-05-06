import React from 'react';

export default interface Interface {
  tag?: string, 
  text?: string,
  setTag?: React.Dispatch<React.SetStateAction<string>>,
  selectedTag?: string,
  setSelectedTag?: React.Dispatch<React.SetStateAction<string>>
}