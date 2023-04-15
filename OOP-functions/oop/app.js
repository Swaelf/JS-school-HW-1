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
        this.style = {
            screenLock: 'display: none;',
            newMorning: 'display: none;',
            newBox: "display: none;"
        };
        this.localurl = 'http://localhost:3004/tasks';
        this.weather = {
            position: 'Tbilisi',
            temperature: '??',
            icon: 'icons/weather/64x64/day/116.png',
            key: 'd9e8739732f24f7f942112753231504',
            url: 'http://api.weatherapi.com/v1',
            isLoad: false
        };

        this.LocateMe();
    }

    render(props) {
        let tasks = this.AddRows(this.state.items);
        let completetasks = this.AddCompleteRows(this.state.completeItems);
        let morningrows = this.AddMorningRows(this.state.items);
        this.MorningGreatings(this.currentDate);
        this.WeatherCall();

        localStorage.setItem("initTasks", this.state.items.join(";"));
        localStorage.setItem("initComplete", this.state.completeItems.join(";"));
        
        return super.render({
            id: 'oop_container',
            class: 'oop_container',
            putIntoServer: this.putIntoServer,
            getFromServer: this.getFromServer, 
            children: [
                new DivElement().render({
                    id: 'ScreenLock',
                    class: 'screenlock',
                    style: this.style.screenLock,
                    children: [
                        new DivElement().render({
                            id: 'NewItemBox',
                            class: 'newitembox',
                            style: this.style.newBox,
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
                        }),
                        new DivElement().render({
                            id: 'NewDayBox',
                            class: 'newdaybox',
                            style: this.style.newMorning,
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
                                    children: morningrows
                                }),
                                new Button().render({
                                    id: 'NewDayLabel',
                                    htmltext: 'Ok',
                                    class: 'newdaybox__button newdaybox__button--apply',
                                    onClick: this.CancelAction,
                                    children: []
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
                        new DivElement().render({
                            id: 'topLabelBox',
                            class: 'toplabelbox__container',
                            children: [
                                new Label().render({
                                    id: 'ToDoLabel',
                                    text: 'To Do List',
                                    class: 'toplabelbox__label'
                                }),
                                new DivElement().render({
                                    id: 'topLabelWidget',
                                    class: 'toplabelbox__widget',
                                    children: [
                                        new DivElement().render({
                                            id: 'topLabelIcon',
                                            class: 'widget__icon',
                                            style: 'background-image: url(' + this.weather.icon + ');',
                                            children: []
                                        }),
                                        new Label().render({
                                            id: 'topLabelTemperature',
                                            text: this.weather.temperature + '&#176',
                                            class: 'toplabelbox__text widget__text--temperature'
                                        }),
                                        new Label().render({
                                            id: 'topLabelCity',
                                            text: this.weather.position,
                                            class: 'toplabelbox__text widget__text--city'
                                        }),

                                    ]
                                })
                            ]
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

    LocateMe = () => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.weather.isLoad = true;
                    this.weather.position = position.coords.latitude + ',' + position.coords.longitude;
                    console.log(position.coords.latitude + ',' + position.coords.longitude);
                    this.weather.isLoad ? this.update() : '';
                },  
                (error) => {
                    this.weather.isLoad = true;
                    console.log(error);
                    this.weather.isLoad ? this.update() : '';
                }
            );
        }
    }

    WeatherCall = async () => {
        if (this.weather.isLoad) {
            const response = await fetch(
                this.weather.url + '/current.json?key=' + this.weather.key + '&q=' + this.weather.position
                )
                .then(response => response.json())
                .then(response => {
                    this.weather.temperature = response.current.temp_c;
                    this.weather.icon = response.current.condition.icon.replace('//cdn.weatherapi.com', 'icons');
                    this.weather.position = response.location.name;   
                    this.weather.isLoad = false;
                    console.log('weatherLoad = ok');     
                    this.update();            
                });
        } else {
            console.log('weatherLoad = skip')
        }
    }

    MorningGreatings = (currentDate) => {
        console.log('Good morning greetings');

            if (localStorage.getItem("currentDate")) {
                const previouseData = localStorage.getItem("currentDate");
                console.log('previouseData = ' + previouseData);
                console.log('currentDate = ' + currentDate);
                console.log('previouseData != currentDate ' + previouseData != currentDate);
                if (previouseData != currentDate) {

                    localStorage.setItem("currentDate", currentDate);
                    this.style.screenLock = "display: flex;";
                    this.style.newMorning = "display: flex;"; 
                    this.style.newBox = "display: none;";
                }

            } else {
                localStorage.setItem("currentDate", currentDate);
                this.style.screenLock = "display: flex;";
                this.style.newMorning = "display: flex;";
                this.style.newBox = "display: none;";  
            }
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

    AddMorningRows = (items) => {
        let rows = [];
        let i;
        for (i in items) {
            console.log(items[i]);
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

    addItem = () => {
        const newItemInput = document.getElementById('NewItemInput');

        this.style.screenLock = "display: none;";
        this.style.newBox = "display: none;";  
        this.style.newMorning = "display: none;";   

        this.setState(
        {items: [...this.state.items, 'item' + (this.state.items.length + 1)]},
        this.putIntoServer
        );
    }

    ApplyItem = () => {
        const newItemInput = document.getElementById("NewItemInput");

        this.style.screenLock = "display: none;";
        this.style.newBox = "display: none;";  
        this.style.newMorning = "display: none;";       
        this.setState(
        {items: [...this.state.items, newItemInput.value]},
        this.putIntoServer
        );
    }

    dummylog = () => {
        console.log('call from inside')
    }

    removeItem = (element, mkr = true) => {
        let states = this.state.items;
        const parent = element.srcElement.parentElement.id;
        const label = parent.replace("Task_", "TasksLabel_");
        const item = document.getElementById(label);
        const removed = states.splice(states.indexOf(item.innerHTML), 1);

        this.setState(
            {items: [...states]},
            mkr ? this.putIntoServer : this.dummylog
            );
        return removed[0];
    }

    removeCompletedItem = (element, mkr = true) => {
        let states = this.state.completeItems;
        const parent = element.srcElement.parentElement.id;
        const label = parent.replace("Complete_", "CompleteLabel_");
        const item = document.getElementById(label);
        const removed = states.splice(states.indexOf(item.innerHTML), 1);

        this.setState(
        {completeItems: [...states]}, 
        mkr ? this.putIntoServer : this.dummylog
        );
        return removed[0];
    }

    CancelAction = () => {
        console.log('cancel');
        this.style.screenLock = "display: none;";
        this.style.newBox = "display: none;";  
        this.style.newMorning = "display: none;";                 
        this.update();
    }

    NewTask = () => {
        const newItemButtonApply = document.getElementById('NewItemButtonApply');
        newItemButtonApply.classList.remove("newitembox__button--enabled");
        newItemButtonApply.classList.add("newitembox__button--disabled");
        newItemButtonApply.disabled = true;

        this.style.screenLock = "display: flex;";
        this.style.newBox = "display: flex;";  
        this.style.newMorning = "display: none;";
        this.update();

        const newItemInput = document.getElementById('NewItemInput');
        newItemInput.value = '';
        newItemInput.focus();
    }

    NewTaskSearch = () => {
        console.log('test');
        const newItemBox = document.getElementById('NewItemButtonApply');
        newItemBox.disabled == false ? newItemBox.onclick.apply() : '';
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
        const newitem = this.removeItem(element, false);
        console.log(newitem);
        this.state.completeItems = [...states, newitem],
        this.setState(
        {completeItems: [...states, newitem]},
        this.putIntoServer
        );
    }

    ItemUnComplete = (element) => {
        let states = this.state.items;
        const newitem = this.removeCompletedItem(element, false);
        console.log(newitem);
        this.setState(
        {items: [...states, newitem]},
        this.putIntoServer
        );
    }

    getFromServer = async () => {
        let itasks = [];
        let icomplete = [];
        localStorage.getItem("initTasks") ? localStorage.removeItem("initTasks") : '';
        localStorage.getItem("initComplete") ? localStorage.removeItem("initComplete") : '';

        const response = await fetch(this.localurl, { method: "GET" })
            .then((response) => response.json())
            .catch((error) => console.log(error));
        
        if (Array.isArray(response)) {
            console.log(response);
            let i;
            for (i of response) {
                if (i.isCompleted) {
                    icomplete.push(i.title);
                } else {
                    itasks.push(i.title);
                }
            }
        }

        localStorage.setItem("initTasks", itasks.join(";"));
        localStorage.setItem("initComplete", icomplete.join(";"));

        console.log('itasks0 = ' + itasks);

        this.state.items = itasks;
        this.state.completeItems = icomplete;
    }

    putIntoServer = async () => {
        let itasks = [];
        let icomplete = [];
        let i;
        localStorage.getItem("initTasks") ? itasks = localStorage.getItem("initTasks").split(";"): '';
        localStorage.getItem("initComplete") ? icomplete = localStorage.getItem("initComplete").split(";"): '';

        console.log('itasks = ' + itasks);
        let counter = 0;
        let data = [];
        for (i of itasks) {
            ++counter;
            data.push({ id: counter, title: i, isCompleted: false});
        };
        for (i of icomplete) {
            ++counter;
            data.push({ id: counter, title: i, isCompleted: true});
        };

        console.log(JSON.stringify(data));

        const response = await fetch(this.localurl, { method: "GET" })
            .then((response) => response.json())
            .catch((error) => console.log(error));

        if (Array.isArray(response)) {
            console.log(response);
            for (i in response) { 
                console.log('deleting task ' + (Math.floor(i) + 1));
                await fetch(this.localurl + '\/' + (Math.floor(i) + 1), { 
                method: "DELETE", 
                })
                .catch((error) => console.log(error));
            }
        }

        for (i in data) {
            console.log('post data =', data[i]);
            await fetch(this.localurl, { 
                method: "POST", 
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data[i])
                })
                .catch((error) => console.log(error));
        }
    }
   
}

document.body.appendChild(new App().render());

       