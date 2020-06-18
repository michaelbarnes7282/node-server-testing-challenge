
exports.up = function(knex) {
  return knex.schema.createTable("inventory", tbl => {
      tbl.increments();

      tbl.string('name', 255).notNullable();
      tbl.string('type', 255).notNullable();
      tbl.integer('quantity').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfEExists('inventory');
};
