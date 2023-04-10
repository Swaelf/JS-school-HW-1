class Component {
    constructor() {
        this.state = {};
        this.props = {};
        this.element = document.createElement('div');
    }

    setState(state) {
        this.state = {...this.state, ...state};
        this.update();
    }

    /**
     *
     * @param props
     * @returns {HTMLElement}
     */
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
        if (props.style) {
            div.style = props.style;
        }
        props.htmltext ? div.innerHTML = props.htmltext : div.innerHTML = ''
        div.append(...props.children)

        return div;
    }

    update() {
        this.render(this.props);
    }
}
