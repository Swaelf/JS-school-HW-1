import ItemInterface from './ItemInterface'
import HTMLCommonElement from './HTMLCommonElement'

export default interface StateInterface {
  taskItems?: ItemInterface[],
  completeItems?: ItemInterface[],
  listOfTaskElements?: HTMLCommonElement[],
  listOfCompletedTaskElements?: HTMLCommonElement[],
  currentDate?: string,
  localurl?: string,
  githuburl?: string,
  weatherUrl?: string,
  weatherKey?: string,
  newdayMkr?: boolean,
  style?: {
    [key: string]: string, 
  }
}