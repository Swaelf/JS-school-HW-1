import ItemInterface from '../../Interfaces/ItemInterface'

export default async function PostNewDataIntoServer(data: ItemInterface) {
    let serverUrl: string = "http://localhost:3004/tasks";
    const localStorageUrl = localStorage.getItem("server_url");

    if (localStorageUrl !== null) {
        serverUrl = localStorageUrl;
    }
    
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
