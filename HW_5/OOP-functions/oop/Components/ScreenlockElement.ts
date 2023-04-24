import Component from './base.ts';  
import NewItemWindow from './NewItemWindow.ts';  
import GreetingWindow from './GreetingWindow.ts'; 

import Properities from '../Interfaces/Properities'; 

import './css/ScreenlockElement.css';

export default class ScreenlockElement extends Component {
    props: Properities;
    element: HTMLDivElement;

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        const renderProps: Properities = {
            id: 'ScreenLock',
            class: 'screenlock',
            style: props.styles.screenLock,
            children: [
                new NewItemWindow().render({
                    id: 'NewItemBox',
                    class: 'newitembox',
                    style: props.styles.newBox,
                    currentDate: props.currentDate,
                    buttonOnClick_cancel: props.buttonOnClick_cancel,
                    buttonOnClick_apply: props.buttonOnClick_apply
                }),
                new GreetingWindow().render({
                    id: 'NewDayBox',
                    class: 'newdaybox',
                    tasks: props.tasks,
                    style: props.styles.newMorning,
                    buttonOnClick: props.buttonOnClick_cancel,
                }),
            ]
        }
        return super.render(renderProps);
    }


}