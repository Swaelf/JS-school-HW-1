import Component from './base.ts';  
import TopLabelBoxElement from './TopLabelBoxElement.ts';  
import TopBarElement from './TopBarElement.ts';  
import TaskContainerElement from './TaskContainerElement.ts';  
import Properities from './Properities.ts'; 
import './ContainerElement.css';

export default class ContainerElement extends Component {
    props: Properities;
    element: HTMLDivElement;

    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props: Properities) {
        return super.render({
            id: 'Container',                
            class: 'container',
            children: [
                new TopLabelBoxElement().render({
                    id: 'topLabelBox',
                    class: 'toplabelbox__container'
                }),
                new TopBarElement().render({
                    id: 'TopBar',
                    class: 'topbar',
                    taskItems: props.taskItems,
                    completeItems: props.completeItems,
                    onSearchInput: props.onSearchInput,
                    onButtonClick: props.onButtonClick,
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