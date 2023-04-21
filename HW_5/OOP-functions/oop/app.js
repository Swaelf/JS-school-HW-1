import './main.css' ;
import Component from './base.js'
import {ScreenlockElement, ContainerElement, TaskRow} from './components.js'

class App extends Component {
    constructor() {
        super();
        this.state = {
            taskItems: [],
            completeItems: [],
            listOfTaskElements: '',
            listOfCompletedTaskElements: '',
            currentDate: new Date().toJSON().slice(0, 10).split("-").reverse().join("."),
            localurl: 'http://localhost:3004/tasks',
            githuburl: 'https://my-json-server.typicode.com/Swaelf/JS-school-HW-1/tasks',
            weatherUrl: 'https://api.weatherapi.com/v1',
            weatherKey: 'd9e8739732f24f7f942112753231504',
            style: {
                screenLock: 'display: none;', 
                newMorning: 'display: none;', 
                newBox: 'display: none;'
            },
            weather: {
                position: 'Tbilisi',
                temperature: '??',
                icon: 'icons/weather/64x64/day/116.png',
                forLoad: false
            }
            };

        localStorage.setItem("searchPattern", '');

        this.GetDataFromServer();

        this.LocateMe();
    }

    render(props) {

        console.log('render');

        const [actualTasksElement, actualTaskElementId] = this.CreateListOfElements(this.state.taskItems, false);
        const [completedTasksElement, completedTaskElementId] = this.CreateListOfElements(this.state.completeItems, true);
        console.log('id =' + actualTasksElement);

        this.setState({
            taskItems: actualTaskElementId,
            completeItems: completedTaskElementId,
            listOfTaskElements: actualTasksElement,
            listOfCompletedTaskElements: completedTasksElement
        }, false, false);

        this.MorningGreatings(this.state.currentDate);

        this.WeatherCall();

        this.SearchOnLoad();
        
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
                    taskItems: this.state.taskItems,
                    completeItems: this.state.completeItems,
                    onButtonClick: this.CallNewTaskWindow,
                    actualTasksChildren: this.state.listOfTaskElements ,
                    completedTasksChildren: this.state.listOfCompletedTaskElements          
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

    SearchOnLoad = () => {
        let searchPattern = '';
        if (localStorage.getItem("searchPattern")) {
            searchPattern = localStorage.getItem("searchPattern");
        }
        let i;
        for (i in this.state.listOfTaskElements) {
            this.state.listOfTaskElements[i].style.display = "none";
            console.log(this.state.taskItems[i]);
            console.log(searchPattern);
            if (this.state.taskItems[i].name.match(searchPattern)){
                this.state.listOfTaskElements[i].style.display = "flex";
            }  
        }
        for (i in this.state.listOfCompletedTaskElements) {
            this.state.listOfCompletedTaskElements[i].style.display = "none";

            if (this.state.completeItems[i].name.match(searchPattern)){
                this.state.listOfCompletedTaskElements[i].style.display = "flex";
            }
        } 
    }

    ApplyItem = () => {
        const newItemInput = document.getElementById("NewItemInput");

        this.setState({
            taskItems: [...this.state.taskItems, {name: newItemInput.value, isCompleted: false}],
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
        let i;
        const parent = element.srcElement.parentElement.id;
        const item = document.getElementById(parent);
        let pickedElement = -1;
        for (i in states) {
            if (item.id == states[i].elementID) {
                pickedElement = i;
            }
        }
        const removed = states.splice(pickedElement, 1);

        this.setState(
            {taskItems: [...states]},
            mkr ? this.PutDataIntoServer : this.DummyLog
            );
        return removed[0];
    }

    RemoveItemFromCompletedTaskList = (element, mkr = true) => {
        let states = this.state.completeItems;
        let i;
        const parent = element.srcElement.parentElement.id;
        const item = document.getElementById(parent);
        let pickedElement = -1;
        for (i in states) {
            if (item.id == states[i].elementID) {
                pickedElement = i;
            }
        }
        const removed = states.splice(pickedElement, 1);

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

    CallNewTaskWindow = () => {
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
        let fixedItems = [...items];
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
            fixedItems[i].elementID = params.pattern + i;
        }
        return [rows, fixedItems];
    }

    SetItemAsCompleted = (element) => {     
        let states = this.state.completeItems; 
        const removedItem = this.RemoveItemFromTaskList(element, false);
        removedItem.isCompleted = true;
        console.log(removedItem);
        this.setState({
            completeItems: [...states, removedItem]
        },
        this.PutDataIntoServer
        );
    }

    SetItemAsActual = (element) => {
        let states = this.state.taskItems;
        const removedItem = this.RemoveItemFromCompletedTaskList(element, false);
        removedItem.isCompleted = false;
        console.log(removedItem);
        this.setState(
            {taskItems: [...states, removedItem]},
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
                    icomplete.push({name: i.title, id: i.id, isCompleted: i.isCompleted});
                } else {
                    itasks.push({name: i.title, id: i.id, isCompleted: i.isCompleted});
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
            data.push({ id: counter, title: i.name, isCompleted: false});
        };
        for (i of this.state.completeItems) {
            ++counter;
            data.push({ id: counter, title: i.name, isCompleted: true});
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


       
