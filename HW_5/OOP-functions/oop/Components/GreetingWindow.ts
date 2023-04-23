import Component from './base.ts';   
import Label from './Label.ts';  
import DivElement from './DivElement.ts';  
import Button from './Button.ts';  
import './GreetingWindow.css';
import Properities from './Properities.ts'; 


export default class GreetingWindow extends Component {
    props: Properities;
    element: HTMLDivElement;
    
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props: Properities) {
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
                    onClick: props.buttonOnClick
                })
            ]
        });
    }

    CreateListForMorningGreeting = (items: any) => {
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