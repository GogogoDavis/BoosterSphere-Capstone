/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
    table.increments('id');
    table.string('title'); 
    table.string('type');
    table.string('description');
    table.dateTime('start', 80);
    table.dateTime('end', 80);
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
