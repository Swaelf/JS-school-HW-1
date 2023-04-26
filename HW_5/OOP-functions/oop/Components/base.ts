import Properities from '../Interfaces/Properities';
import StateIterface from '../Interfaces/StateInterface'; 
import HTMLCommonElement from '../Interfaces/HTMLCommonElement'

export default class Component {
    state: StateIterface;
    props: Properities;
    element: HTMLCommonElement;

    constructor() {
        this.state = {};
        this.props = {id: '', class: ''};
        this.element = document.createElement('div') as HTMLCommonElement;
    }

    setState(state: StateIterface, reload = true) {
        this.state = {...this.state, ...state};
        if (reload == true) {this.update()};
    }

    render(props: Properities) {
        this.props = {...props};
        let div: HTMLCommonElement = this.element;
        div.id = props.id||'';
        for (let i of props.class.split(' ')) {
            div.classList.add(i);
        };
        div.onclick = props.onClick;
        div.placeholder = props.placeholder;
        div.oninput = props.onInput;
        div.onchange = props.onChange;
        div.checked = props.checked;
        div.onload = props.onLoad;
        div.type = props.type;

        div.disabled = props.isDisabled||false

        if (props.style) {
            div.style.cssText = props.style;
        }

        div.value = props.value||'';
        div.onsearch = props.onSearch;
        div.innerHTML = props.htmltext||'';
        if (Array.isArray(props.children)) {
            div.append(...props.children);
        }
        return div;
    }

    update() {
        this.render(this.props);
    }

}