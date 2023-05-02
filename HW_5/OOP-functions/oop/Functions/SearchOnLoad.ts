import {SearchByPattern} from './SearchByPattern';
import ItemInterface from '../Interfaces/ItemInterface';

export async function SearchOnLoad (taskList: ItemInterface[]) {
        let searchPattern: string = '';
        if (localStorage.getItem("searchPattern")) {
            searchPattern = localStorage.getItem("searchPattern");
        };

        SearchByPattern(taskList, searchPattern);
    }