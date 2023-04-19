    
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
            i: props.i,
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
                new LabelContainer().render({
                    id: props.prefix + 'LabelContainer_' + props.i,
                    class: 'tasks__labelcontainer',
                    labelState: props.labelState,
                    tagState: props.tagState,
                    prefix: props.prefix,
                    i: props.i,
                    item: props.item
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

class LabelContainer extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            class: props.class,
            htmltext: props.htmltext,
            id: props.id,
            i: props.i,
            item: props.item,
            style: props.style,
            tagState: props.tagState,
            children: [
                new Label().render({
                    id: props.prefix + 'Label_' + props.i,
                    text: props.item,
                    class: 'task__text' + props.labelState
                }),
                new TagHolder().render({
                    id: props.prefix + 'TagHolder_' + props.i,
                    class: 'tasks__tagholder',
                    prefix: props.prefix,
                    tagState: props.tagState,
                    i: props.i,
                })
            ]
        });
    }
}

class TagHolder extends Component {
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
        });
    }
}

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
                    children: this.CreateListForMorningGreeting(props.tasks)
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

    CreateListForMorningGreeting = (items) => {
        let rows = [];
        let i;
        for (i in items) {
            rows.push(
                new Label().render({
                    id: "morningTask_" + i, 
                    text: items[i], 
                    class: "newdaybox__text"
                })
            )
        }
        return rows;
    }
}

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
                    onSearch: this.NewTaskOnEnter,
                    onInput: this.AproveNewItem
                }),
                new NewItemAddition().render({
                    id: 'NewItemAddition',
                    class: 'newitembox__addition',
                    currentDate: props.currentDate,
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

    AproveNewItem = () => {
        const newItemInput = document.getElementById("NewItemInput");
        const newItemButtonApply = document.getElementById("NewItemButtonApply");
        if (newItemInput.value) {
            if (newItemButtonApply.classList.contains("newitembox__button--disabled") == true) {
                newItemButtonApply.classList.remove("newitembox__button--disabled");
            }
            if (newItemButtonApply.classList.contains("newitembox__button--enabled") == false) {
             newItemButtonApply.classList.add("newitembox__button--enabled");                      
            }
            newItemButtonApply.disabled = false;
        } else {
            if (newItemButtonApply.classList.contains("newitembox__button--disabled") == false) {
                newItemButtonApply.classList.add("newitembox__button--disabled");
            }
            if (newItemButtonApply.classList.contains("newitembox__button--enabled") == true) {
             newItemButtonApply.classList.remove("newitembox__button--enabled");                      
            }
            newItemButtonApply.disabled = true;
        }
    }

    NewTaskOnEnter = () => {
        const newItemBox = document.getElementById('NewItemButtonApply');
        newItemBox.disabled == false ? newItemBox.onclick.apply() : '';
    }
}

class NewItemAddition extends Component {
    constructor() {
        super();
        this.state = {
            weatherUrl: 'https://api.weatherapi.com/v1',
            weatherKey: 'd9e8739732f24f7f942112753231504',
            weather: {
                position: 'Tbilisi',
                temperature: '??',
                icon: 'icons/weather/64x64/day/116.png',
            }
        }
        this.element = document.createElement('div');      
    }

    render(props) {

        return super.render({
            id: props.id,
            class: props.class,
            style: props.style,
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
        });
    }
}

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

class TopBarElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: props.id,
            class: props.class,
            children: [
                new Input().render({
                    id: 'SearchString',
                    children: [],
                    value: props.inputSearchValue,
                    class: 'topbar__search',
                    text: 'Search Task',
                    type: 'search',
                    onInput: props.onSearchInput
                }),
                new Button().render({
                    id: 'AddButton',
                    class: 'button__add',
                    htmltext: '+ New Task',
                    onClick: props.onButtonClick
                })
            ]
        });
    }
}


class ContainerElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: props.id,
            class: props.class,
            children: [
                new DivElement().render({
                    id: 'topLabelBox',
                    class: 'toplabelbox__container',
                    children: [
                        new Label().render({
                            id: 'ToDoLabel',
                            text: 'To Do List',
                            class: 'toplabelbox__label'
                        }),
                        new WeatherWiget().render({
                            id: 'topLabelWidget',
                            class: 'toplabelbox__widget',
                            weather: props.weather,
                        })
                    ]
                }),
                new TopBarElement().render({
                    id: 'TopBar',
                    class: 'topbar',
                    inputSearchValue: props.defaultSearchPattern,
                    onSearchInput: props.onSearchInput,
                    onButtonClick: props.onButtonClick,
                }),
                new DivElement().render({
                    id: 'TaskContainer',
                    class: 'tasks',
                    children: [
                        new DivElement().render({
                            id: 'AllTasks',
                            class: 'tasks__label',
                            htmltext: 'All Tasks',
                            children: props.actualTasksChildren 
                        }),
                        new DivElement().render({
                            id: 'CompletedTasks',
                            class: 'tasks__label',
                            htmltext: 'Completed Tasks',
                            children: props.completedTasksChildren 
                        })
                    ]
                }),
            ] 
        });
    }
}


class ScreenlockElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: props.id,
            class: props.class,
            style: props.style.screenLock,
            children: [
                new NewItemWindow().render({
                    id: 'NewItemBox',
                    class: 'newitembox',
                    style: props.style.newBox,
                    currentDate: props.currentDate,
                    buttonOnClick_cancel: props.buttonOnClick_cancel,
                    buttonOnClick_apply: props.buttonOnClick_apply
                }),
                new GreetingWindow().render({
                    id: 'NewDayBox',
                    class: 'newdaybox',
                    tasks: props.tasks,
                    style: props.style.newMorning,
                    buttonOnClick: props.buttonOnClick_cancel,
                })
            ]
        });
    }
}
            
              