    
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
        //console.log(props.class + ' ' + props.style);
        return super.render({
            class: props.class,
            children: props.children,
            htmltext: props.htmltext,
            id: props.id,
            style: props.style
        });
    }

}


/**
*
* @param props
* @returns {HTMLElement}
*/
class TaskRow extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            class: props.class,
            htmltext: props.htmltext,
            id: props.id,
            style: props.style,
            children: [
                new Input().render({
                    id: props.prefix +'CheckBox_' + props.i,
                    children: [],
                    text: props.item,
                    class: 'task__checkbox',
                    type: 'checkbox',
                    onChange: props.onChange,
                    checked: props.checked
                }),
                new DivElement().render({
                    id: props.prefix + 'LabelContainer_' + props.i,
                    class: 'tasks__labelcontainer',
                    children: [
                        new Label().render({
                            id: props.prefix + 'Label_' + props.i,
                            text: props.item,
                            class: 'task__text' + props.labelState
                        }),
                        new DivElement().render({
                            id: props.prefix + 'TagHolder_' + props.i,
                            class: 'tasks__tagholder',
                            children: [
                                new Label().render({
                                    id: props.prefix + 'Tag_' + props.i,
                                    text: 'tag',
                                    class: 'tags__item' + props.tagState
                                }),
                                new Label().render({
                                    id: props.prefix + 'Time_' + props.i,
                                    text: 'time',
                                    class: 'tags__item tags__item--time'
                                })
                            ]
                        })
                    ]
                }),
                new Button().render({
                    id: props.prefix + 'Button_' + props.i,
                    class: 'button__remove ',
                    onClick: props.buttonOnClick,
                    htmltext: '',
                    style: props.buttonBacground
                })
            ]
        });
    }

}

/**
*
* @param props
* @returns {HTMLElement}
*/
class GreetingWindow extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: props.id,
            class: props.class,
            style: props.style,
            children: [
                new Label().render({
                    id: 'NewDayLabel',
                    text: 'Good morning',
                    class: 'newdaybox__label',
                    children: []
                }),
                new Label().render({
                    id: 'NewDayTasksLabel',
                    text: 'You have the next planned tasks for today: ',
                    class: 'newdaybox__taskslabel',
                    children: []
                }),
                new DivElement().render({
                    id: 'NewDayTasks',
                    text: '',
                    class: 'newdaybox__tasks',
                    children: props.rows
                }),
                new Button().render({
                    id: 'NewDayLabel',
                    htmltext: 'Ok',
                    class: 'newdaybox__button newdaybox__button--apply',
                    onClick: props.buttonOnClick,
                    children: []
                })
            ]
        });
    }
}

/**
*
* @param props
* @returns {HTMLElement}
*/
class NewItemWindow extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: props.id,
            class: props.class,
            style: props.style,
            children: [
                new Label().render({
                    id: 'NewItemLabel',
                    text: 'Add New Item',
                    class: 'newitembox__label',
                    children: []
                }),
                new Input().render({
                    id: 'NewItemInput',
                    children: [],
                    class: 'newitembox__input',
                    text: 'New Task',
                    type: 'search',
                    onSearch: props.onSearch,
                    onInput: props.onInput
                }),
                new DivElement().render({
                    id: 'NewItemAddition',
                    class: 'newitembox__addition',
                    children: [
                        new DivElement().render({
                            id: 'NewItemTags',
                            class: 'newitembox__tags',
                            children: [
                                new Label().render({
                                    id: 'NewItemTag0',
                                    class: 'tags__item tags__item--health',
                                    text: 'health',
                                    children: []
                                }),
                                new Label().render({
                                    id: 'NewItemTag1',
                                    class: 'tags__item tags__item--work',
                                    text: 'work',
                                    children: []
                                }),
                                new Label().render({
                                    id: 'NewItemTag2',
                                    class: 'tags__item tags__item--home',
                                    text: 'home',
                                    children: []
                                }),
                                new Label().render({
                                    id: 'NewItemTag3',
                                    class: 'tags__item tags__item--other',
                                    text: 'other',
                                    children: []
                                })
                            ]
                        }),
                        new Label().render({
                            id: 'NewItemDate',
                            class: 'newitembox__date',
                            text: props.currentDate,
                            children: []
                        })
                    ]
                }),
                new DivElement().render({
                    id: 'NewItemButtons',
                    class: 'newitembox__buttons',
                    children: [
                        new Button().render({
                            id: 'NewItemButtonCancel',
                            class: 'newitembox__button newitembox__button--cancel',
                            htmltext: 'Cancel',
                            onClick: props.buttonOnClick_cancel
                        }),
                        new Button().render({
                            id: 'NewItemButtonApply',
                            class: 'newitembox__button newitembox__button--apply newitembox__button--enabled',
                            htmltext: 'Add Task',
                            onClick: props.buttonOnClick_apply
                        }),
                    ]
                })
            ]
        });
    }
}

/**
*
* @param props
* @returns {HTMLElement}
*/
class WeatherWiget extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: props.id,
            class: props.class,
            style: props.style,
            children: [
                new DivElement().render({
                    id: 'topLabelIcon',
                    class: 'widget__icon',
                    style: 'background-image: url(' + props.weather.icon + ');',
                    children: []
                }),
                new Label().render({
                    id: 'topLabelTemperature',
                    text: props.weather.temperature + '&#176',
                    class: 'toplabelbox__text widget__text--temperature'
                }),
                new Label().render({
                    id: 'topLabelCity',
                    text: props.weather.position,
                    class: 'toplabelbox__text widget__text--city'
                }),

            ]
        });
    }
}
