
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/customers.json');

function readData() {
    return JSON.parse(fs.readFileSync(filePath));
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

router.get('/', (req, res) => {
    res.json(readData());
});

router.post('/', (req, res) => {
    const customers = readData();
    const newCustomer = { id: Date.now(), ...req.body };
    customers.push(newCustomer);
    writeData(customers);
    res.status(201).json(newCustomer);
});

router.put('/:id', (req, res) => {
    const customers = readData();
    const index = customers.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Not found');
    customers[index] = { ...customers[index], ...req.body };
    writeData(customers);
    res.json(customers[index]);
});

router.delete('/:id', (req, res) => {
    let customers = readData().filter(c => c.id !== parseInt(req.params.id));
    writeData(customers);
    res.status(204).send();
});

module.exports = router;
