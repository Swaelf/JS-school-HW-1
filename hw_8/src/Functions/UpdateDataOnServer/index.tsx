import ItemInterface from '../../Interfaces/ItemInterface'

export default async function UpdateDataOnServer(data: ItemInterface) {
    let serverUrl: string = "http://localhost:3004/tasks/" + data.id;
    const localStorageUrl = localStorage.getItem("server_url");

    if (localStorageUrl !== null) {
        serverUrl = localStorageUrl + '/' + data.id;
    }

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
        .catch((error) => window.alert(error));
};