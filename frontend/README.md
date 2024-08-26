# Prelimenary Doc for the Frontend

## Description
- The documentation aims at simplifying the usage of the frontend technologies currently adopted by the team to cater for modular programming in other to introduce scalability into the team's workflow.

## Structure
- `frontend/index.html`: Holds the static ui updating elements of the user facing part of the application.
- `frontend/canvas.js`: Holds the logic, which as at now combines the ui drawing and game logic. Further refactoring is required to seperate this two dynamic parts of the application.

## Additional dependencies:
    ```sh
    npm install http-server
    ```
<p>The way that the refactoring above works is in the fashion of having a seperate http server for the user facing part of the application, currently with this refactoring, the node.js server is incapable of serving the application as the html window object is not accessable to it</p>
    <p>Socket.io is not needed at this stage since there's not way to hook both the frontend and backend, although that would need to change in the future when we have functional backend and routes setup for the frontend to send http requests to</p>
    
##  Running the Frontend Server:
- ```cd frontend```: navigate to the frontend directory
- ```http-server```: running this command opens up a server on port 8080 and exposes the application via localhost.
- ```http://localhost:8080```: if everything went well, the application should be live in your browser.