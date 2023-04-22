import Component from './base.js';  
import NewItemWindow from './NewItemWindow.js';  
import GreetingWindow from './GreetingWindow.js';  
import './ScreenlockElement.css';

export default class ScreenlockElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {

        return super.render({
            id: 'ScreenLock',
            class: 'screenlock',
            style: props.style.screenLock,
            children: [
                new NewItemWindow().render({
                    style: props.style.newBox,
                    currentDate: props.currentDate,
                    buttonOnClick_cancel: props.buttonOnClick_cancel,
                    buttonOnClick_apply: props.buttonOnClick_apply
                }),
                new GreetingWindow().render({
                    tasks: props.tasks,
                    style: props.style.newMorning,
                    buttonOnClick: props.buttonOnClick_cancel,
                })
            ]
        });
    }
}