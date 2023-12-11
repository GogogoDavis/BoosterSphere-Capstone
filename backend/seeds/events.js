/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {eventTitle: 'holiday cookout', type: 'party', description: 'we gon git together an cookup soma dat good good.', date: '2023-12-20', fundRequired: 300, volunteerNeeded: 10, userId: 1}
  ]);
};
