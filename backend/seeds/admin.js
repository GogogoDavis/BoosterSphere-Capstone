/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('admin').del()
  await knex('admin').insert([
    {username: 'john', role: 'idk super user or something'},
    {username: 'bill', role: 'idk super user or something'},
    {username: 'bob', role: 'idk super user or something'}
  ]);
};
