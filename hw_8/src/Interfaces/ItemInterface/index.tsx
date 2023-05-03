import { LegacyRef } from 'react';

export default interface ItemInterface {
  id?: number,
  name?: string,
  elementID?: string,
  isCompleted?: boolean,
  plannedDate?: string,
  tag?: string,
  filter?: boolean
}