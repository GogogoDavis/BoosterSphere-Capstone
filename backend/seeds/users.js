/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([                                                                                                     // password is 'dwadwa' for both
    {username:'coolguy62', rankTitle:'MSgt', firstName:'bill', lastName:'boberton', email:'billbob@gmail.com', role: 'admin', password: '$2b$10$iiiiy81rY6T6lD11PHcPt.i4HIRwGxBTV14f5x5N8ivE1mpBUXxqS'},
    {username:'fake', rankTitle:'spc3', firstName:'bill', lastName:'boberton', email:'fake@email.com', role: 'admin', password: '$2b$10$iiiiy81rY6T6lD11PHcPt.i4HIRwGxBTV14f5x5N8ivE1mpBUXxqS'}
  ]);
};

