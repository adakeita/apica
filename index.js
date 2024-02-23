require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
});

pool.on("error", (err, client) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample data

// Routes
// GET all
app.get("/customers", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM customers");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// POST new customer
app.post("/customers", async (req, res) => {
	try {
		const { name, email } = req.body;
		const result = await pool.query(
			"INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *",
			[name, email]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Routes products
// GET all
app.get("/products", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM products");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// POST a new product
app.post("/products", async (req, res) => {
	try {
		const { name, price } = req.body;
		const result = await pool.query(
			"INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
			[name, price]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {}
});

// Routes vending machines

// GET all
app.get("/vending-machines", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM vending_machines");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// POST a new vending machine
app.post("/vending-machines", async (req, res) => {
	try {
		const { location } = req.body;
		const result = await pool.query(
			"INSERT INTO vending_machines (location) VALUES ($1) RETURNING *",
			[location]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {}
});

// Routes transactions

// All transactions
app.get("/transactions", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM transactions");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// POST new transaction
app.post("/transactions", async (req, res) => {
	try {
		const { customerId, productId, vendingMachineId } = req.body;
		const result = await pool.query(
			"INSERT INTO transactions (customer_id, product_id, vending_machine_id) VALUES ($1, $2, $3) RETURNING *",
			[customerId, productId, vendingMachineId]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// PUT mark a transaction as deleted
app.put("/transactions/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const result = await pool.query(
			"UPDATE transactions SET deleted = true WHERE id = $1 RETURNING *",
			[id]
		);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: "Transaction not found" });
		}
		res.json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
