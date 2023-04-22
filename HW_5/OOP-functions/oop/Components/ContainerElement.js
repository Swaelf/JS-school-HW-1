import Component from './base.js';  
import TopLabelBoxElement from './TopLabelBoxElement.js';  
import TopBarElement from './TopBarElement.js';  
import TaskContainerElement from './TaskContainerElement.js';  
import './ContainerElement.css';

export default class ContainerElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: 'Container',                
            class: 'container',
            children: [
                new TopLabelBoxElement().render(),
                new TopBarElement().render({
                    taskItems: props.taskItems,
                    completeItems: props.completeItems,
                    onSearchInput: props.onSearchInput,
                    onButtonClick: props.onButtonClick,
                }),
                new TaskContainerElement().render({
                    actualTasksChildren: props.actualTasksChildren,
                    completedTasksChildren: props.completedTasksChildren
                }),
            ] 
        });
    }
}