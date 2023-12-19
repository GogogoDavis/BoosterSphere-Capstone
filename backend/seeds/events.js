/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {title: 'Holiday Cookout', type: 'Squadron Party', description: 'Get together for connection, potluck style. Main meat-dishes provided, bring sides and desserts!', start: new Date, end: new Date, fundRequired: 300, volunteerNeeded: 10, userId: 1}
  ]);
};
