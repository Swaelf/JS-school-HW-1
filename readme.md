Main task
Improve To-Do application by adding Redux store and react-router: 

1. Use Redux to store tasks

Tasks are handled by Redux store - 1 point
Use redux-thunk to download from server - 1 point (optional)

2.Use react-router and add app paths

Implement tags - `health`, `work`, `home`, `other`. (see the design in Figma). The list of tags is predefined and not editable. Implement filtering tasks by a tag (The UI for filtering is missing in Figma and up to you). When users select a tag they should see only tasks with that tag and the URI should show the selected tag (e.g. localhost:3000/tasks/home). When a user opens a page localhost:3000/tasks/home they should see only tasks with `home` tag. - 1 point
When the user searches for tasks by a substring the URI should change accordingly. Use query string - localhost:3000/tasks?q=search-term. When user opens url with a query string the search input field should be filled with query and the task list should be filtered - 1 point 
Note that searching by substring should preserve the state when the user refreshes the page and it should work correctly even with strings containing symbols “ : / ? & = # ” - 1 point
For the sake of simplicity you can make mutually exclusive searching for tasks by a substring and filtering tasks by a tag - when tasks are filtered by a tag switch off searching and vice versa. If you implement simultaneous filtering and searching you will get 1 point. (optional)
3. Add a missing functionality - edit tasks

A user should be able to edit an existing task. You can use the “New task” modal window for editing. This part of the homework doesn’t include working with the router, it is just some additional functionality. - 1 point

Extra task
Add a synchronization mechanism between browser tabs - 2 points

 

When the user opens the application in two browser tabs, the tasks are always in sync in both tabs so, for example, when the user removes, adds or edits a task in one tab, the same change happens to the second tab without refreshing it manually.

There can be various approaches to achieve this result but in all cases it should be a purely frontend solution - don’t try to use any additional web server besides json-server and try to avoid additional server calls for data that is already on the client.