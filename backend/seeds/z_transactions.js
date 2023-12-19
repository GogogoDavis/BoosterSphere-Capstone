/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transaction').del()
  await knex('transaction').insert([
    {id: 1, title: 'bowling', amount: 200, event_id: 1, status: 'add'},

  ]);
};
