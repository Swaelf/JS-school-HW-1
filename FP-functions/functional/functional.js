(function () {
    let stateTasks = undefined;
    let stateComplete = undefined;
    let defaultsearch = undefined;
    let newdayMkr = false;
    const localurl = 'http://localhost:3004/tasks';
    let weather = {
        position: 'Tbilisi',
        temperature: '??',
        icon: 'icons/weather/64x64/day/116.png',
        key: 'd9e8739732f24f7f942112753231504',
        url: 'https://api.weatherapi.com/v1',
        isLoad: false
    };

    /**
     * Global application state
     * @template T
     * @param {T} initialValue
     * @returns {[T, function(T): void]}
     */
    function useState(state, initialValue) {
        state = state || initialValue;

        function setValue(state, newValue, mkr = true) {
            state = newValue;
            mkr ? renderApp(): '';
            return state;

        }

        return [state, setValue];
    }


    /**
     * Button component
     * @param id {string}
     * @param text {string}
     * @param appclass {string}
     * @param onClick {function}
     * @returns {HTMLButtonElement} - Button element
     */
    function Button({id, text, onClick, appclass}) {
        const button = document.createElement("button");
        button.id = id;
        button.innerHTML = text;
        button.onclick = onClick;
        button.classList = appclass;
        return button;
    }

    /**
     * Label component
     * @param id {string}
     * @param text {string}
     * @param appclass {string}
     * @returns {HTMLLabelElement} - Label element
     */
    function Label({id, text, appclass}) {
        const label = document.createElement("label");
        label.id = id;
        label.innerHTML = text;
        label.classList = appclass;
        return label;
    }

    /**
     * Input component
     * @param id {string}
     * @param text {string}
     * @param type {string}
     * @param appclass {string}
     * @param onInput {function}
     * @param onChange {function}
     * @param placeHolder {function}
     * @returns {HTMLInputElement} - Input element
     */
    function Input({id, text, appclass, type, onChange, onInput, onSearch, placeHolder}) {
        const input = document.createElement("input");
        input.id = id;
        input.onchange = onChange;
        input.oninput = onInput;
        input.onsearch = onSearch;
        input.type = type;
        input.placeholder = placeHolder;
        input.classList = appclass;
        return input;
    }

    /**
     * Div component
     * @param id {string}
     * @param text {string}
     * @param appclass {string}
     * @returns {HTMLDivElement} - Div element
     */
    function Div({id, text, appclass, background = undefined}) {
        const div = document.createElement("div");
        div.id = id;
        div.innerHTML = text;
        div.classList = appclass;
        background ? div.style.background = background : '';
        return div;
    }


    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
    function App() {
        let initTasks = [
            "Task 1 Title", 
            "Task 2 Title", 
            "Task 3 Title"
            ];
        let initComplete = [
            "Completed Task 1 Title", 
            "Completed Task 2 Title"
            ];
        
        localStorage.getItem("initTasks") ? initTasks = localStorage.getItem("initTasks").split(";"): '';
        localStorage.getItem("initComplete") ? initComplete = localStorage.getItem("initComplete").split(";"): '';

        let [items, setItems] = useState(stateTasks, initTasks);
        let [itemsComplete, setItemsComplete] = useState(stateComplete, initComplete);

        //console.log('complete', itemsComplete);

        function addCompleteItem(item) {
            stateComplete = setItemsComplete(stateComplete, [...itemsComplete, item]);
        }

        function ItemComplete(element) {  
            const newitem = removeItem(element, false);
            console.log(newitem);
            stateComplete = setItemsComplete(stateComplete, [...itemsComplete, newitem]);
        }

        function ItemUnComplete(element) {
            const newitem = removeCompletedItem(element, false);
            console.log(newitem);
            stateTasks = setItems(stateTasks, [...items, newitem]);
        }

        function removeItem(element, mkr) {
            const parent = element.srcElement.parentElement.id;
            const label = parent.replace("task_", "taskLabel_");
            const item = document.getElementById(label);
            const removed = items.splice(items.indexOf(item.innerHTML), 1);
            
            stateTasks = setItems(stateTasks, items, mkr);
            return removed[0];
        }

        function removeCompletedItem(element, mkr) {
            const parent = element.srcElement.parentElement.id;
            const label = parent.replace("complete_", "completeLabel_");
            const item = document.getElementById(label);
            const removed = itemsComplete.splice(itemsComplete.indexOf(item.innerHTML), 1);

            stateComplete = setItemsComplete(stateComplete, itemsComplete, mkr);
            return removed[0];
        }

        function AddRows() {
            for (i in items) {
                let row = Div({
                    id: "task_" + i, text: "", 
                    appclass: "tasks__row"
                });
                let taskCheck = Input({
                    id: "checkbox_task_" + i, 
                    text: "", appclass: "task__checkbox", 
                    type: "checkbox", 
                    onChange: ItemComplete
                });
                let labelContainer = Div({
                    id: "labelContainer_task" + i, 
                    text: "", 
                    appclass: "tasks__labelcontainer"
                });
                let delButton = Button({
                    id: "task_button_" + i, 
                    text: "", 
                    onClick: removeItem, 
                    appclass: "button__remove"
                });
                let tagHolder = Div({
                    id: "tagholder_task_" + i, 
                    text: "", 
                    appclass: "tasks__tagholder"
                });
                let taskLabel = Label({
                    id: "taskLabel_" + i, 
                    text: items[i], 
                    appclass: "task__text"
                });
                let tag = Div({id: "tag_task_" + i, 
                    text: "tag", 
                    appclass: "tags__item tags__item--other"
                });
                let time = Div({id: "time_task_" + i, 
                    text: "time", 
                    appclass: "tags__item tags__item--time"
                });

                tagHolder.append(tag, time);
                labelContainer.append(taskLabel, tagHolder);
                row.append(taskCheck, labelContainer, delButton);

                allTasks.append(row);
            }
        }

        function AddRowsCompleted() {
            for (i in itemsComplete) {
                let row = Div({
                    id: "complete_" + i, 
                    text: "", appclass: "tasks__row"
                });
                let taskCheck = Input({
                    id: "checkbox_complete_" + i, 
                    text: "", appclass: "task__checkbox", 
                    type: "checkbox", 
                    onChange: ItemUnComplete
                });

                taskCheck.checked = "checked";

                let labelContainer = Div({
                    id: "labelContainer_complete_" + i, 
                    text: "", appclass: "tasks__labelcontainer"
                });
                let delButton = Button({
                    id: "complete_button_" + i, 
                    text: "", 
                    onClick: "removeItem", 
                    appclass: "button__remove"
                });

                delButton.style.background = "none";

                let tagHolder = Div({
                    id: "tagholder_complete_" + i, 
                    text: "", 
                    appclass: "tasks__tagholder"
                });
                let taskLabel = Label({
                    id: "completeLabel_" + i, 
                    text: itemsComplete[i], 
                    appclass: "task__text task--complete"
                });
                let tag = Div({
                    id: "tag_complete_" + i, 
                    text: "tag", 
                    appclass: "tags__item tags__item--inactive"
                });
                let time = Div({
                    id: "time_complete_" + i, 
                    text: "time", 
                    appclass: "tags__item tags__item--time "
                });

                tagHolder.append(tag, time);
                labelContainer.append(taskLabel, tagHolder);
                row.append(taskCheck, labelContainer, delButton);
                completedTasks.append(row);
            }
        }

        function SearchPattern() {
            const pattern = document.getElementById("SearchString").value;
            defaultsearch = pattern;
            for (i in items) {
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

        function NewTask() {
            const screenlock = document.getElementById("screenlock");
            screenlock.style.display = "flex";
            const newItemBox = document.getElementById("newItemBox");
            newItemBox.style.display = "flex";

            const newItemButtonApply = document.getElementById("newItemButtonApply");

            newItemButtonApply.classList.remove("newitembox__button--enabled");
            newItemButtonApply.classList.add("newitembox__button--disabled");
            newItemButtonApply.disabled = true;  

            const newItemInput = document.getElementById('newItemInput');
            newItemInput.value = '';
            newItemInput.focus();                  
        }

        function NewTaskSearch() {
            const newItemButtonApply = document.getElementById("newItemButtonApply");
            newItemButtonApply.disabled == false ? newItemButtonApply.onclick.apply() : '';          
        }

        function ApplyItem() {
            const screenlock = document.getElementById("screenlock");
            screenlock.style.display = "none";
            const newItemBox = document.getElementById("newItemBox");
            newItemBox.style.display = "none";

            const newItemInput = document.getElementById("newItemInput");
            stateTasks = setItems(stateTasks, [...items, newItemInput.value]);
        }

        function CancelItem() {
            const screenlock = document.getElementById("screenlock");
            screenlock.style.display = "none";
            const newItemBox = document.getElementById("newItemBox");
            newItemBox.style.display = "none";
            const newDayBox = document.getElementById("newDayBox");
            newDayBox.style.display = "none";
            newdayMkr = false;
        }

        function AproveNewItem() {
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

        function MorningGreatings(currentDate, screenlock, newdaybox) {

            if (localStorage.getItem("currentDate")) {
                const previouseData = localStorage.getItem("currentDate");
                if (previouseData != currentDate) {
                    localStorage.setItem("currentDate", currentDate);
                    newdayMkr = true;
                }
            } else {
                localStorage.setItem("currentDate", currentDate);
                newdayMkr = true;
            }

            if (newdayMkr) {
                screenlock.style.display = "flex";
                newdaybox.style.display = "flex";
            }
        }

        function AddMorningRows() {

            for (i in items) {
                let morningTask = Label({
                    id: "morningTask_" + i, 
                    text: items[i], 
                    appclass: "newdaybox__text"
                })
                newDayTasks.append(morningTask);
            }
        }

        const date = new Date().toJSON().slice(0, 10).split("-");
        const currentDate = date.reverse().join(".");

        const div = Div({
            id: "appcontainer", 
            text: "", 
            appclass: "container"
        });

        const screenlock = Div({
            id: "screenlock", 
            text: "", 
            appclass: "screenlock"
        });

        const newDayBox = Div({
            id: "newDayBox", 
            text: "", 
            appclass: "newdaybox"
        });

        const newDayLabel = Label({
            id: "newDayLabel", 
            text: "Good Morning", 
            appclass: "newdaybox__label"
        });

        const newDayButton = Button({
            id: "newDayButton",
            text: "OK",
            appclass: "newdaybox__button newdaybox__button--apply",
            onClick: CancelItem
        });

        const newDayTasksLabel = Label({
            id: "newDayLabel", 
            text: "You have the next planned tasks for today: ", 
            appclass: "newdaybox__taskslabel"
        });

        const newDayTasks = Div({
            id: "newDayTasks", 
            text: "", 
            appclass: "newdaybox__tasks"
        });

        const newItemBox = Div({
            id: "newItemBox", 
            text: "", 
            appclass: "newitembox"
        });

        const newItemLabel = Label({
            id: "newItemLabel", 
            text: "Add New Item", 
            appclass: "newitembox__label"
        });

        const newItemInput = Input({
            id: "newItemInput", 
            placeHolder: "New Item", 
            appclass: "newitembox__input", 
            type: "search", 
            onChange: "", 
            onSearch: NewTaskSearch,
            onInput: AproveNewItem
        });

        const newItemAddition = Div({
            id: "newItemAddition", 
            text: "", 
            appclass: "newitembox__addition"
        });

        const newItemButtons = Div({
            id: "newItemButtons", 
            text: "", 
            appclass: "newitembox__buttons"
        });

        const newItemTags = Div({
            id: "newItemTags", 
            text: "", 
            appclass: "newitembox__tags"
        });

        const newItemTag = [
            Div({
                id: "newItemTag0", 
                text: "health", 
                appclass: "tags__item tags__item--health"
            }),

            Div({
                id: "newItemTag1", 
                text: "work", 
                appclass: "tags__item tags__item--work"
            }),

            Div({
                id: "newItemTag2", 
                text: "home", 
                appclass: "tags__item tags__item--home"
            }),

            Div({
                id: "newItemTag3", 
                text: "other", 
                appclass: "tags__item tags__item--other"
            })
        ];

        const newItemDate = Div({
            id: "newItemDate", 
            text: currentDate, 
            appclass: "newitembox__date"
        });

        const newItemButtonApply = Button({
            id: "newItemButtonApply", 
            text: "Add Task", 
            onClick: ApplyItem, 
            appclass: "newitembox__button newitembox__button--apply"
        });

        const newItemButtonCancel = Button({
            id: "newItemButtonCancel", 
            text: "Cancel", 
            onClick: CancelItem, 
            appclass: "newitembox__button newitembox__button--cancel"
        });

        const label = Label({
            id: "todo", 
            text: "To Do List", 
            appclass: "toplabelbox__label"
        });

        const button = Button({
            id: "AddButton", 
            text: "+ New Task", 
            onClick: NewTask, 
            appclass: "button__add"
        });

        const topbar = Div({
            id: "topBar", 
            text: "", 
            appclass: "topbar"
        });

        const tasks = Div({
            id: "task_container", 
            text: "", appclass: "tasks"
        });

        const allTasks = Div({
            id: "task_list", 
            text: "All Tasks", 
            appclass: "tasks__label"
        });

        const completedTasks = Div({
            id: "complete_list", 
            text: "Completed Tasks", 
            appclass: "tasks__label"
        });

        const searchBar = Input({
            id: "SearchString", 
            placeHolder: "Search Task", 
            appclass: "topbar__search", 
            type: "search", 
            onInput: SearchPattern
        });

        const topLabelBox = Div({
            id: "topLabelBox", 
            text: "", 
            appclass: "toplabelbox__container"
        });

        const topLabelWidget = Div({
            id: "topLabelWidget", 
            text: "", 
            appclass: "toplabelbox__widget"
        });

        const topLabelIcon = Div({
            id: "topLabelIcon", 
            text: "", 
            style: 'background-image: url(' + weather.icon + ');',
            appclass: "widget__icon"
        });

        const topLabelTemperature = Label({
            id: 'topLabelTemperature',
            text: weather.temperature + '&#176',
            appclass: 'toplabelbox__text widget__text--temperature'
        });

        const topLabelCity = Label({
            id: 'topLabelTemperature',
            text: weather.position,
            appclass: 'toplabelbox__text widget__text--city'
        });

        topLabelWidget.append(topLabelIcon, topLabelTemperature, topLabelCity);
        topLabelBox.append(label, topLabelWidget);

        newItemTags.append(...newItemTag);
        newItemAddition.append(newItemTags, newItemDate);
        newItemButtons.append(newItemButtonCancel, newItemButtonApply)
        newItemBox.append(newItemLabel, newItemInput, newItemAddition, newItemButtons);

        newDayBox.append(newDayLabel, newDayTasksLabel, newDayTasks, newDayButton);

        screenlock.append(newItemBox, newDayBox);

        topbar.append(searchBar, button);

        tasks.append(allTasks, completedTasks);

        div.append(screenlock, topLabelBox, topbar, tasks);

        AddRows();

        AddRowsCompleted();

        AddMorningRows();
        
        defaultsearch ? searchBar.value = defaultsearch : '';

        MorningGreatings(currentDate, screenlock, newDayBox);

        WeatherCall();

        localStorage.setItem("initTasks", items.join(";"));
        localStorage.setItem("initComplete", itemsComplete.join(";"));

        return div;
    }

    /**
     * Render the app.
     * On change whole app is re-rendered.
     */
    async function renderApp() {
        await getFromServer();
        const appContainer = document.getElementById("functional-example");
        appContainer.innerHTML = "";
        appContainer.append(App());
        document.getElementById("SearchString").oninput.apply();
        await putIntoServer();

    }

    function updateForWeather() {
        const appContainer = document.getElementById("functional-example");
        appContainer.innerHTML = "";
        appContainer.append(App());
        document.getElementById("SearchString").oninput.apply();   
    }

    async function getFromServer() {
        let itasks = [];
        let icomplete = [];
        localStorage.getItem("initTasks") ? localStorage.removeItem("initTasks") : '';
        localStorage.getItem("initComplete") ? localStorage.removeItem("initComplete") : '';

        const response = await fetch(localurl, { method: "GET" })
            .then((response) => response.json())
            .catch((error) => console.log(error));
        
        if (Array.isArray(response)) {
            console.log(response);
            for (i of response) {
                if (i.isCompleted) {
                    icomplete.push(i.title);
                    console.log('complete= ', i.title);
                } else {
                    itasks.push(i.title);
                    console.log('task = ', i.title);
                }
            }
        }

        localStorage.setItem("initTasks", itasks.join(";"));
        localStorage.setItem("initComplete", icomplete.join(";"));

        return itasks, icomplete;
    }

    async function putIntoServer() {
        let itasks = [];
        let icomplete = [];
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

        console.log(JSON.stringify(data));

        const response = await fetch(localurl, { method: "GET" })
            .then((response) => response.json())
            .catch((error) => console.log(error));

        if (Array.isArray(response)) {
            console.log(response);
            for (i in response) { 
                await fetch(localurl + '\/' + (Math.floor(i) + 1), { 
                method: "DELETE", 
                })
                .catch((error) => console.log(error));
            }
        }

        for (i in data) {
            await fetch(localurl, { 
                method: "POST", 
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data[i])
                })
                .catch((error) => console.log(error));
            }

        return itasks, icomplete;
    }

    function LocateMe() {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    weather.isLoad = true;
                    weather.position = position.coords.latitude + ',' + position.coords.longitude;
                    console.log(position.coords.latitude + ',' + position.coords.longitude);
                    weather.isLoad ? renderApp() : '';
                },  
                (error) => {
                    weather.isLoad = true;
                    console.log(error);
                    weather.isLoad ? renderApp() : '';
                }
            );
        }
    }

    async function WeatherCall() {
        if (weather.isLoad) {
            const response = await fetch(
                weather.url + '/current.json?key=' + weather.key + '&q=' + weather.position
                )
                .then(response => response.json())
                .then(response => {
                    weather.temperature = response.current.temp_c;
                    weather.icon = response.current.condition.icon.replace('//cdn.weatherapi.com', 'icons');
                    weather.position = response.location.name;   
                    weather.isLoad = false;
                    console.log('weatherLoad = ok');
                    updateForWeather();
                });
        } else {
            console.log('weatherLoad = skip')
        }
    }

    // initial render
    LocateMe();
    renderApp();
})();