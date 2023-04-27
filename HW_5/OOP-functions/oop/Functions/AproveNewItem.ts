
export function AproveNewItem() {
        const newItemInput: HTMLInputElement = document.getElementById("NewItemInput") as HTMLInputElement;
        const newItemButtonApply: HTMLButtonElement = document.getElementById("NewItemButtonApply") as HTMLButtonElement;
        if (newItemInput.value) {
            newItemButtonApply.className = "newitembox__button newitembox__button--apply newitembox__button--enabled";                  
            newItemButtonApply.disabled = false;
        } else {
            newItemButtonApply.className = "newitembox__button newitembox__button--apply newitembox__button--disabled";                  
            newItemButtonApply.disabled = true;
        }
    }