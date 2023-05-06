import ItemInterface from '../../Interfaces/ItemInterface';
const config = require ('../../config.json');

export default async function UpdateDataOnServer(data: ItemInterface) {
    const serverUrl: string = config.localurl + '/' + data.id;

    await fetch(serverUrl, { 
        method: "PUT", 
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            id: data.id, 
            title:data.name, 
            isCompleted: data.isCompleted,
            plannedDate: data.plannedDate,
            tag: data.tag
        })
        })
        .catch((error) => window.alert('Error while udate data from Server:\n' + error.message));
};