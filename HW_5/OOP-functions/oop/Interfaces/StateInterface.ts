import ItemInterface from './ItemInterface'
import HTMLCommonElement from './HTMLCommonElement'

export default interface StateInterface {
  taskList?: ItemInterface[] ,
  taskItems?: ItemInterface[],
  completeItems?: ItemInterface[],
  listOfUncompletedTaskElements?: HTMLCommonElement[],
  listOfCompletedTaskElements?: HTMLCommonElement[],
  currentDate?: string,
  localurl?: string,
  githuburl?: string,
  weatherUrl?: string,
  weatherKey?: string,
  newdayMkr?: boolean,
  weather?: {[key: string]: string}
  style?: {[key: string]: string}
}