import ItemInterface from '../../Interfaces/ItemInterface';
const config = require ('../../config.json');

export default async function DeleteDataFromServer(data: ItemInterface) {
    const serverUrl: string = config.localurl + '/' + data.id;

    await fetch(serverUrl, {method: "DELETE"})
        .catch((error) => window.alert(error));
};