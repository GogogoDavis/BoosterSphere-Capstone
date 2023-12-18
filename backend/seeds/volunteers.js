/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('volunteers').del()
  await knex('volunteers').insert([
    {firstName: 'Joel', lastName: 'Dimpler', email:'helpfulperson@gmail.com', phone:'123-456-7890', event_id: 1}
  ]);
};
