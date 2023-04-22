import Component from './base.js';  
import DivElement from './DivElement.js';  
import './TaskContainerElement.css';

export default class TaskContainerElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
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