import Component from './base.ts';   
import Label from './Label.ts';  
import DivElement from './DivElement.ts';  
import Button from './Button.ts';  

import Properities from '../Interfaces/Properities'; 
import ItemInterface from '../Interfaces/ItemInterface'
import HTMLCommonElement from '../Interfaces/HTMLCommonElement'

import './css/GreetingWindow.css';


export default class GreetingWindow extends Component {
    element: HTMLDivElement;
    
    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        return super.render({
            id: 'NewDayBox',
            class: props.class,
            children: [
                new Label().render({
                    id: 'NewDayLabel',
                    text: 'Good morning',
                    class: 'newdaybox__label',
                }),
                new Label().render({
                    id: 'NewDayTasksLabel',
                    text: 'You have the next planned tasks for today: ',
                    class: 'newdaybox__taskslabel',
                }),
                new DivElement().render({
                    id: 'NewDayTasks',
                    text: '',
                    class: 'newdaybox__tasks',
                    children: this.CreateListForMorningGreeting(props.taskList, props.currentDate)
                }),
                new Button().render({
                    id: 'NewDayLabel',
                    htmltext: 'Ok',
                    class: 'newdaybox__button newdaybox__button--apply',
                    onClick: props.buttonOnClick
                })
            ]
        });
    }

    CreateListForMorningGreeting = (taskList: ItemInterface[], currentDate: string) => {
        let rows: HTMLCommonElement[] = [];
        for (let i in taskList) {
            if (!taskList[i].isCompleted && taskList[i].plannedDate == currentDate) {
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
}