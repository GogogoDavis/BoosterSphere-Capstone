/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('donations').del()
  await knex('donations').insert([
    {amount: 321.5, name: 'billy'},
    {amount: 15, name: 'bob'},
    {amount: 22, name: 'billybob'}
  ]);
};
