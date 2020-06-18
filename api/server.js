const express = require('express');

const Inv = require('../inventory/inventoryModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: "up" });
});

server.get('/inventory', (req, res) => {
    Inv.getAll()
    .then(items => {
        res.status(200).json(items);
    })
    .catch(err => {
        res.status(500).json(err)
    });
})

server.post('/inventory', (req, res) => {
    Inv.insert(req.body)
    .then(item => {
        res.status(201).json(item);
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

server.delete('/inventory/:id', (req, res) => {
    const { id } = req.params;
    Inv.remove(id)
    .then(item => {
        res.status(200).json(item);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = server;