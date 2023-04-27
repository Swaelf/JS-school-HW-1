import ItemInterface from '../Interfaces/ItemInterface';

export function SearchByPattern(taskList: ItemInterface[], searchPattern: string) {
    for (let i in taskList) {
        taskList[i].htmlElement.className = ("tasks__row");
        if (!taskList[i].name.match(searchPattern)){
            taskList[i].htmlElement.className = ("tasks__row tasks__row--disabled");
        }  
    }
}