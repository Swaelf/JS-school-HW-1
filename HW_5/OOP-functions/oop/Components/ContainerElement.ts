import Component from './base.ts';  
import TopLabelBoxElement from './TopLabelBoxElement.ts';  
import TopBarElement from './TopBarElement.ts';  
import TaskContainerElement from './TaskContainerElement.ts';  

import Properities from '../Interfaces/Properities'; 

import './css/ContainerElement.css';

export default class ContainerElement extends Component {
    element: HTMLDivElement;

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        return super.render({
            id: 'Container',                
            class: 'container',
            children: [
                new TopLabelBoxElement().render({
                    id: 'topLabelBox',
                    class: 'toplabelbox__container',
                    weather: props.weather
                }),
                new TopBarElement().render({
                    id: 'TopBar',
                    class: 'topbar',
                    taskList: props.taskList,
                    onSearchInput: props.onSearchInput,
                    onButtonClick: props.onButtonClick
                }),
                new TaskContainerElement().render({
                    id: 'TaskContainer',
                    class: 'tasks',
                    actualTasksChildren: props.actualTasksChildren,
                    completedTasksChildren: props.completedTasksChildren
                }),
            ] 
        });
    }
}