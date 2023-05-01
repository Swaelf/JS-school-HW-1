import ItemInterface from '../../Interfaces/ItemInterface';
import { RefObject } from 'react';

export default function SearchByPattern(taskList: ItemInterface[]) {
    let searchPattern: string = localStorage.getItem('searchPattern')||'';
    console.log(searchPattern);
    
    for (let index = 0; index <= taskList.length-1; index++) {
        if (taskList[index].name?.match(searchPattern)) {
            taskList[index].filter = true;
        } else {
            taskList[index].filter = false;
        }
    }
    return  taskList;
}
