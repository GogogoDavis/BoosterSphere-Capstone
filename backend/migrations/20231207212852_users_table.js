/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('userId');
    table.string('rankTitle');
    table.string('username');
    table.string('firstName');
    table.string('lastName');
    table.string('email');
    table.string('role');
    table.text('profileImage');
    table.string('password');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
