class App extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            completeItems: [],
            defaultsearch: undefined,
            newdayMkr: false,
            currentDate: new Date().toJSON().slice(0, 10).split("-").reverse().join("."),
            localurl: 'http://localhost:3004/tasks',
            githuburl: '',
            style: {
                screenLock: 'display: none;', 
                newMorning: 'display: none;', 
                newBox: "display: none;"
            },
            weather: {
                position: 'Tbilisi',
                temperature: '??',
                icon: 'icons/weather/64x64/day/116.png',
                key: 'd9e8739732f24f7f942112753231504',
                url: 'https://api.weatherapi.com/v1',
                isLoad: false
            }
            };

        if (localStorage.getItem("initTasks")) {
            this.state.items = localStorage.getItem("initTasks").split(";");
        };

        if (localStorage.getItem("initComplete")) {
            this.state.completeItems = localStorage.getItem("initComplete").split(";");
        };

        this.getFromServer();

        this.LocateMe();
    }

    render(props) {
        let tasks = this.AddRows(this.state.items);
        let completetasks = this.AddCompleteRows(this.state.completeItems);
        let morningrows = this.AddMorningRows(this.state.items);

        this.MorningGreatings(this.state.currentDate);
        this.WeatherCall();

        this.SearchPatternOnLoad(tasks, completetasks);

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
                    style: this.state.style.screenLock,
                    children: [
                        new NewItemWindow().render({
                            id: 'NewItemBox',
                            class: 'newitembox',
                            style: this.state.style.newBox,
                            onSearch: this.NewTaskSearch,
                            onInput: this.AproveNewItem,
                            currentDate: this.state.currentDate,
                            buttonOnClick_cancel: this.CancelAction,
                            buttonOnClick_apply: this.ApplyItem
                        }),
                        new GreetingWindow().render({
                            id: 'NewDayBox',
                            class: 'newdaybox',
                            style: this.state.style.newMorning,
                            buttonOnClick: this.CancelAction,
                            rows: morningrows
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
                                new WeatherWiget().render({
                                    id: 'topLabelWidget',
                                    class: 'toplabelbox__widget',
                                    weather: this.state.weather,
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
                                    value: this.state.defaultsearch,
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
                    this.state.weather.isLoad = true;
                    this.state.weather.position = position.coords.latitude + ',' + position.coords.longitude;
                    console.log(position.coords.latitude + ',' + position.coords.longitude);
                    this.state.weather.isLoad ? this.update() : '';
                },  
                (error) => {
                    this.state.weather.isLoad = true;
                    console.log(error);
                    this.state.weather.isLoad ? this.update() : '';
                }
            );
        }
    }

    WeatherCall = async () => {
        if (this.state.weather.isLoad) {
            const response = await fetch(
                this.state.weather.url + '/current.json?key=' + this.state.weather.key + '&q=' + this.state.weather.position
                )
                .then(response => response.json())
                .then(response => {
                    this.state.weather.temperature = response.current.temp_c;
                    this.state.weather.icon = response.current.condition.icon.replace('//cdn.weatherapi.com', 'icons');
                    this.state.weather.position = response.location.name;   
                    this.state.weather.isLoad = false;
                    console.log('weatherLoad = ok');     
                    this.update();            
                });
        } else {
            console.log('weatherLoad = skip')
        }
    }

    MorningGreatings = (currentDate) => {
        if (localStorage.getItem("currentDate")) {
            const previouseData = localStorage.getItem("currentDate");

            if (previouseData != currentDate) {
                localStorage.setItem("currentDate", currentDate);
                this.state.newdayMkr = true;
            }
        } else {
            localStorage.setItem("currentDate", currentDate);
            this.state.newdayMkr = true;
        }

        if (this.state.newdayMkr) {

            this.state.style.screenLock = "display: flex;";
            this.state.style.newMorning = "display: flex;";
            this.state.style.newBox = "display: none;";  
        }
        
    }

    SearchPatternOnLoad = (tasks, tasksComplete) => {
        let i;
        for (i in tasks) {
            tasks[i].style.display = "none";

            if (this.state.items[i].match(this.state.defaultsearch)){
                tasks[i].style.display = "flex";
            }  
        }
        for (i in tasksComplete) {
            tasksComplete[i].style.display = "none";

            if (this.state.completeItems[i].match(this.state.defaultsearch)){
                tasksComplete[i].style.display = "flex";
            }
        } 
    }

    SearchPattern = () => {

        this.state.defaultsearch = document.getElementById("SearchString").value;
        let i;
        for (i in this.state.items) {
            let element = document.getElementById("Task_" + i);
            element.style.display = "none";
            if (this.state.items[i].match(this.state.defaultsearch)){
                element.style.display = "flex";
            }     
        }
        for (i in this.state.completeItems) {
            let element = document.getElementById("Complete_" + i);
            element.style.display = "none";
            if (this.state.completeItems[i].match(this.state.defaultsearch)){
                element.style.display = "flex";
            }     
        }
    }

    AddMorningRows = (items) => {
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

    addItem = () => {
        const newItemInput = document.getElementById('NewItemInput');

        this.state.style.screenLock = "display: none;";
        this.state.style.newBox = "display: none;";  
        this.state.style.newMorning = "display: none;";   

        this.setState(
        {items: [...this.state.items, 'item' + (this.state.items.length + 1)]},
        this.putIntoServer
        );
    }

    ApplyItem = () => {
        const newItemInput = document.getElementById("NewItemInput");

        this.state.style.screenLock = "display: none;";
        this.state.style.newBox = "display: none;";  
        this.state.style.newMorning = "display: none;";       
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
        this.state.style.screenLock = "display: none;";
        this.state.style.newBox = "display: none;";  
        this.state.style.newMorning = "display: none;";  
        this.state.newdayMkr = false;               
        this.update();
    }

    NewTask = () => {
        const newItemButtonApply = document.getElementById('NewItemButtonApply');
        newItemButtonApply.classList.remove("newitembox__button--enabled");
        newItemButtonApply.classList.add("newitembox__button--disabled");
        newItemButtonApply.disabled = true;

        this.state.style.screenLock = "display: flex;";
        this.state.style.newBox = "display: flex;";  
        this.state.style.newMorning = "display: none;";
        this.update();

        const newItemInput = document.getElementById('NewItemInput');
        newItemInput.value = '';
        newItemInput.focus();
    }

    NewTaskSearch = () => {
        const newItemBox = document.getElementById('NewItemButtonApply');
        newItemBox.disabled == false ? newItemBox.onclick.apply() : '';
    }

    AddRows = (items) => {
        let i;
        let rows = [];
        for (i in items) {
            rows.push(
                new TaskRow().render({
                    class: 'tasks__row',
                    id: "Task_" + i,
                    prefix: "Tasks",
                    i: i,
                    item: items[i],
                    onChange: this.ItemComplete,
                    checked: false,
                    labelState: '',
                    tagState: ' tags__item--other',
                    buttonBacground: "background: flex",
                    buttonOnClick: this.removeItem
                })
            );
        }
        return rows;
    }

    AddCompleteRows = (items) => {
        let i;
        let rows = [];
        for (i in items) {
            rows.push( 
                new TaskRow().render({
                    class: 'tasks__row',
                    id: "Complete_" + i,
                    prefix: "Complete",
                    i: i,
                    item: items[i],
                    onChange: this.ItemUnComplete,
                    checked: true,
                    labelState: ' task--complete',
                    tagState: ' tags__item--inactive',
                    buttonBacground: "background: none",
                    buttonOnClick: ''
                })
            );
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
        console.log('get from server:')
        localStorage.getItem("initTasks") ? localStorage.removeItem("initTasks") : '';
        localStorage.getItem("initComplete") ? localStorage.removeItem("initComplete") : '';

        const response = await fetch(this.state.localurl, { method: "GET" })
            .then((response) => response.json())
            .catch((error) => console.log(error));
        
        if (Array.isArray(response)) {
            let i;
            for (i of response) {
                console.log('get: ' + i);
                if (i.isCompleted) {
                    icomplete.push(i.title);
                } else {
                    itasks.push(i.title);
                }
            }
        }

        localStorage.setItem("initTasks", itasks.join(";"));
        localStorage.setItem("initComplete", icomplete.join(";"));

        this.state.items = itasks;
        this.state.completeItems = icomplete;
    }

    putIntoServer = async () => {
        let itasks = [];
        let icomplete = [];
        console.log('put into server:')
        let i;
        localStorage.getItem("initTasks") ? itasks = localStorage.getItem("initTasks").split(";"): '';
        localStorage.getItem("initComplete") ? icomplete = localStorage.getItem("initComplete").split(";"): '';

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

        const response = await fetch(this.state.localurl, { method: "GET" })
            .then((response) => response.json())
            .catch((error) => console.log(error));

        if (Array.isArray(response)) {
            for (i in response) { 
                console.log('deleting ' + this.state.localurl + '\/' + (Math.floor(i) + 1));
                await fetch(this.state.localurl + '\/' + (Math.floor(i) + 1), { 
                method: "DELETE", 
                })
                .catch((error) => console.log(error));
            }
        }

        for (i in data) {
            console.log('posting ' + this.state.localurl + '\/' + (Math.floor(i) + 1));
            await fetch(this.state.localurl, { 
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

       