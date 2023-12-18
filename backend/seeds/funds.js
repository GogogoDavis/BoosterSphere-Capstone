/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('funds').del()
  await knex('funds').insert([
    { title:'Delta Table Cloth', details:'Raising money to buy tablecloths with the Delta Logos on them.', amount: 223.50, currRaised: 73},
    { title:'Patches', details:'Raising money to purchase newly approved morale patch. Will sell to replace the funds raised!', amount: 500, currRaised: 109}
  ]);
};
