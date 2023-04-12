class App extends Component {
    constructor() {
        super();
        this.state = {
            items: ['Task 1 Title', 'Task 2 Title', 'Task 3 Title'],
            completeItems: ['Completed Task 1 Title', 'Completed Task 2 Title']
        };

        if (localStorage.getItem("initTasks")) {
            this.state.items = localStorage.getItem("initTasks").split(";");
        };

        if (localStorage.getItem("initComplete")) {
            this.state.completeItems = localStorage.getItem("initComplete").split(";");
        };

        this.currentDate = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");
        this.defaultsearch = undefined;
    }

    render(props) {
        let tasks = this.AddRows(this.state.items);
        let completetasks = this.AddCompleteRows(this.state.completeItems);

        localStorage.setItem("initTasks", this.state.items.join(";"));
        localStorage.setItem("initComplete", this.state.completeItems.join(";"));
        
        return super.render({
            id: 'oop_container',
            class: 'oop_container',
            children: [
                new DivElement().render({
                    id: 'ScreenLock',
                    class: 'screenlock',
                    children: [
                        new DivElement().render({
                            id: 'NewItemBox',
                            class: 'newitembox',
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
                                    onSearch: this.NewTaskSearch,
                                    onInput: this.AproveNewItem
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
                                            text: this.currentDate,
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
                                            onClick: this.CancelAction
                                        }),
                                        new Button().render({
                                            id: 'NewItemButtonApply',
                                            class: 'newitembox__button newitembox__button--apply newitembox__button--enabled',
                                            htmltext: 'Add Task',
                                            onClick: this.ApplyItem
                                        }),
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                new DivElement().render({
                    id: 'Container',                
                    class: 'container',
                    removeItem: this.removeItem,
                    children: [
                        new Label().render({
                            id: 'ToDoLabel',
                            text: 'To Do List',
                            class: 'topLabel'
                        }),
                        new DivElement().render({
                            id: 'TopBar',
                            class: 'topbar',
                            children: [
                                new Input().render({
                                    id: 'SearchString',
                                    children: [],
                                    value: this.defaultsearch,
                                    class: 'topbar__search',
                                    text: 'Search Task',
                                    type: 'search',
                                    onInput: this.SearchPattern
                                }),
                                new Button().render({
                                    id: 'AddButton',
                                    class: 'button__add',
                                    htmltext: '+ New Task',
                                    onClick: this.NewTask
                                })
                            ]
                        }),
                        new DivElement().render({
                            id: 'TaskContainer',
                            class: 'tasks',
                            children: [
                                new DivElement().render({
                                    id: 'AllTasks',
                                    class: 'tasks__label',
                                    htmltext: 'All Tasks',
                                    children: tasks 
                                }),
                                new DivElement().render({
                                    id: 'CompletedTasks',
                                    class: 'tasks__label',
                                    htmltext: 'Completed Tasks',
                                    children: completetasks 
                                })
                            ]
                        }),
                    ]              
                })
            ]
        });
        
    }

    SearchPattern = () => {
        let items = this.state.items;
        let itemsComplete = this.state.completeItems;
        let i;
        const pattern = document.getElementById("SearchString").value;
        this.defaultsearch = pattern;
        console.log(items);
        for (i in items) {
            console.log(i);
            let element = document.getElementById("Task_" + i);
            element.style.display = "none";
            if (items[i].match(pattern)){
                element.style.display = "flex";
            }     
        }
        for (i in itemsComplete) {
            let element = document.getElementById("Complete_" + i);
            element.style.display = "none";
            if (itemsComplete[i].match(pattern)){
                element.style.display = "flex";
            }     
        }
    }

    addItem = () => {
        const newItemInput = document.getElementById('NewItemInput');

        this.setState({
            items: [...this.state.items, 'item' + (this.state.items.length + 1)]
        });
        const screenlock = document.getElementById("screenlock");
        screenlock.style.display = "none";        
    }

    ApplyItem = () => {
        const newItemInput = document.getElementById("NewItemInput");
        this.setState({
            items: [...this.state.items, newItemInput.value]
        });

        const screenlock = document.getElementById("ScreenLock");
        screenlock.style.display = "none"
    }

    removeItem = (element) => {
        let states = this.state.items;
        const parent = element.srcElement.parentElement.id;
        const label = parent.replace("Task_", "TasksLabel_");
        const item = document.getElementById(label);
        const removed = states.splice(states.indexOf(item.innerHTML), 1);

        this.setState({
            items: [...states]
        });
        return removed[0];
    }

    removeCompletedItem = (element) => {
        let states = this.state.completeItems;
        const parent = element.srcElement.parentElement.id;
        const label = parent.replace("Complete_", "CompleteLabel_");
        const item = document.getElementById(label);
        const removed = states.splice(states.indexOf(item.innerHTML), 1);

        this.setState({
            completeItems: [...states]
        });
        return removed[0];
    }

    CancelAction = () => {
        const screenlock = document.getElementById("ScreenLock");
        screenlock.style.display = "none"; 
    }


    NewTask = () => {
        const newItemButtonApply = document.getElementById('NewItemButtonApply');
        newItemButtonApply.classList.remove("newitembox__button--enabled");
        newItemButtonApply.classList.add("newitembox__button--disabled");
        newItemButtonApply.disabled = true;

        const screenlock = document.getElementById("ScreenLock");
        screenlock.style.display = "flex"
        const NewItemBox = document.getElementById('NewItemInput');
        NewItemBox.focus();
    }

    NewTaskSearch = () => {
        const NewItemBox = document.getElementById('NewItemButtonApply');
        NewItemBox.disabled == false ? NewItemBox.onclick.apply() : '';
    }

    AddRows = (items) => {
        let i;
        let rows = [];
        for (i in items) {
            rows.push(
                new DivElement().render({
                    class: 'tasks__row',
                    id: "Task_" + i,
                    children: [
                        new Input().render({
                            id: 'TaskCheckBox_' + i,
                            children: [],
                            text: items[i],
                            class: 'task__checkbox',
                            type: 'checkbox',
                            onChange: this.ItemComplete
                        }),
                        new DivElement().render({
                            id: 'LabelContainerTask' + i,
                            class: 'tasks__labelcontainer',
                            children: [
                                new Label().render({
                                    id: 'TasksLabel_' + i,
                                    text: items[i],
                                    class: 'task__text'
                                }),
                                new DivElement().render({
                                    id: 'TaskTagHolder_' + i,
                                    class: 'tasks__tagholder',
                                    children: [
                                        new Label().render({
                                            id: 'TaskTag_' + i,
                                            text: 'tag',
                                            class: 'tags__item tags__item--other'
                                        }),
                                        new Label().render({
                                            id: 'TaskTime_' + i,
                                            text: 'time',
                                            class: 'tags__item tags__item--time'
                                        })
                                    ]
                                })
                            ]
                        }),     
                        new Button().render({
                            id: 'TasksButton_' + i,
                            class: 'button__remove',
                            htmltext: '',
                            onClick: this.removeItem
                        })
                    ]
                })
            );
        }
        return rows;
    }

    AddCompleteRows = (items) => {
        let i;
        let rows = [];
        for (i in items) {
            rows.push(new DivElement().render({
                class: 'tasks__row',
                id: "Complete_" + i,
                children: [
                    new Input().render({
                        id: 'CompleteCheckBox_' + i,
                        children: [],
                        text: items[i],
                        class: 'task__checkbox',
                        type: 'checkbox',
                        onChange: this.ItemUnComplete,
                        checked: "checked"
                    }),
                    new DivElement().render({
                        id: 'LabelContainerComplete_' + i,
                        class: 'tasks__labelcontainer',
                        children: [
                            new Label().render({
                                id: 'CompleteLabel_' + i,
                                text: items[i],
                                class: 'task__text task--complete'
                            }),
                            new DivElement().render({
                                id: 'CompleteTagHolder_' + i,
                                class: 'tasks__tagholder',
                                children: [
                                    new Label().render({
                                        id: 'CompleteTag_' + i,
                                        text: 'tag',
                                        class: 'tags__item tags__item--inactive'
                                    }),
                                    new Label().render({
                                        id: 'CopleteTime_' + i,
                                        text: 'time',
                                        class: 'tags__item tags__item--time'
                                    })
                                ]
                            })
                        ]
                    }),
                    new Button().render({
                        id: 'CompleteButton_' + i,
                        class: 'button__remove ',
                        htmltext: '',
                        style: "background: none"
                    })
                    ]
            }));
        }
        return rows;
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

    ItemComplete = (element) => {     
        let states = this.state.completeItems; 
        const newitem = this.removeItem(element);
        console.log(newitem);
        this.state.completeItems = [...states, newitem],
        this.setState({
            completeItems: [...states, newitem]
        });
    }

    ItemUnComplete = (element) => {
        let states = this.state.items;
        const newitem = this.removeCompletedItem(element);
        console.log(newitem);
        this.setState({
            items: [...states, newitem]
        });
    }
   
}

document.body.appendChild(new App().render());