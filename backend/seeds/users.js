/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {username:'coolguy62', rankTitle:'MSgt', firstName:'bill', lastName:'boberton', email:'billbob@gmail.com', role: 'admin'},
    {username:'fake', rankTitle:'spc3', firstName:'bill', lastName:'boberton', email:'fake@email.com', role: 'admin'}

  ]);
};
