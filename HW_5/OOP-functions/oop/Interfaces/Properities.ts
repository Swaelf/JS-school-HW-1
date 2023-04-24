import HTMLCommonElement from './HTMLCommonElement';
import ItemInterface from './ItemInterface';


export default interface Properities {
  id?: string;
  class?: string;
  placeholder?: string;
  checked?: boolean;
  type?: string;
  disabled?: boolean;
  value?: string;
  onsearch?: string;
  style?: string;
  styles?: {[key: string]: string};
  text?: string;
  children?: HTMLCommonElement[];
  htmltext?: string;
  completeItems?: ItemInterface[];
  taskItems?: ItemInterface[];
  buttonBacground?: string;
  i?: number;
  prefix?: string;
  item?: ItemInterface;
  tagState?: string;
  labelState?: string;
  actualTasksChildren?: HTMLCommonElement[];
  completedTasksChildren?: HTMLCommonElement[];
  currentDate?: string;
  tasks?: ItemInterface[];
  isDisabled?: boolean;
  pattern?: string;
  onClick?: (() => void)|(element: MouseEvent, mkr?: boolean);
  onButtonClick?: (() => void);
  onInput?: (() => void);
  onSearch?: (() => void);
  onChange?: (() => void)|((element: MouseEvent) => void);
  onLoad?: (() => void);
  buttonOnClick?: (() => void)|((element: MouseEvent, mkr?: boolean) => ItemInterface);
  buttonOnClick_cancel?: (() => void);
  buttonOnClick_apply?: (() => void);
  onSearchInput?: (() => void);
  RemoveItemFromTaskList?: (() => void)|((element: MouseEvent, mkr?: boolean) => ItemInterface);
  GetDataFromServer?: (() => void);
  PutDataIntoServer?: (() => void);
}