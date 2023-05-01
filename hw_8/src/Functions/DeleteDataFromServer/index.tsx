import ItemInterface from '../../Interfaces/ItemInterface'

export default async function DeleteDataFromServer(data: ItemInterface) {
    let serverUrl: string = "http://localhost:3004/tasks";
    const localStorageUrl = localStorage.getItem("server_url");

    console.log(data);

    if (localStorageUrl !== null) {
        serverUrl = localStorageUrl;
    }

    await fetch(serverUrl + '\/' + data.id, {method: "DELETE"})
        .catch((error) => window.alert(error));
};