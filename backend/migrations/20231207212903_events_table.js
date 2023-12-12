/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
    table.increments();
    table.string('title'); 
    table.string('type');
    table.string('description');
    table.date('start');
    table.date('end');
    // date in this format 'yyyy-mm-dd'
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
