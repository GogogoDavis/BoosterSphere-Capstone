/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('funds').del()
  await knex('funds').insert([
    { title:'idk fire', details:'firey goodness', amount: 223.50, currRaised: 2},
    { title:'idk water', details:'another watery goodness', amount: 223.50, currRaised: 3}
  ]);
};
