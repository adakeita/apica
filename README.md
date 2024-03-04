# Apica

Apica is a RESTful API that demonstrates basic CRUD operations on a relational database, showcasing endpoints for managing customers, products, vending machines, and transactions. The backend is hosted on Railway, providing a live environment to interact with.

## Features

- CRUD operations for managing customers, products, vending machines, and transactions.
- Hosted on Railway for live interaction.
- Simple front-end demonstrating the API's functionality.

## API Endpoints

### Customers

- `GET /customers`: Retrieve all customers.
- `POST /customers`: Add a new customer. Requires name and email in the request body.

### Products

- `GET /products`: Retrieve all products.
- `POST /products`: Add a new product. Requires name and price in the request body.

### Vending Machines

- `GET /vending-machines`: Retrieve all vending machines.
- `POST /vending-machines`: Add a new vending machine. Requires location in the request body.

### Transactions

- `GET /transactions`: Retrieve all transactions.
- `POST /transactions`: Add a new transaction. Requires customer_id, product_id, vending_machine_id, price, and quantity in the request body.
- `DELETE /transactions/:id`: Delete a transaction by ID.

## Frontend

The frontend provides a simple interface to view the API endpoints

## Hosting

The Apica backend is hosted at Railway, accessible at the following URL:

https://apica-production-779f.up.railway.app/

## Environment

Ensure your environment variables are set correctly for connecting to the database:

- `PGUSER`: PostgreSQL user
- `PGHOST`: PostgreSQL host
- `PGDATABASE`: PostgreSQL database name
- `PGPASSWORD`: PostgreSQL password
- `PGPORT`: PostgreSQL port

## Security

Apica does not expose any sensitive information. Database credentials and other secrets are managed securely using environment variables.

## Getting Started

To run Apica locally:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure your environment variables as described in the Environment section.
4. Start the server with `npm start`.