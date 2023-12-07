/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('initial_table').del()
  await knex('initial_table').insert([
    {id: 1, name: 'JSON.Bourne'}
  ]);
};
