import ItemInterface from '../Interfaces/ItemInterface';

export async function PostNewDataIntoServer(data: ItemInterface) {
        const serverUrl: string = localStorage.getItem("server_url");

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
    }