/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
    table.increments();
    table.string('eventTitle'); 
    table.string('type');
    table.string('description');
    table.date('date');
    table.integer('fundRequired');
    table.integer('volunteerNeeded')
    table.integer('userId');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events')
};
