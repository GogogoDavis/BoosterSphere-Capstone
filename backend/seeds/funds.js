/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('funds').del()
  await knex('funds').insert([
    {id: 1, title:'idk fire', amount: 223.50, event_id: 1},
    {id: 2, title:'idk fire', amount: 223.50, event_id: 1}
  ]);
};
