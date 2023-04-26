import Component from './base.ts';  
import NewItemWindow from './NewItemWindow.ts';  
import GreetingWindow from './GreetingWindow.ts'; 

import Properities from '../Interfaces/Properities'; 

import './css/ScreenlockElement.css';

export default class ScreenlockElement extends Component {
    element: HTMLDivElement;

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        const modalWindowState: string = localStorage.getItem('modalWindowState');
        let screenLockClass: string = 'screenlock';
        let newItemWindowClass: string = 'newitemwindow';
        let newDayWindowClass: string = 'newdaywindow';
        switch(modalWindowState) {
            case '1': {
                screenLockClass = 'screenlock screenlock--enabled';
                newDayWindowClass = 'newdaywindow newdaywindow--enabled'
            }
            case '2': {
                screenLockClass = 'screenlock screenlock--enabled';
                newItemWindowClass = 'newitemwindow newitemwindow--enabled';
            }
        }      

        const renderProps: Properities = {
            id: 'ScreenLock',
            class: screenLockClass,
            children: [
                new NewItemWindow().render({
                    id: 'NewItemWindow',
                    class: newItemWindowClass,
                    currentDate: props.currentDate,
                    buttonOnClick_cancel: props.buttonOnClick_cancel,
                    buttonOnClick_apply: props.buttonOnClick_apply
                }),
                new GreetingWindow().render({
                    id: 'NewDayWindow',
                    class: newDayWindowClass,
                    currentDate: props.currentDate,
                    taskList: props.taskList,
                    buttonOnClick: props.buttonOnClick_cancel,
                }),
            ]
        }
        return super.render(renderProps);
    }


}