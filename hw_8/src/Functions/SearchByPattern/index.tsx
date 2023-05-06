import ItemInterface from '../../Interfaces/ItemInterface';

export default function SearchByPattern(taskList: ItemInterface[], searchPattern: string = '') {
    
    for (let index = 0; index <= taskList.length-1; index++) {

        if (taskList[index].name?.match(searchPattern.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'))) {
            taskList[index].filter = true;
        } else {
            taskList[index].filter = false;
        }
    }
    return  taskList;
}
