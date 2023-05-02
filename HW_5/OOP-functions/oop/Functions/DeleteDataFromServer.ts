import ItemInterface from '../Interfaces/ItemInterface';

export async function DeleteDataFromServer(data: ItemInterface) {
        const serverUrl: string = localStorage.getItem("server_url");

        await fetch(serverUrl + '\/' + data.id, {method: "DELETE"})
            .catch((error) => window.alert(error));
    }