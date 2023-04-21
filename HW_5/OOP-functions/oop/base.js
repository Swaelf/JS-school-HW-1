
export default class Component {
    constructor() {
        this.state = {};
        this.props = {};
        this.element = document.createElement('div');
    }

    setState(state, funct = false, reload = true) {
        this.state = {...this.state, ...state};
        reload ? this.update(): '';
        funct ? funct(): '';
    }

    render(props = {}) {
        this.props = {...props};
        const div = this.element;
        div.classList = props.class;
        div.onclick = props.onClick;
        div.placeholder = props.placeholder;
        div.type = props.type;
        div.id = props.id;
        div.oninput = props.onInput;
        div.onchange = props.onChange;
        div.checked = props.checked;
        div.onload = props.onLoad;
        props.isDisabled ? div.disabled = props.isDisabled: div.disabled = false;
        if (props.style) {
            div.style = props.style;
        }
        props.value ? div.value = props.value : '';
        props.onSearch ? div.onsearch = props.onSearch: '';
        props.htmltext ? div.innerHTML = props.htmltext : div.innerHTML = '';
        div.append(...props.children);

        return div;
    }

    update() {
        this.render(this.props);
    }

}