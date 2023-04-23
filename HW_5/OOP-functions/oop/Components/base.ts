import Properities from './Properities.ts';

export default class Component {

    state: object;
    props: Properities;
    element: any;

    constructor() {
        this.state = {};
        this.props = {id: '', class: ''};
        this.element = document.createElement('div');
    }

    setState(state: any, funct: any = false, reload = true) {
        this.state = {...this.state, ...state};
        if (reload == true) {this.update()};
        if (funct != false) {funct();};
    }

    render(props: Properities) {
        this.props = {...props};
        let div = this.element;
        div.id = props.id;
        //div.classList.add(props.class);
        div.classList = props.class;
        div.onclick = props.onClick;
        div.placeholder = props.placeholder;
        div.oninput = props.onInput;
        div.onchange = props.onChange;
        div.checked = props.checked;
        div.onload = props.onLoad;
        div.type = props.type;

        div.disabled = props.isDisabled||false

        if (props.style) {
            div.style = props.style;
        }

        div.value = props.value||'';
        div.onsearch = props.onSearch||'';
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