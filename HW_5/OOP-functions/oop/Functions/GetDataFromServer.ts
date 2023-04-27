import ItemInterface from '../Interfaces/ItemInterface';

export async function GetDataFromServer() {
        let taskList: ItemInterface[] = [];
        const serverUrl: string = localStorage.getItem("server_url");

        if (serverUrl) {
            await fetch(serverUrl, { method: "GET" })
                .then((data) => data.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        for (let item of data) {
                            taskList.push({
                                name: item.title, 
                                id: item.id, 
                                isCompleted: item.isCompleted,
                                plannedDate: item.plannedDate,
                                tag: item.tag
                            });
                        }
                    }
                })
                .catch((error) => {window.alert(error)})  
        }
        return taskList;
    }