class Button extends Component {
    constructor() {
        super();
        this.element = document.createElement('button');
    }

    /**
     * @override
     * @param props
     * @param props.text {string}
     * @param props.onClick {function}
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            id: props.id,
            onClick: props.onClick,
            children: props.text,
            class: props.class,
            style: props.style
        });
    }
}

class Label extends Component {
    constructor() {
        super();
        this.element = document.createElement('Label');
    }

    /**
     * @override
     * @param props
     * @param props.text {string}
     * @param props.onClick {function}
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            id: props.id,
            htmltext: props.text,
            onClick: props.onClick,
            children: [],
            class: props.class,
            style: this.state.style
        });
    }
}

class Input extends Component {
    constructor() {
        super();
        this.element = document.createElement('Input');
    }

    /**
     * @override
     * @param props
     * @param props.text {string}
     * @param props.onClick {function}
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            id: props.id,
            children: [],
            placeholder: props.text,
            class: props.class,
            type: props.type,
            style: this.state.style,
            onInput: props.onInput,
            onChange: props.onChange,
            checked: props.checked
        });
    }
}

class DivElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            class: props.class,
            children: props.children,
            htmltext: props.htmltext,
            id: props.id,
            style: props.style
        });
    }

}


