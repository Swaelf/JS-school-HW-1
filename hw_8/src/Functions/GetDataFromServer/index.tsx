import ItemInterface from '../../Interfaces/ItemInterface';

export default async function getDataFromServer() {
  let taskList: ItemInterface[] = [];
  let serverUrl: string = "http://localhost:3004/tasks";
  const localStorageUrl = localStorage.getItem("server_url");

  if (localStorageUrl !== null) {
      serverUrl = localStorageUrl;
  }


  if (serverUrl) {
      await fetch(serverUrl, { method: "GET" })
          .then((data) => data.json())
          .then((data) => {
              if (Array.isArray(data)) {
                  for (let item of data) {
                      taskList.push({
                          name: item.title, 
                          id: item.id, 
                          isCompleted: item.isCompleted||false,
                          plannedDate: item.plannedDate||'time',
                          tag: item.tag||'other',
                          filter: true
                      });
                  }
              }
          })
          .catch((error) => {window.alert('Error while getting data from Server:\n' + error.message)})  
  }

  return taskList;
};