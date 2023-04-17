This homework assignment extends functionality of the todo-list application which you created in HW5. Now you need to implement the interaction with a server and add a nice weather widget.

Basic requirements

1. Store the tasks on a server - 3 points

In this part you need to use a simple backend to store the tasks.

First, you need to install json-server. Carefully read the documentation here https://www.npmjs.com/package/json-server and install json-server locally.

Create db.json file with content:

{

  "tasks": [

    { "id": 1, "title": "Task 1", "isCompleted": false },

    { "id": 2, "title": "Task 2", "isCompleted": false },

    { "id": 3, "title": "Task 3", "isCompleted": false },

  ],

}

Run the server:


json-server --watch db.json --port 3004


Now in your project you can use the following endpoints:

1) GET - `http://localhost:3004/tasks` - to get all tasks

2) POST - `http://localhost:3004/tasks` - to add a new task

3) DELETE - `http://localhost:3004/tasks/:id` - to delete a task by id

4) PUT - `http://localhost:3004/task/:id` - to update a task by id

 

You need to implement the following functionality:

When the user opens the application it should read tasks from the server and display them.
When the user creates a new task - store it in the database on the server
When the user marks the task done or edits it - updates it in database
When the user deletes the task - deletes it in database
So the local task list and the database should be always in sync.

2. Add weather widget - 1 point

The app should show the weather information.

 

Find the design at figma - https://www.figma.com/file/zWxBciks6tnS4SMqcXgqaP/Homework-5-10?node-id=347-244&t=PtORWSUG6xuzaXH5-0 

 

The widget should have the following fields:

weather icon (optional)
temperature
City (By default shows weather in Tbilisi )
 

To get the current weather you should use this weather API - https://www.weatherapi.com/api-explorer.aspx

 

Scenario

user opens the app 
the app shows the weather in Tbilisi now
 

It is not necessary to update the weather while the page is open.

Possible extensions (extra tasks, you can do any 1 of them)
1.Show a modal with the tasks planned for today - 1 point
The app should show a modal window with planned tasks for today when the user opens it for the first time a day. In order to implement this you need to add a “planned date” field to the database and fill this field when the user creates a new task.

The modal window should have the following fields:

Title
task list
agree button
The app should show the modal only once per day (use local storage to keep information about last date of application usage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage )

figma - https://www.figma.com/file/zWxBciks6tnS4SMqcXgqaP/Homework-5-10?node-id=347-796&t=PtORWSUG6xuzaXH5-0 


Scenario 1: user opens the app for the first time today

user opens the app 
the app shows the modal with tasks planned for today
user clicks ‘Ok’ button and the modal is getting close
Scenario 2: user opens the app the second and next time today 

user opens the app 
modal is not visible

2.Show the weather where the user is - 1 point


The app should show weather information in the city where the user is.

To implement this functionality you need to use geolocation API - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

Scenario 1: User shared the location access 

user opens the app 
the app requests access to the geolocation services
user allows access 
the app shows weather information where user is (for example, if user is in Lisbon, the app should show the weather in Lisbon)
Scenario 2: User declined the location access 

user opens the app 
the app requests access to the geolocation services
user declined access 
the app shows weather information in the default city (Tbilisi)