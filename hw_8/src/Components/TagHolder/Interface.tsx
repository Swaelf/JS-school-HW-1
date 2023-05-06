import React from 'react';

export default interface Interface {
  setTag?: React.Dispatch<React.SetStateAction<string>>,
  selectedTag?: string,
  setSelectedTag?: React.Dispatch<React.SetStateAction<string>>
}