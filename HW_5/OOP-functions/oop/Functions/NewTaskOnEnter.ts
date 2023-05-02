export const NewTaskOnEnter = () => {
        const newItemBox: HTMLButtonElement = document.getElementById('NewItemButtonApply') as HTMLButtonElement;
        newItemBox.disabled == false ? newItemBox.onclick.call(this) : '';
    }