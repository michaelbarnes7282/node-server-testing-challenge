const db = require('../data/dbConfig');

module.exports = {
    getAll,
    insert,
    remove
}

function getAll() {
    return db('inventory');
};

function insert(item) {
    return db("inventory")
    .insert(item, "id")
    .then(([id]) => {
        return findById(id);
    });
};

function remove(id) {
    return db('inventory')
    .where({ id })
    .del();
}

function findById(id) {
    return db("inventory").where({ id }).first();
  }