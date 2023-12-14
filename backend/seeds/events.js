/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {title: 'holiday cookout', type: 'party', description: 'we gon git together an cookup soma dat good good.', start: new Date, end: new Date, fundRequired: 300, volunteerNeeded: 10, userId: 1}
  ]);
};
