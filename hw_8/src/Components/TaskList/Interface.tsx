import ItemInterface from '../../Interfaces/ItemInterface'

export default interface Interface {
  taskList?: ItemInterface[],
  setTaskList?: React.Dispatch<React.SetStateAction<ItemInterface[]>>,
  listName: string,
  isCompleted: boolean,
  setModalWindowState?: React.Dispatch<React.SetStateAction<number>>,
  searchPattern?: string
}