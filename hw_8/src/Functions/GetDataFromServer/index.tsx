import ItemInterface from '../../Interfaces/ItemInterface';

const config = require ('../../config.json');

export default async function getDataFromServer() {
  let taskList: ItemInterface[] = [];
  const serverUrl: string = config.localurl;

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