
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('inventory').del()
    .then(function () {
      // Inserts seed entries
      return knex('inventory').insert([
        {name: 'sword', type: 'weapon', quantity: 1},
        {name: 'staff', type: 'weapon', quantity: 1},
        {name: 'robe', type: 'armor', quantity: 1},
        {name: 'chest', type: 'treasure', quantity: 1},
      ]);
    });
};
