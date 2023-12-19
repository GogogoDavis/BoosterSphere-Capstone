/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('admin').del()
  await knex('admin').insert([
    {username: 'John', role: 'Admin'},
    {username: 'Bill', role: 'Admin'},
    {username: 'Bob', role: 'Admin'}
  ]);
};
