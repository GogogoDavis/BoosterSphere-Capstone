/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('funds').del()
  await knex('funds').insert([
    {type:'idk fire', amount: 223.50, event_id: 1}
  ]);
};
