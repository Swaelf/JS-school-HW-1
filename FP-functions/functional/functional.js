(function () {
    let state = undefined;
    let stateComplete = undefined;
    let defaultsearch = undefined;

    /**
     * Global application state
     * @template T
     * @param {T} initialValue
     * @returns {[T, function(T): void]}
     */
    function useState(initialValue) {
        state = state || initialValue;

        function setValue(newValue) {
            state = newValue;
            renderApp();
        }

        return [state, setValue];
    }

    /**
     * Global application state for completed
     * @template T
     * @param {T} initialValue
     * @returns {[T, function(T): void]}
     */
    function useStateComplete(initialValue) {
        stateComplete = stateComplete || initialValue;

        function setValue(newValue) {
            stateComplete = newValue;
            renderApp();
        }

        return [stateComplete, setValue];
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
    function Div({id, text, appclass}) {
        const div = document.createElement("div");
        div.id = id;
        div.innerHTML = text;
        div.classList = appclass;
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
        
        const [items, setItems] = useState(initTasks);
        const [itemsComplete, setItemsComplete] = useStateComplete(initComplete);

        function addCompleteItem(item) {
            setItemsComplete([...itemsComplete, item]);
        }

        function ItemComplete(element) {      
            const newitem = removeItem(element);
            console.log(newitem);
            setItemsComplete([...itemsComplete, newitem]);
        }

        function ItemUnComplete(element) {
            const newitem = removeCompletedItem(element);
            console.log(newitem);
            setItems([...items, newitem]);
        }

        function removeItem(element) {
            const parent = element.srcElement.parentElement.id;
            const label = parent.replace("task_", "taskLabel_");
            const item = document.getElementById(label);
            const removed = items.splice(items.indexOf(item.innerHTML), 1);
            
            setItems(items);
            return removed[0];
        }

        function removeCompletedItem(element) {
            const parent = element.srcElement.parentElement.id;
            const label = parent.replace("complete_", "completeLabel_");
            const item = document.getElementById(label);
            const removed = itemsComplete.splice(itemsComplete.indexOf(item.innerHTML), 1);

            setItemsComplete(itemsComplete);
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

            const newItemButtonApply = document.getElementById("newItemButtonApply");

            newItemButtonApply.classList.remove("newitembox__button--enabled");
            newItemButtonApply.classList.add("newitembox__button--disabled");
            newItemButtonApply.disabled = true;  

            const newItemBox = document.getElementById('newItemInput');
            newItemBox.value = '';
            newItemBox.focus();                  
        }

        function NewTaskSearch() {
            const newItemButtonApply = document.getElementById("newItemButtonApply");
            newItemButtonApply.disabled == false ? newItemButtonApply.onclick.apply() : '';          
        }

        function ApplyItem() {
            const screenlock = document.getElementById("screenlock");
            screenlock.style.display = "none";

            const newItemInput = document.getElementById("newItemInput");
            setItems([...items, newItemInput.value]);
        }

        function CancelItem() {
            const screenlock = document.getElementById("screenlock");
            screenlock.style.display = "none"
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
            appclass: "topLabel"
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

        newItemTags.append(...newItemTag);
        newItemAddition.append(newItemTags, newItemDate);
        newItemButtons.append(newItemButtonCancel, newItemButtonApply)
        newItemBox.append(newItemLabel, newItemInput, newItemAddition, newItemButtons);

        screenlock.append(newItemBox);

        topbar.append(searchBar, button);

        tasks.append(allTasks, completedTasks);

        div.append(screenlock, label, topbar, tasks);

        AddRows();

        AddRowsCompleted();
        
        defaultsearch ? searchBar.value = defaultsearch : '';

        localStorage.setItem("initTasks", items.join(";"));
        localStorage.setItem("initComplete", itemsComplete.join(";"));

        return div;
    }

    /**
     * Render the app.
     * On change whole app is re-rendered.
     */
    function renderApp() {
        const appContainer = document.getElementById("functional-example");
        appContainer.innerHTML = "";
        appContainer.append(App());
        document.getElementById("SearchString").oninput.apply();
    }

    // initial render
    renderApp();
})();