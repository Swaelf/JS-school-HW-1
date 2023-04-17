    
/**
*
* @param props
* @returns {HTMLElement}
*/
class Button extends Component {
    constructor() {
        super();
        this.element = document.createElement('button');
    }

    render(props) {
        return super.render({
            id: props.id,
            onClick: props.onClick,
            children: [],
            class: props.class,
            htmltext: props.htmltext,
            style: props.style
        });
    }
}

/**
*
* @param props
* @returns {HTMLElement}
*/
class Label extends Component {
    constructor() {
        super();
        this.element = document.createElement('Label');
    }

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

/**
*
* @param props
* @returns {HTMLElement}
*/
class Input extends Component {
    constructor() {
        super();
        this.element = document.createElement('Input');
    }

    render(props) {
        return super.render({
            id: props.id,
            children: [],
            value: props.value,
            placeholder: props.text,
            class: props.class,
            type: props.type,
            style: this.state.style,
            onInput: props.onInput,
            onChange: props.onChange,
            onSearch: props.onSearch,
            checked: props.checked
        });
    }
}

/**
*
* @param props
* @returns {HTMLElement}
*/
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


