class App extends Component {
    constructor() {
        super();
        this.state = {
            items: ['item1', 'item2', 'item3'],
            completeItems: ['Citem 1', 'Citem 2']
        };
        this.currentDate = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");
    }

    render(props) {
        let tasks = this.AddRows(this.state.items);
        let completetasks = this.AddCompleteRows(this.state.completeItems);
        return super.render({
            children: [
                new DivElement().render({
                    id: 'screenlock',
                    class: 'screenlock',
                    children: [
                        new DivElement().render({
                            id: 'NewItemBox',
                            class: 'newitembox',
                            children: [
                                new Label().render({
                                    text: 'Add New Item',
                                    class: 'newitembox__label',
                                    children: []
                                }),
                                new Input().render({
                                    id: 'newItemInput',
                                    children: [],
                                    class: 'newitembox__input',
                                    text: 'New Task',
                                    type: 'search',
                                    onInput: this.AproveNewItem
                                }),
                                new DivElement().render({
                                    class: 'newitembox__addition',
                                    children: [
                                        new DivElement().render({
                                            id: 'newItemTags',
                                            class: 'newitembox__tags',
                                            children: [
                                                new Label().render({
                                                    id: 'newItemTag0',
                                                    class: 'tags__item tags__item--health',
                                                    text: 'health',
                                                    children: []
                                                }),
                                                new Label().render({
                                                    id: 'newItemTag1',
                                                    class: 'tags__item tags__item--work',
                                                    text: 'work',
                                                    children: []
                                                }),
                                                new Label().render({
                                                    id: 'newItemTag2',
                                                    class: 'tags__item tags__item--home',
                                                    text: 'home',
                                                    children: []
                                                }),
                                                new Label().render({
                                                    id: 'newItemTag3',
                                                    class: 'tags__item tags__item--other',
                                                    text: 'other',
                                                    children: []
                                                })
                                            ]
                                        }),
                                        new Label().render({
                                            id: 'newItemDate',
                                            class: 'newitembox__date',
                                            text: this.currentDate,
                                            children: []
                                        })
                                    ]
                                }),
                                new DivElement().render({
                                    class: 'newitembox__buttons',
                                    children: [
                                        new Button().render({
                                            id: 'newItemButtonCancel',
                                            class: 'newitembox__button newitembox__button--cancel',
                                            text: 'Cancel',
                                            onClick: this.CancelAction
                                        }),
                                        new Button().render({
                                            id: 'newItemButtonApply',
                                            class: 'newitembox__button newitembox__button--apply newitembox__button--enabled',
                                            text: 'Add Task',
                                            onClick: this.ApplyItem
                                        }),
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                new DivElement().render({
                    items: this.state.items,
                    addItem: this.addItem,
                    class: 'container',
                    removeItem: this.removeItem,
                    removeCompleteItem: this.removeCompleteItem,     
                    addRows: this.AddRows,
                    addCompleteRows: this.addCompleteRows,
                    children: [
                        new Label().render({
                            text: 'To Do List',
                            class: 'topLabel'
                        }),
                        new DivElement().render({
                            class: 'topbar',
                            children: [
                                new Input().render({
                                    id: 'search_str',
                                    children: [],
                                    class: 'topbar__search',
                                    text: 'Searchstr',
                                    type: 'search',
                                    onInput: this.SearchPattern
                                }),
                                new Button().render({
                                    class: 'button__add',
                                    text: '+New Task',
                                    onClick: this.NewTask
                                })
                                ]
                        }),
                        new DivElement().render({
                            class: 'tasks__label',
                            htmltext: 'All Tasks',
                            children: tasks 
                        }),
                        new DivElement().render({
                            class: 'tasks__label',
                            htmltext: 'Complete Tasks',
                            children: completetasks 
                        })
                    ]              
                })
            ]
        });
    }

    SearchPattern = () => {
        let items = this.state.items;
        let itemsComplete = this.state.completeItems;
        let i;
            const pattern = document.getElementById("search_str").value;
            console.log(items);
            for (i in items) {
                console.log(i);
                let element = document.getElementById("task_" + i);
                element.style.display = "none";
                if (items[i].match(pattern)){
                    element.style.display = "flex";
                }     
            }
            for (i in itemsComplete) {
                let element = document.getElementById("complete_" + i);
                element.style.display = "none";
                if (itemsComplete[i].match(pattern)){
                    element.style.display = "flex";
                }     
            }
        }

    addItem = () => {
        const newItemInput = document.getElementById('newItemInput');

        
        this.setState({
            items: [...this.state.items, 'item' + (this.state.items.length + 1)]
        });
        const screenlock = document.getElementById("screenlock");
        screenlock.style.display = "none";        
    }

    ApplyItem = () => {
        const newItemInput = document.getElementById("newItemInput");
        this.setState({
            items: [...this.state.items, newItemInput.value]
        });

        const screenlock = document.getElementById("screenlock");
        screenlock.style.display = "none"
    }

    removeItem = (element) => {
        let states = this.state.items;
        const parent = element.srcElement.parentElement.id;
        const label = parent.replace("task_", "tasksLabel_");
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
        const label = parent.replace("complete_", "completeLabel_");
        const item = document.getElementById(label);
        const removed = states.splice(states.indexOf(item.innerHTML), 1);

            
        this.setState({
            completeItems: [...states]
        });
        return removed[0];
    }

    CancelAction = () => {
        const screenlock = document.getElementById("screenlock");
        screenlock.style.display = "none"; 
    }


    NewTask = () => {
        const newItemButtonApply = document.getElementById('newItemButtonApply');
        newItemButtonApply.classList.remove("newitembox__button--enabled");
        newItemButtonApply.classList.add("newitembox__button--disabled");
        newItemButtonApply.disabled = true;
        const screenlock = document.getElementById("screenlock");
        screenlock.style.display = "flex"
    }

    AddRows = (items) => {
        let i;
        let rows = [];
        for (i in items) {
            rows.push(new DivElement().render({
                class: 'tasks__row',
                id: "task_" + i,
                children: [
                    new Input().render({
                        children: [],
                        text: items[i],
                        class: 'task__checkbox',
                        type: 'checkbox',
                        onChange: this.ItemComplete
                    }),
                    new Label().render({
                        id: 'tasksLabel_' + i,
                        text: items[i],
                        class: 'task__text'
                    }),
                    new Button().render({
                        class: 'button__remove',
                        text: '',
                        onClick: this.removeItem
                    })
                    ]
            }));
        }
        return rows;
    }

    AddCompleteRows = (items) => {
        let i;
        let rows = [];
        for (i in items) {
            rows.push(new DivElement().render({
                class: 'tasks__row',
                id: "complete_" + i,
                children: [
                    new Input().render({
                        children: [],
                        text: items[i],
                        class: 'task__checkbox',
                        type: 'checkbox',
                        onChange: this.ItemUnComplete,
                        checked: "checked"
                    }),
                    new Label().render({
                        id: 'completeLabel_' + i,
                        text: items[i],
                        class: 'task__text task--complete'
                    }),
                    new Button().render({
                        class: 'button__remove ',
                        text: '',
                        style: "background: none"
                    })
                    ]
            }));
        }
        return rows;
    }

    AproveNewItem = () => {
        const newItemInput = document.getElementById("newItemInput");
        const newItemButtonApply = document.getElementById("newItemButtonApply");
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