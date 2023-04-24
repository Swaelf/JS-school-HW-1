import Component from './base.ts';  
import Label from './Label.ts'; 

import Properities from './Properities'; 

import './NewItemTags.css';

export default class NewItemTags extends Component {
    props: Properities;
    element: HTMLDivElement;     

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;      
    }

    render(props: Properities) {

        return super.render({
            id: 'NewItemTags',
            class: 'newitembox__tags',
            children: [
                new Label().render({
                    id: 'NewItemTag0',
                    class: 'tags__item tags__item--health',
                    text: 'health',
                    children: []
                }),
                new Label().render({
                    id: 'NewItemTag1',
                    class: 'tags__item tags__item--work',
                    text: 'work',
                    children: []
                }),
                new Label().render({
                    id: 'NewItemTag2',
                    class: 'tags__item tags__item--home',
                    text: 'home',
                    children: []
                }),
                new Label().render({
                    id: 'NewItemTag3',
                    class: 'tags__item tags__item--other',
                    text: 'other',
                    children: []
                })
            ]
        });
    }
}