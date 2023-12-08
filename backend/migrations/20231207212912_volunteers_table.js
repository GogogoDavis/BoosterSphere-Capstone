/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('volunteers', table => {
    table.increments();
    table.string('firstName'); 
    table.string('lastName');
    table.string('email');
    table.string('phone');
    table.integer('event_id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('volunteers')
};
