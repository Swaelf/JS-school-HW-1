import ItemInterface from '../../Interfaces/ItemInterface';
import React, { useRef, useState, useEffect } from 'react';

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
                          isCompleted: item.isCompleted,
                          plannedDate: item.plannedDate,
                          tag: item.tag,
                          filter: true
                      });
                  }
              }
          })
          .catch((error) => {window.alert(error)})  
  }

  return taskList;
};