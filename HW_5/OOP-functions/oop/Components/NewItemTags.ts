import Component from './base.ts';  
import Input from './Input.ts'; 
import Label from './Label.ts';

import Properities from '../Interfaces/Properities'; 
import HTMLCommonElement from '../Interfaces/HTMLCommonElement'

import './css/NewItemTags.css';

export default class NewItemTags extends Component {
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
                    type: 'radio',
                    value: 'health',
                    name: 'tags',
                    onClick: this.TagSelect,
                    text: 'health'
                }),
                new Label().render({
                    id: 'NewItemTag1',
                    class: 'tags__item tags__item--work',
                    type: 'radio',
                    value: 'work',
                    name: 'tags',
                    onClick: this.TagSelect,
                    text: 'work'
                }),
                new Label().render({
                    id: 'NewItemTag2',
                    class: 'tags__item tags__item--home',
                    type: 'radio',
                    value: 'home',
                    name: 'tags',
                    onClick: this.TagSelect,
                    text: 'home'
                }),
                new Label().render({
                    id: 'NewItemTag3',
                    class: 'tags__item tags__item--other',
                    type: 'radio',
                    value: 'other',
                    name: 'tags',
                    onClick: this.TagSelect,
                    text: 'other'
                })
            ]
        });
    }

    TagSelect = (event: MouseEvent) => {
        const parent: HTMLCommonElement = (event.target as HTMLCommonElement).parentElement;
        const element: HTMLCommonElement = event.target as HTMLCommonElement;

        for (let index: number = 0; index < parent.children.length; index++) {
            const elem: HTMLCommonElement = parent.children[index] as HTMLCommonElement;
            elem.classList.remove('tags__item--selected');
        }
        
        element.classList.add('tags__item--selected');
        localStorage.setItem("currentTag", element.innerHTML);
    }

}