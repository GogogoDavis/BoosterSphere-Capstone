/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('donations').del()
  await knex('donations').insert([
    {amount: 20, name: 'Anonymous'},
    {amount: 15, name: 'Sgt Coolguy'},
    {amount: 22, name: 'MSgt Awesome'}
  ]);
};
