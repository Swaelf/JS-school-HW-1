
export default interface HTMLCommonElement extends HTMLElement {
  placeholder?: string;
  checked?: boolean;
  type?: string;
  disabled?: boolean;
  value?: string;
  onsearch?: (() => void);
}