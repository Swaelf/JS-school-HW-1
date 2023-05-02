import ItemInterface from '../../Interfaces/ItemInterface'

export default async function DeleteDataFromServer(data: ItemInterface) {
    let serverUrl: string = "http://localhost:3004/tasks/" + data.id;
    const localStorageUrl = localStorage.getItem("server_url");

    if (localStorageUrl !== null) {
        serverUrl = localStorageUrl + '/' + data.id;
    }

    await fetch(serverUrl, {method: "DELETE"})
        .catch((error) => window.alert(error));
};