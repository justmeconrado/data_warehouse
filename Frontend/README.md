# DataWarehouse

Este proyecto consiste en una herramienta que permite a una compañía de Marketing administrar todos los contactos de sus clientes para sus campañas.

## Resources and technologies used:

- HTML

- CSS

- JavaScript

- Node JS

- Express js

- Sequelize

- MySQL

- JWT for authentication through Token

- Postman to test API Endpoints

- Swagger to build API Documentation

## Installation:

Clone the project from a terminal

`git clone https://github.com/justmeconrado/data_warehouse.git`

## Dependencies:

Install the required dependencies for the correct operation of the application in the _Backend_ folder.

`npm install`

## Database:

Use the _data_warehouse.sql_ file to import it into your Database client, it will provide the entire structure.

## Important:

Remember to modify the file _db.js_ with the data of your environment.

## Start the Server:

In the package.json folder replace the line:

`"scripts": {"test": "echo \"Error: no test specified\" && exit 1"},`

For this line:

`"scripts": {"start": "node index","dev": "nodemon index"},`

Position yourself in the _Backend_ folder from a terminal and execute the following Script:

`npm run dev`

## Documentation:

Check the file _spec.yml_, here you will find the endpoints and requirements to use the API.

## Repository

Link to the repository on GitHub:

`https://github.com/justmeconrado/data_warehouse.git`
