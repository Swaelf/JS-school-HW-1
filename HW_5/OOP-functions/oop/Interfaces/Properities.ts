import HTMLCommonElement from './HTMLCommonElement';
import ItemInterface from './ItemInterface';
import StateInterface from './StateInterface';


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
  text?: string;
  name?: string;
  children?: HTMLCommonElement[];
  htmltext?: string;
  taskList?: ItemInterface[];
  buttonBacground?: string;
  prefix?: string;
  item?: ItemInterface;
  tagState?: string;
  labelState?: string;
  actualTasksChildren?: HTMLCommonElement[];
  completedTasksChildren?: HTMLCommonElement[];
  currentDate?: string;
  weather?: {[key: string]: string};
  isDisabled?: boolean;
  onClick?: (() => void)|((element: MouseEvent, mkr?: boolean) => void);
  onButtonClick?: (() => void);
  onInput?: (() => void);
  onSearch?: (() => void);
  onChange?: (() => void)|((element: MouseEvent) => void);
  onLoad?: (() => void);
  buttonOnClick?: (() => void)|((element: MouseEvent, mkr?: boolean) => void);
  buttonOnClick_cancel?: (() => void);
  buttonOnClick_apply?: (() => void);
  onSearchInput?: (() => void);
}