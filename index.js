const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample data
let customers = [{ id: 1, name: "John Doe", email: "joe@gmail.com" }];
let products = [
	{ id: 1, name: "Coke", price: 1.5 },
	{ id: 2, name: "Pepsi", price: 1.5 },
];
let vendingMachines = [
	{ id: 1, location: "New York" },
	{ id: 2, location: "Los Angeles" },
];
let transactions = [
	{
		id: 1,
		customerId: 1,
		productId: 1,
		vendingMachineId: 1,
		timestamp: new Date(),
		deleted: false,
	},
];

// Routes
// GET all
app.get("/customers", (req, res) => {
	res.json(customers);
});

// POST new customer
app.post("/customers", (req, res) => {
	const { name, email } = req.body;
	const newCustomer = { id: customers.length + 1, name, email };
	customers.push(newCustomer);
	res.status(201).json(newCustomer);
});

// Routes products
// GET all
app.get("/products", (req, res) => {
	res.json(products);
});

// POST a new product
app.post("/products", (req, res) => {
	const { name, price } = req.body;
	const newProduct = { id: products.length + 1, name, price };
	products.push(newProduct);
	res.status(201).json(newProduct);
});

// Routes vending machines

// GET all
app.get("/vending-machines", (req, res) => {
	res.json(vendingMachines);
});

// POST a new vending machine
app.post("/vending-machines", (req, res) => {
	const { location } = req.body;
	const newVendingMachine = { id: vendingMachines.length + 1, location };
	vendingMachines.push(newVendingMachine);
	res.status(201).json(newVendingMachine);
});

// Routes transactions

// All transactions
app.get("/transactions", (req, res) => {
	res.json(transactions);
});

// POST new transaction
app.post("/transactions", (req, res) => {
	const { customerId, productId, vendingMachineId } = req.body;
	const newTransaction = {
		id: transactions.length + 1,
		customerId,
		productId,
		vendingMachineId,
		timestamp: new Date(),
		deleted: false,
	};
	transactions.push(newTransaction);
	res.status(201).json(newTransaction);
});

// PUT mark a transaction as deleted
app.put("/transactions/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const transaction = transactions.find((transaction) => transaction.id === id);
	if (!transaction) {
		return res.status(404).json({ message: "Transaction not found" });
	}
	transaction.deleted = true;
	res.json(transaction);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
