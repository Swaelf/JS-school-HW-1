import Component from './base.ts';  
import DivElement from './DivElement.ts'; 

import Properities from '../Interfaces/Properities'; 

import './css/TaskContainerElement.css';

export default class TaskContainerElement extends Component {
    props: Properities;
    element: HTMLDivElement;     

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        return super.render({
            id: 'TaskContainer',
            class: 'tasks',
            children: [
                new DivElement().render({
                    id: 'AllTasks',
                    class: 'tasks__label',
                    htmltext: 'All Tasks',
                    children: props.actualTasksChildren 
                }),
                new DivElement().render({
                    id: 'CompletedTasks',
                    class: 'tasks__label',
                    htmltext: 'Completed Tasks',
                    children: props.completedTasksChildren 
                })
            ]
        });
    }
}