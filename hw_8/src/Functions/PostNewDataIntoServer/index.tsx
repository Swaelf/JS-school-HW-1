import ItemInterface from '../../Interfaces/ItemInterface';
const config = require ('../../config.json');

export default async function PostNewDataIntoServer(data: ItemInterface) {
    const serverUrl: string = config.localurl;
    
    await fetch(serverUrl, { 
        method: "POST", 
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            id: data.id, 
            title: data.name, 
            isCompleted: data.isCompleted,
            plannedDate: data.plannedDate,
            tag: data.tag
        })
        })
        .catch((error) => window.alert(error));
};
