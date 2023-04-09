(function () {
    let state = undefined;
    let stateComplete = undefined;

    /**
     * Global application state
     * @template T
     * @param {T} initialValue
     * @returns {[T, function(T): void]}
     */
    function useState(initialValue) {
        state = state || initialValue;
        //let state = initialValue

        function setValue(newValue) {
            state = newValue;
            renderApp();
        }

        return [state, setValue];
    }

    function useStateComplete(initialValue) {
        stateComplete = stateComplete || initialValue;
        //let state = initialValue

        function setValue(newValue) {
            stateComplete = newValue;
            renderApp();
        }

        return [stateComplete, setValue];
    }



    /**
     * Functional component for the list
     * @param items {string[]}
     * @returns {HTMLElement} - List element
     */
    /*function List({items}) {
        const listItems = items.map((item) => `<li>${item}</li>`).join("");
        const ul = document.createElement("ul");
        ul.innerHTML = listItems;
        return ul;
    }*/

    /**
     * Button component
     * @param text {string}
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

    function Label({id, text, appclass}) {
        const label = document.createElement("label");
        label.id = id;
        label.innerHTML = text;
        label.classList = appclass;
        return label;
    }

    function Input({id, text, appclass, type, onChange, onInput, placeHolder}) {
        const input = document.createElement("input");
        input.id = id;
        input.onchange = onChange;
        input.oninput = onInput;
        //input.onclick = onClick;
        input.type = type;
        input.placeholder = placeHolder;
        input.classList = appclass;
        return input;
    }

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
        let initTasks = ["Item 1", "Item 2", "Item 3"];
        let initComplete = ["CItem 1", "CItem 2"];

        //console.log(initTasks.join(";"));
        //localStorage.clear();
        
        if (localStorage.getItem("initTasks") || localStorage.getItem("initComplete")) {
            initTasks = localStorage.getItem("initTasks").split(";");
            initComplete = localStorage.getItem("initComplete").split(";");
        }


        const [items, setItems] = useState(initTasks);
        const [itemsComplete, setItemsComplete] = useStateComplete(initComplete);

        function dialog(title, defaultItem) {

        }

        /*function addItem() {
            const dialogBox = document.getElementById("newItemBox");
            dialogBox.style.display = "flex";

            //const maxitem = items.length - 1;
            //const itemTitle = dialog('Please enter item title', `Item ${maxitem + 1}`);

            //if (itemTitle) {
               // setItems([...items, itemTitle]);
            //}
        }*/

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
                let row = Div({id: "task_" + i, text: "", appclass: "tasks__row"});
                let taskCheck = Input({id: "checkbox_task_" + i, text: "", appclass: "task__checkbox", type: "checkbox", onChange: ItemComplete});
                let labelContainer = Div({id: "labelContainer_task" + i, text: "", appclass: "tasks__labelcontainer"});
                let delButton = Button({id: "task_button_" + i, text: "", onClick: removeItem, appclass: "button__remove"});
                let tagHolder = Div({id: "tagholder_task_" + i, text: "", appclass: "tasks__tagholder"});
                let taskLabel = Label({id: "taskLabel_" + i, text: items[i], appclass: "task__text"});
                let tag = Div({id: "tag_task_" + i, text: "tag", appclass: "tags__item tags__item--other"});
                let time = Div({id: "time_task_" + i, text: "time", appclass: "tags__item tags__item--time"});
                tagHolder.append(tag, time);
                labelContainer.append(taskLabel, tagHolder);
                row.append(taskCheck, labelContainer, delButton);
                allTasks.append(row);
            }
        }

        function AddRowsCompleted() {
            for (i in itemsComplete) {
                let row = Div({id: "complete_" + i, text: "", appclass: "tasks__row"});
                let taskCheck = Input({id: "checkbox_complete_" + i, text: "", appclass: "task__checkbox", type: "checkbox", onChange: ItemUnComplete});
                taskCheck.checked = "checked";
                let labelContainer = Div({id: "labelContainer_complete_" + i, text: "", appclass: "tasks__labelcontainer"});
                let delButton = Button({id: "complete_button_" + i, text: "", onClick: "removeItem", appclass: "button__remove"});
                delButton.style.background = "none";
                let tagHolder = Div({id: "tagholder_complete_" + i, text: "", appclass: "tasks__tagholder"});
                let taskLabel = Label({id: "completeLabel_" + i, text: itemsComplete[i], appclass: "task__text task--complete"});
                let tag = Div({id: "tag_complete_" + i, text: "tag", appclass: "tags__item tags__item--inactive"});
                let time = Div({id: "time_complete_" + i, text: "time", appclass: "tags__item tags__item--time "});
                tagHolder.append(tag, time);
                labelContainer.append(taskLabel, tagHolder);
                row.append(taskCheck, labelContainer, delButton);
                completedTasks.append(row);
            }
        }

        function SearchPattern() {
            const pattern = document.getElementById("search_str").value;
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
            const dialogBox = document.getElementById("newItemBox");
            const newItemButtonApply = document.getElementById("newItemButtonApply");
            newItemButtonApply.classList.remove("newitembox__button--enabled");
            newItemButtonApply.classList.add("newitembox__button--disabled");
            newItemButtonApply.disabled = true;
            dialogBox.style.display = "flex";
            const screenlock = document.getElementById("screenlock");
            screenlock.style.display = "flex"
        }

        function ApplyItem() {
            const dialogBox = document.getElementById("newItemBox");
            dialogBox.style.display = "none";
            const newItemInput = document.getElementById("newItemInput");

            setItems([...items, newItemInput.value]);

            const screenlock = document.getElementById("screenlock");
            screenlock.style.display = "none"
        }

        function CancelItem() {
            const dialogBox = document.getElementById("newItemBox");
            dialogBox.style.display = "none";

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

        const div = Div({id: "appcontainer", text: "", appclass: "container"});
        const screenlock = Div({id: "screenlock", text: "", appclass: "screenlock"});
        const newItemBox = Div({id: "newItemBox", text: "", appclass: "newitembox"});
        newItemBox.style.display = "none";

        const newItemLabel = Label({id: "newItemLabel", text: "Add New Item", appclass: "newitembox__label"});
        const newItemInput = Input({id: "newItemInput", placeHolder: "New Item", appclass: "newitembox__input", type: "search", onChange: "", onInput: AproveNewItem});
        const newItemAddition = Div({id: "newItemAddition", text: "", appclass: "newitembox__addition"});
        const newItemButtons = Div({id: "newItemButtons", text: "", appclass: "newitembox__buttons"});

        const newItemTags = Div({id: "newItemTags", text: "", appclass: "newitembox__tags"});
        const newItemTag = [];
        newItemTag.push(Div({id: "newItemTag0", text: "health", appclass: "tags__item tags__item--health"}));
        newItemTag.push(Div({id: "newItemTag1", text: "work", appclass: "tags__item tags__item--work"}));
        newItemTag.push(Div({id: "newItemTag2", text: "home", appclass: "tags__item tags__item--home"}));
        newItemTag.push(Div({id: "newItemTag3", text: "other", appclass: "tags__item tags__item--other"}));

        newItemTags.append(...newItemTag)

        const newItemDate = Div({id: "newItemDate", text: currentDate, appclass: "newitembox__date"});

        const newItemButtonApply = Button({id: "newItemButtonApply", text: "Add Task", onClick: ApplyItem, appclass: "newitembox__button newitembox__button--apply"});
        const newItemButtonCancel = Button({id: "newItemButtonCancel", text: "Cancel", onClick: CancelItem, appclass: "newitembox__button newitembox__button--cancel"});

        newItemAddition.append(newItemTags, newItemDate);
        newItemButtons.append(newItemButtonCancel, newItemButtonApply)
        newItemBox.append(newItemLabel, newItemInput, newItemAddition, newItemButtons);

        const label = Label({id: "todo", text: "To Do App", appclass: "topLabel"});
        const button = Button({id: "AddButton", text: "+ New Task", onClick: NewTask, appclass: "button__add"});
        const search = Input({id: "search_str", placeHolder: "Search Task", appclass: "topbar__search", type: "search", onChange: "", onInput: SearchPattern});
        const topbar = Div({id: "topBar", text: "", appclass: "topbar"});

        topbar.append(search, button);

        const tasks = Div({id: "task_container", text: "", appclass: "tasks"});

        screenlock.append(newItemBox)
        div.append(screenlock, label, topbar, tasks);

        const allTasks = Div({id: "task_list", text: "All Tasks", appclass: "tasks__label"});
        const completedTasks = Div({id: "complete_list", text: "Completed Tasks", appclass: "tasks__label"});

        tasks.append(allTasks, completedTasks);

        AddRows();

        AddRowsCompleted();

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
    }

    // initial render
    renderApp();
})();