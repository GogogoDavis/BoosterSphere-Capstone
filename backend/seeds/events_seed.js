/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('events_table').del()
    await knex('events_table').insert([
      {id: 1, eventTitle: 'Clean the beach', type: 'volunteer', description: 'Clean the beach from trash and debri', fundRequired: 0, volunteerNeeded: 20, userID: 1}
    ]);
  };
  