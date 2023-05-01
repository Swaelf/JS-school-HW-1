import { LegacyRef } from 'react';

export default interface ItemInterface {
  id?: number,
  name?: string,
  elementID?: string,
  isCompleted?: boolean,
  htmlElement?: LegacyRef<HTMLDivElement>,
  plannedDate?: string,
  tag?: string,
  filter?: boolean
}