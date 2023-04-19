class App extends Component {
    constructor() {
        super();
        this.state = {
            taskItems: [],
            completeItems: [],
            defaultSearchPattern: undefined,
            currentDate: new Date().toJSON().slice(0, 10).split("-").reverse().join("."),
            localurl: 'http://localhost:3004/tasks',
            githuburl: 'https://my-json-server.typicode.com/Swaelf/JS-school-HW-1/tasks',
            weatherUrl: 'https://api.weatherapi.com/v1',
            weatherKey: 'd9e8739732f24f7f942112753231504',
            style: {
                screenLock: 'display: none;', 
                newMorning: 'display: none;', 
                newBox: "display: none;"
            },
            weather: {
                position: 'Tbilisi',
                temperature: '??',
                icon: 'icons/weather/64x64/day/116.png',
                forLoad: false
            }
            };

        this.GetDataFromServer();

        this.LocateMe()
    }

    render(props) {

        let listOfTaskElements = this.CreateListOfElements(this.state.taskItems, false);
        let listOfCompletedTaskElements = this.CreateListOfElements(this.state.completeItems, true);

        this.MorningGreatings(this.state.currentDate);

        this.WeatherCall();

        this.SearchOnLoad(listOfTaskElements, listOfCompletedTaskElements);
        
        return super.render({
            id: 'oop_container',
            class: 'oop_container',
            PutDataIntoServer: this.PutDataIntoServer,
            GetDataFromServer: this.GetDataFromServer, 
            children: [
                new ScreenlockElement().render({
                    id: 'ScreenLock',
                    class: 'screenlock',
                    style: this.state.style,
                    currentDate: this.state.currentDate,
                    buttonOnClick_cancel: this.CancelAction,
                    buttonOnClick_apply: this.ApplyItem,
                    tasks: this.state.taskItems
                }),
                new ContainerElement().render({
                    id: 'Container',                
                    class: 'container',
                    RemoveItemFromTaskList: this.RemoveItemFromTaskList,
                    weather: this.state.weather,
                    inputSearchValue: this.state.defaultSearchPattern,
                    onSearchInput: this.SearchInListsOfTasks,
                    onButtonClick: this.NewTask,
                    actualTasksChildren: listOfTaskElements ,
                    completedTasksChildren: listOfCompletedTaskElements          
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
                    this.setState({
                        weather: {
                            position: position.coords.latitude + ',' + position.coords.longitude,
                            temperature: this.state.weather.temperature,
                            icon: this.state.weather.icon,
                            forLoad: true
                        }
                    });
                   console.log(position.coords.latitude + ',' + position.coords.longitude);
                },  
                (error) => {
                    this.setState({
                        weather: {
                            position: this.state.weather.position,
                            temperature: this.state.weather.temperature,
                            icon: this.state.weather.icon,
                            forLoad: true
                        }
                    });
                    console.log(error);
                }
            );
        }
    }

    WeatherCall = async () => {
        if (this.state.weather.forLoad) {
            const response = await fetch(
                this.state.weatherUrl + '/current.json?key=' + this.state.weatherKey + '&q=' + this.state.weather.position
                )
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        weather: {
                            position: response.location.name,
                            temperature: response.current.temp_c,
                            icon: response.current.condition.icon.replace('//cdn.weatherapi.com', 'icons'),
                            forLoad: false
                        } 
                    });
                    console.log('weatherLoad = ok');              
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
                this.setState({
                     style: {
                        screenLock: 'display: flex;', 
                        newMorning: 'display: flex;', 
                        newBox: "display: none;"
                        }
                });
            }
        } else {
            localStorage.setItem("currentDate", currentDate);
            this.setState({
                style: {
                    screenLock: 'display: flex;', 
                    newMorning: 'display: flex;', 
                    newBox: "display: none;"
                    },
            });
        }
    }

    SearchOnLoad = (tasksActual, tasksComplete) => {
        let i;
        for (i in tasksActual) {
            tasksActual[i].style.display = "none";

            if (this.state.taskItems[i].match(this.state.defaultSearchPattern)){
                tasksActual[i].style.display = "flex";
            }  
        }
        for (i in tasksComplete) {
            tasksComplete[i].style.display = "none";

            if (this.state.completeItems[i].match(this.state.defaultSearchPattern)){
                tasksComplete[i].style.display = "flex";
            }
        } 
    }

    SearchInListsOfTasks = () => {

        this.state.defaultSearchPattern = document.getElementById("SearchString").value;
        let i;
        for (i in this.state.taskItems) {
            let element = document.getElementById("Task_" + i);
            element.style.display = "none";
            if (this.state.taskItems[i].match(this.state.defaultSearchPattern)){
                element.style.display = "flex";
            }     
        }
        for (i in this.state.completeItems) {
            let element = document.getElementById("Complete_" + i);
            element.style.display = "none";
            if (this.state.completeItems[i].match(this.state.defaultSearchPattern)){
                element.style.display = "flex";
            }     
        }
    }

    ApplyItem = () => {
        const newItemInput = document.getElementById("NewItemInput");

        this.setState({
            taskItems: [...this.state.taskItems, newItemInput.value],
            style: {
                    screenLock: 'display: none;', 
                    newMorning: 'display: none;', 
                    newBox: "display: none;"
            },
        },
        this.PutDataIntoServer
        );
    }

    DummyLog = () => {
        console.log('call from inside')
    }

    RemoveItemFromTaskList = (element, mkr = true) => {
        let states = this.state.taskItems;
        const parent = element.srcElement.parentElement.id;
        const label = parent.replace("Task_", "TasksLabel_");
        const item = document.getElementById(label);
        const removed = states.splice(states.indexOf(item.innerHTML), 1);

        this.setState(
            {taskItems: [...states]},
            mkr ? this.PutDataIntoServer : this.DummyLog
            );
        return removed[0];
    }

    RemoveItemFromCompletedTaskList = (element, mkr = true) => {
        let states = this.state.completeItems;
        const parent = element.srcElement.parentElement.id;
        const label = parent.replace("Complete_", "CompleteLabel_");
        const item = document.getElementById(label);
        const removed = states.splice(states.indexOf(item.innerHTML), 1);

        this.setState(
            {completeItems: [...states]}, 
            mkr ? this.PutDataIntoServer : this.DummyLog
        );
        return removed[0];
    }

    CancelAction = () => {
        console.log('cancel');
        this.setState(
            { style: {
                screenLock: 'display: none;', 
                newMorning: 'display: none;', 
                newBox: "display: none;"
            }, 
            newdayMkr: false
        });
    }

    NewTask = () => {
        const newItemButtonApply = document.getElementById('NewItemButtonApply');
        newItemButtonApply.classList.remove("newitembox__button--enabled");
        newItemButtonApply.classList.add("newitembox__button--disabled");
        newItemButtonApply.disabled = true;

        this.setState(
            { style: {
                screenLock: 'display: flex;', 
                newMorning: 'display: none;', 
                newBox: "display: flex;"
            }
        });
        const newItemInput = document.getElementById('NewItemInput');
        newItemInput.value = '';
        newItemInput.focus();
    }

    CreateListOfElements = (items, complete) => {
        let i;
        let params;
        let rows = [];
        if (complete == false) {
            params = {
                class: 'tasks__row',
                pattern: "Task_",
                prefix: "Tasks",
                onChange: this.SetItemAsCompleted,
                checked: false,
                labelState: '',
                tagState: ' tags__item--other',
                buttonBacground: "background: flex",
                buttonOnClick: this.RemoveItemFromTaskList
            }
        } else {
            params = {
                class: 'tasks__row',
                pattern: "Complete_",
                prefix: "Complete",
                onChange: this.SetItemAsActual,
                checked: true,
                labelState: ' task--complete',
                tagState: ' tags__item--inactive',
                buttonBacground: "background: none",
                buttonOnClick: ''
            }
        };
        for (i in items) {
            params.id = params.pattern + i;
            params.i = i;
            params.item = items[i];
            rows.push(
                new TaskRow().render(params)
            );
        }
        return rows;
    }

    SetItemAsCompleted = (element) => {     
        let states = this.state.completeItems; 
        const newitem = this.RemoveItemFromTaskList(element, false);
        console.log(newitem);
        this.setState({
            completeItems: [...states, newitem]
        },
        this.PutDataIntoServer
        );
    }

    SetItemAsActual = (element) => {
        let states = this.state.taskItems;
        const newitem = this.RemoveItemFromCompletedTaskList(element, false);
        console.log(newitem);
        this.setState(
            {taskItems: [...states, newitem]},
            this.PutDataIntoServer
        );
    }

    GetDataFromServer = async () => {
        let itasks = this.state.taskItems;
        let icomplete = this.state.completeItems;
        let response = undefined;
        console.log('get from server:')

        try {
            response = await fetch(this.state.localurl, { method: "GET" })
                .then((response) => response.json())
        } catch (err) {
            console.log(err);
            if (err = TypeError()) {
                console.log(err);
                try {
                    response = await fetch(this.state.githuburl, { method: "GET" })
                    .then((response) => response.json())
                } catch (err1) {
                   console.log(err1); 
                   response = undefined;
                }
            } else {
                console.log('failed to connect to server')
                response = undefined;
            }
        }

        if (Array.isArray(response)) {
            let i;
            for (i of response) {
                console.log('get: ' + i.title);
                if (i.isCompleted) {
                    icomplete.push(i.title);
                } else {
                    itasks.push(i.title);
                }
            }
        }

        this.setState({
            taskItems: itasks,
            completeItems: icomplete
        });
    }

    PutDataIntoServer = async () => {
        let response = undefined;
        console.log('put into server:')
        let i;
        let counter = 0;
        let data = [];
        for (i of this.state.taskItems) {
            ++counter;
            data.push({ id: counter, title: i, isCompleted: false});
        };
        for (i of this.state.completeItems) {
            ++counter;
            data.push({ id: counter, title: i, isCompleted: true});
        };

        try {
            response = await fetch(this.state.localurl, { method: "GET" })
                .then((response) => response.json())

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

        } catch (err) {
            console.log(err);
            if (err = TypeError()) {
                console.log(err);
                try {
                    response = await fetch(this.state.githuburl, { method: "GET" })
                    .then((response) => response.json())

                    if (Array.isArray(response)) {
                        for (i in response) { 
                            console.log('deleting ' + this.state.githuburl + '\/' + (Math.floor(i) + 1));
                            await fetch(this.state.githuburl + '\/' + (Math.floor(i) + 1), { 
                            method: "DELETE", 
                            })
                            .catch((error) => console.log(error));
                        }
                    }

                    for (i in data) {
                        console.log('posting ' + this.state.githuburl + '\/' + (Math.floor(i) + 1));
                        await fetch(this.state.githuburl, { 
                            method: "POST", 
                            headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            },
                            body: JSON.stringify(data[i])
                            })
                            .catch((error) => console.log(error));
                    }

                } catch (err1) {
                   console.log(err1); 
                   response = undefined;
                }
            } else {
                console.log('failed to connect to server')
                response = undefined;
            }
        }

    }
   
}

document.body.appendChild(new App().render());

       
