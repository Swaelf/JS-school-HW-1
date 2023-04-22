import Component from './base.js';   
import Label from './Label.js';  
import DivElement from './DivElement.js';  
import Button from './Button.js';  
import './GreetingWindow.css';

export default class GreetingWindow extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: 'NewDayBox',
            class: 'newdaybox',
            style: props.style,
            children: [
                new Label().render({
                    id: 'NewDayLabel',
                    text: 'Good morning',
                    class: 'newdaybox__label',
                    children: []
                }),
                new Label().render({
                    id: 'NewDayTasksLabel',
                    text: 'You have the next planned tasks for today: ',
                    class: 'newdaybox__taskslabel',
                    children: []
                }),
                new DivElement().render({
                    id: 'NewDayTasks',
                    text: '',
                    class: 'newdaybox__tasks',
                    children: this.CreateListForMorningGreeting(props.tasks)
                }),
                new Button().render({
                    id: 'NewDayLabel',
                    htmltext: 'Ok',
                    class: 'newdaybox__button newdaybox__button--apply',
                    onClick: props.buttonOnClick,
                    children: []
                })
            ]
        });
    }

    CreateListForMorningGreeting = (items) => {
        let rows = [];
        let i;
        for (i in items) {
            rows.push(
                new Label().render({
                    id: "morningTask_" + i, 
                    text: items[i].name, 
                    class: "newdaybox__text"
                })
            )
        }
        return rows;
    }
}