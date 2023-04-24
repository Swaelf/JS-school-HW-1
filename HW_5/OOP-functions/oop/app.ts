
import Component from './Components/base.ts';
import ScreenlockElement from './Components/ScreenlockElement.ts';
import ContainerElement from './Components/ContainerElement.ts';
import TaskRow from './Components/TaskRow.ts';

import Properities from './Components/Properities'; 
import StateIterface from './Components/StateInterface'; 
import ItemInterface from './Components/ItemInterface'
import HTMLCommonElement from './Components/HTMLCommonElement'

import './app.css';


class App extends Component {
    props: Properities;
    state: StateIterface;  

    constructor() {
        super();
        this.state = {
            taskItems: [],
            completeItems: [],
            listOfTaskElements: [],
            listOfCompletedTaskElements: [],
            currentDate: new Date().toJSON().slice(0, 10).split("-").reverse().join("."),
            localurl: 'http://localhost:3004/tasks',
            githuburl: 'https://my-json-server.typicode.com/Swaelf/JS-school-HW-1/tasks',
            style: {
                screenLock: 'display: none;', 
                newMorning: 'display: none;', 
                newBox: 'display: none;'
            }
        };

        localStorage.setItem("searchPattern", '');
        localStorage.setItem("weatherForLoad", 'false');
        localStorage.setItem("positionGPS", 'false');
        localStorage.setItem('temperature', '??');
        localStorage.setItem('weathericon', 'icons/weather/64x64/day/116.png');

        this.GetDataFromServer();

        this.LocateMe();
    }

    render(props: Properities) {
        console.log('render');

        const [actualTasksElement, actualTaskElementId] = this.CreateListOfElements(this.state.taskItems, false);
        const [completedTasksElement, completedTaskElementId] = this.CreateListOfElements(this.state.completeItems, true);
        console.log('id =' + actualTasksElement);

        this.setState({
            taskItems: actualTaskElementId,
            completeItems: completedTaskElementId,
            listOfTaskElements: actualTasksElement,
            listOfCompletedTaskElements: completedTasksElement
        }, undefined, false);

        this.MorningGreatings(this.state.currentDate);

        this.SearchOnLoad();
        
        return super.render({
            id: 'oop_container',
            class: 'oop_container',
            PutDataIntoServer: this.PutDataIntoServer,
            GetDataFromServer: this.GetDataFromServer, 
            children: [
                new ScreenlockElement().render({
                    id: 'ScreenLock',
                    class: 'screenLock',
                    styles: this.state.style,
                    currentDate: this.state.currentDate,
                    buttonOnClick_cancel: this.CancelAction,
                    buttonOnClick_apply: this.ApplyItem,
                    tasks: this.state.taskItems
                }),
                new ContainerElement().render({
                    id: 'Container',
                    class: 'container',
                    RemoveItemFromTaskList: this.RemoveItemFromTaskList,
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
        localStorage.setItem("positionGPS", 'Tbilisi');

        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
            localStorage.setItem("weatherForLoad", 'true');
            this.update();
        } else {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    localStorage.setItem(
                        "positionGPS", 
                        position.coords.latitude + ',' + position.coords.longitude
                        );   
                    localStorage.setItem("weatherForLoad", 'true');  
                    console.log(position.coords.latitude + ',' + position.coords.longitude);
                    this.update();
                },  
                (error: never) => {
                    console.log(error);
                    localStorage.setItem("weatherForLoad", 'true');
                    this.update();
                }
            );
        }
    }

    MorningGreatings = (currentDate: string) => {
        if (localStorage.getItem("currentDate")) {
            const previouseData: string = localStorage.getItem("currentDate");

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
        let searchPattern: string = '';
        if (localStorage.getItem("searchPattern")) {
            searchPattern = localStorage.getItem("searchPattern");
        }
        let i: number;
        for (const i in this.state.listOfTaskElements) {
            this.state.listOfTaskElements[i].style.display = "none";
            if (this.state.taskItems[i].name.match(searchPattern)){
                this.state.listOfTaskElements[i].style.display = "flex";
            }  
        }
        for (const i in this.state.listOfCompletedTaskElements) {
            this.state.listOfCompletedTaskElements[i].style.display = "none";

            if (this.state.completeItems[i].name.match(searchPattern)){
                this.state.listOfCompletedTaskElements[i].style.display = "flex";
            }
        } 
    }

    ApplyItem = () => {
        const newItemInput: HTMLInputElement = document.getElementById("NewItemInput") as HTMLInputElement;

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
        console.log('call from inside');
    }

    RemoveItemFromTaskList = (element: MouseEvent, mkr: boolean = true) => {
        let states: ItemInterface[] = this.state.taskItems;
        const parent: string = (element.target as HTMLElement).parentElement.id;
        const item: HTMLDivElement = document.getElementById(parent) as HTMLDivElement;
        let pickedElement: number = -1;
        for (const i in states) {
            if (item.id == states[i].elementID) {
                pickedElement = parseInt(i);
            }
        }
        const removed: ItemInterface[] = states.splice(pickedElement, 1);

        this.setState(
            {taskItems: [...states]},
            mkr ? this.PutDataIntoServer : this.DummyLog
            );
        return removed[0];
    }

    RemoveItemFromCompletedTaskList = (element: MouseEvent, mkr: boolean = true) => {
        let states: ItemInterface[] = this.state.completeItems;
        const parent: string = (element.target as HTMLElement).parentElement.id;
        const item: HTMLDivElement = document.getElementById(parent) as HTMLDivElement;
        let pickedElement: number = -1;
        for (const i in states) {
            if (item.id == states[i].elementID) {
                pickedElement = parseInt(i);
            }
        }
        const removed: ItemInterface[] = states.splice(pickedElement, 1);

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
        const newItemButtonApply: HTMLButtonElement = document.getElementById('NewItemButtonApply') as HTMLButtonElement;
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
        const newItemInput: HTMLInputElement = document.getElementById('NewItemInput') as HTMLInputElement;
        newItemInput.value = '';
        newItemInput.focus();
    }

    CreateListOfElements = (items: ItemInterface[], complete: boolean) => {
        let params: Properities;
        let rows: HTMLCommonElement[] = [];
        let fixedItems: ItemInterface[] = [...items];
        if (complete == false) {
            params = {
                id: '',
                class: '',
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
                id: '',
                class: '',
                pattern: "Complete_",
                prefix: "Complete",
                onChange: this.SetItemAsActual,
                checked: true,
                labelState: ' task--complete',
                tagState: ' tags__item--inactive',
                buttonBacground: "background: none",
            }
        };
        for (const i in items) {
            params.id = params.pattern + parseInt(i);
            params.i = parseInt(i);
            params.item = items[i];
            rows.push(
                new TaskRow().render(params)
            );
            fixedItems[i].elementID = params.pattern + parseInt(i);
        }

        let result: [HTMLCommonElement[], ItemInterface[]] = [rows, fixedItems];
        return result;
    }

    SetItemAsCompleted = (element: MouseEvent) => {     
        let states: ItemInterface[] = this.state.completeItems; 
        const removedItem = this.RemoveItemFromTaskList(element, false);
        removedItem.isCompleted = true;
        console.log(removedItem);
        this.setState({
            completeItems: [...states, removedItem]
        },
        this.PutDataIntoServer
        );
    }

    SetItemAsActual = (element: MouseEvent) => {
        let states: ItemInterface[]  = this.state.taskItems;
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
                    console.log('deleting ' + this.state.localurl + '\/' + (parseInt(i) + 1).toString());
                    await fetch(this.state.localurl + '\/' + (parseInt(i) + 1).toString(), { 
                    method: "DELETE", 
                    })
                    .catch((error) => console.log(error));
                }
            }

            for (i in data) {
                console.log('posting ' + this.state.localurl + '\/' + (parseInt(i) + 1).toString());
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
                            console.log('deleting ' + this.state.githuburl + '\/' + (parseInt(i) + 1).toString());
                            await fetch(this.state.githuburl + '\/' + (parseInt(i) + 1).toString(), { 
                            method: "DELETE", 
                            })
                            .catch((error) => console.log(error));
                        }
                    }

                    for (i in data) {
                        console.log('posting ' + this.state.githuburl + '\/' + (parseInt(i) + 1).toString());
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

document.body.appendChild(new App().render({}));


       
