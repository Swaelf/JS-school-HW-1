import Component from './Components/base.ts';
import ScreenlockElement from './Components/ScreenlockElement.ts';
import ContainerElement from './Components/ContainerElement.ts';
import TaskRowCompleted from './Components/TaskRowCompleted.ts';
import TaskRowUncompleted from './Components/TaskRowUncompleted.ts';


import Properities from './Interfaces/Properities'; 
import StateIterface from './Interfaces/StateInterface'; 
import ItemInterface from './Interfaces/ItemInterface'
import HTMLCommonElement from './Interfaces/HTMLCommonElement'

import './app.css';

const config = require ('./appconfig.json');

class App extends Component {

    constructor() {
        super();
        this.CheckServerAvailability(config.localurl)
            .then((isAvailable: boolean) => {
                if (isAvailable) {
                localStorage.setItem("server_url", config.localurl);
                } else {
                localStorage.setItem("server_url", config.githuburl);
                }         
            })
            .catch((error: string) => {
                localStorage.setItem("server_url", config.githuburl);
            })
            .finally(() => {
                this.GetDataFromServer();
            })

        this.setState({
            weather: {
                position: config.defaultCity,
                temperature: '??',
                icon: config.weathericon,
                weatherForLoad: 'false'
            },
            currentDate: new Date().toJSON().slice(0, 10).split("-").reverse().join(".")
        });

        localStorage.setItem("searchPattern", '');

        this.LocateMe();
    }

    render(props: Properities) {

        this.CreateListOfElements(this.state.taskList);

        this.WeatherCall();

        this.MorningGreatings(this.state.currentDate);

        this.SearchOnLoad();
        
        return super.render({
            id: 'oop_container',
            class: 'oop_container',
            children: [
                new ScreenlockElement().render({
                    id: 'ScreenLock',
                    class: 'screenLock',
                    currentDate: this.state.currentDate,
                    buttonOnClick_cancel: this.CancelAction,
                    buttonOnClick_apply: this.ApplyItem,
                    taskList: this.state.taskList
                }),
                new ContainerElement().render({
                    id: 'Container',
                    class: 'container',
                    taskList: this.state.taskList,
                    weather: this.state.weather,
                    onButtonClick: this.CallNewTaskWindow,
                    actualTasksChildren: this.state.listOfUncompletedTaskElements ,
                    completedTasksChildren: this.state.listOfCompletedTaskElements          
                })
            ]
        });
        
    }

    LocateMe = () => {
        if (!navigator.geolocation) {
            window.alert("Geolocation is not supported by your browser");
            this.setState({
                weather: {
                    ...this.state.weather,
                    weatherForLoad: 'true'
                }
            });
        } else {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    this.setState({
                        weather: {
                            ...this.state.weather,
                            position: position.coords.latitude + ',' + position.coords.longitude,
                            weatherForLoad: 'true'
                        }
                    });
                },  
                (error: never) => {
                    console.log("navigation error:", error);
                    this.setState({
                        weather: {
                            ...this.state.weather,
                            weatherForLoad: 'true'
                        }
                    });
                }
            );
        }
    }

    WeatherCall = async () => {
        if (this.state.weather.weatherForLoad == 'true') {
            this.setState({
                weather: {
                    ...this.state.weather,
                    weatherForLoad: 'false'
                }
            });
            await fetch(
                config.weatherUrl + '/current.json?key=' + config.weatherKey + '&q=' + this.state.weather.position
                )
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        weather: {
                            ...this.state.weather,
                            position: response.location.name,
                            temperature: response.current.temp_c,
                            icon: response.current.condition.icon.replace('//cdn.weatherapi.com', 'icons')
                        }
                    });
                    console.log('weatherLoad = ok'); 
                });        
        } 
    }

    MorningGreatings = (currentDate: string) => {
        if (localStorage.getItem("currentDate")) {
            if (localStorage.getItem("currentDate") != currentDate) {
                localStorage.setItem("currentDate", currentDate);
                localStorage.setItem("modalWindowState", '1');
            }
        } else {
            localStorage.setItem("currentDate", currentDate);
            localStorage.setItem("modalWindowState", '1');
        }
    }

    SearchOnLoad = () => {
        let searchPattern: string = '';
        if (localStorage.getItem("searchPattern")) {
            searchPattern = localStorage.getItem("searchPattern");
        };

        for (let i in this.state.taskList) {
            this.state.taskList[i].htmlElement.className = ("tasks__row");
            if (!this.state.taskList[i].name.match(searchPattern)){
                this.state.taskList[i].htmlElement.className = ("tasks__row tasks__row--disabled");
            }  
        }
    }

    ApplyItem = () => {
        const taskList: ItemInterface[] = this.state.taskList;
        const newItemInput: HTMLInputElement = document.getElementById("NewItemInput") as HTMLInputElement;
        const newItemData: HTMLInputElement = document.getElementById("NewItemDate") as HTMLInputElement;
       
        let newId: number = taskList.length + 1;
        
        for (let index: number = 0; index <= taskList.length - 1; index++) {
            if ((taskList.find(task => task.id == index + 1)) == undefined) {
                newId = index + 1; 
                break;
            }
        }

        const newTask: ItemInterface = {
            id: newId, 
            name: newItemInput.value, 
            isCompleted: false,
            plannedDate: newItemData.innerHTML,
            tag: localStorage.getItem('currentTag')
        };

        this.PostNewDataIntoServer(newTask);

        localStorage.setItem("modalWindowState", '0');
        localStorage.setItem("currentTag", 'other');

        this.setState({
            taskList: [...taskList, newTask],
        });

    }

    RemoveItemFromTaskList = (element: MouseEvent, mkr: boolean = true) => {
        let taskList: ItemInterface[] = this.state.taskList;
        const parent: HTMLCommonElement = (element.target as HTMLElement).parentElement as HTMLCommonElement;
        const pickedElementIndex: number = taskList.indexOf(taskList.find(task => task.htmlElement == parent));
        const removedElement: ItemInterface[] = taskList.splice(pickedElementIndex, 1);

        this.DeleteDataFromServer(removedElement[0]);

        this.setState(
            {taskList: [...taskList]},
            );
    }

    CancelAction = () => {
        localStorage.setItem("modalWindowState", '0');
        this.update();
    }

    CallNewTaskWindow = () => {
        const newItemButtonApply: HTMLButtonElement = document.getElementById('NewItemButtonApply') as HTMLButtonElement;
        newItemButtonApply.disabled = true;
        
        localStorage.setItem("modalWindowState", '2');

        this.update();

        const newItemInput: HTMLInputElement = document.getElementById('NewItemInput') as HTMLInputElement;
        newItemInput.value = '';
        newItemInput.focus();

        
    }

    CreateListOfElements = (itemList: ItemInterface[]) => {
        let params: Properities;
        let rowsOfUncompletedTasks: HTMLCommonElement[] = [];
        let rowsOfCompetedTasks: HTMLCommonElement[] = [];

        for (let index in itemList) {
            params = {
                item: itemList[index],
                onChange: this.ChangeItemCompleteState
            };
            if (itemList[index].isCompleted == false) {
                params.buttonOnClick = this.RemoveItemFromTaskList;
                let rowElement = new TaskRowUncompleted().render(params)
                itemList[index].htmlElement = rowElement;
                rowsOfUncompletedTasks.push(rowElement);
            } else {
                let rowElement = new TaskRowCompleted().render(params)
                itemList[index].htmlElement = rowElement;
                rowsOfCompetedTasks.push(rowElement);
            };
        }

        this.setState({
            taskList: itemList,
            listOfUncompletedTaskElements: rowsOfUncompletedTasks,
            listOfCompletedTaskElements: rowsOfCompetedTasks
        }, false);
    }

    ChangeItemCompleteState = (event: MouseEvent) => {  
        let taskList: ItemInterface[] = this.state.taskList;
        const parent: HTMLCommonElement = (event.target as HTMLElement).parentElement;

        let pickedElement = this.state.taskList.find(task => task.htmlElement === parent);

        pickedElement.isCompleted = !pickedElement.isCompleted;
        this.UpdateDataOnServer(pickedElement);

        this.update();
    }

    GetDataFromServer = async () => {
        let taskList: ItemInterface[] = [];
        const serverUrl: string = localStorage.getItem("server_url");

        if (serverUrl) {
            await fetch(serverUrl, { method: "GET" })
                .then((data) => data.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        for (let item of data) {
                            taskList.push({
                                name: item.title, 
                                id: item.id, 
                                isCompleted: item.isCompleted,
                                plannedDate: item.plannedDate,
                                tag: item.tag
                            });
                        }
                    }
                })
                .catch((error) => {window.alert(error)})

            this.setState({
                taskList: taskList,
            });
        }
    }

    PostNewDataIntoServer = async (data: ItemInterface) => {
        const serverUrl: string = localStorage.getItem("server_url");
 
        await fetch(serverUrl, { 
            method: "POST", 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id: data.id, 
                title:data.name, 
                isCompleted: data.isCompleted,
                plannedDate: data.plannedDate,
                tag: data.tag
            })
            })
            .catch((error) => window.alert(error));
    }

    DeleteDataFromServer = async (data: ItemInterface) => {
        const serverUrl: string = localStorage.getItem("server_url");

        await fetch(serverUrl + '\/' + data.id, {method: "DELETE"})
            .catch((error) => window.alert(error));
    }

    UpdateDataOnServer = async (data: ItemInterface) => {
        const serverUrl: string = localStorage.getItem("server_url");

        await fetch(serverUrl + '\/' + data.id, { 
            method: "PUT", 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id: data.id, 
                title:data.name, 
                isCompleted: data.isCompleted,
                plannedDate: data.plannedDate,
                tag: data.tag
            })
            })
            .catch((error) => window.alert(error));
    }

    CheckServerAvailability = async (url: string): Promise<boolean> => {
        try {
            const response = await fetch(url);
            return response.ok;
        } catch (error) {
            return false;
        }
    };
   
}

document.body.appendChild(new App().render({}));


       
