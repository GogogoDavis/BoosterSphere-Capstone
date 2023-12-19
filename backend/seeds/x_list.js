/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('list').del()
  await knex('list').insert([
    {id: 1, event: 'Funds'},
    {id: 2, event: 'Events'},
    {id: 3, event: 'Mopey'}
  ]);
};
