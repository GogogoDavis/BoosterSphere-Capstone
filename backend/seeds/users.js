/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {username:'coolguy62', rankTitle:'MSgt', firstName:'bill', lastName:'boberton', email:'billbob@gmail.com', role: 'admin'}
  ]);
};
