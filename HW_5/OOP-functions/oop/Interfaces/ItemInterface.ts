import HTMLCommonElement from './HTMLCommonElement'

export default interface ItemInterface {
  id?: number,
  name?: string,
  elementID?: string,
  isCompleted?: boolean,
  htmlElement?: HTMLCommonElement,
  plannedDate?: string,
  tag?: string
}