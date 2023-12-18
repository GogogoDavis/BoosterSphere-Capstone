**APPLICATION INSTRUCTIONS 

1. Once application has been cloned down from Github you must first setup the backend of the application in order for it to work. 
First step is to create a database within a Docker container that will link to our .env file. 
2. Now CD into the backend directory and run <npm run setup>, this will migrate the backend tables as well as seed data for the server. 
3. Now run <npm start> in order to run the backend tables and seeds. You may utilize Postman with localhost:8080 with a GET request
to verify data has been properly seeded. 
4. Now CD into the boostersphere directory (our acting frontend) and run npm install again in order to install all dependencies used
within our application.
5. Once all dependencies are downloaded you may run <npm start> to run the application on default localhost:3000. 
6. Now the apploication and data should be loaded into the application, we hope you enjoy it! 


**Application Description 

The purpose of boostersphere is to deliver a user-friendly and organizational based application that allows users to 
input events and organize volunteers, funds, as well as make brand-new events. This application works with a fully-fledged backend, frontend, and server base to deliver an effective application for all events based organizational needs. 