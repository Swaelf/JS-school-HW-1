import ItemInterface from '../../Interfaces/ItemInterface';

export default function SearchByPattern(taskList: ItemInterface[]) {
    let searchPattern: string = localStorage.getItem('searchPattern')||'';
    
    for (let index = 0; index <= taskList.length-1; index++) {
        if (taskList[index].name?.match(searchPattern)) {
            taskList[index].filter = true;
        } else {
            taskList[index].filter = false;
        }
    }
    return  taskList;
}
