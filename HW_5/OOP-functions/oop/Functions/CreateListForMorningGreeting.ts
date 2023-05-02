import Label from '../Components/Label.ts';  

import ItemInterface from '../Interfaces/ItemInterface';
import HTMLCommonElement from '../Interfaces/HTMLCommonElement';

export function CreateListForMorningGreeting(taskList: ItemInterface[], currentDate: string) {
        let rows: HTMLCommonElement[] = [];
        for (let i in taskList) {
            if (
                (!taskList[i].isCompleted) && 
                    ((taskList[i].plannedDate == currentDate)||
                    (!taskList[i].plannedDate))
                ) {
                rows.push(
                    new Label().render({
                        text: taskList[i].name, 
                        class: "newdaybox__text"
                    })
                )
            }
        }
        return rows;
    }