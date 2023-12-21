/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {title: 'Holiday Cookout', type: 'Squadron Party', description: 'Get together for connection, potluck style. Main meat-dishes provided, bring sides and desserts!', start: new Date, end: new Date, fundRequired: 350, volunteerNeeded: 6, userId: 1},
    {title: 'Going Away Party', type: 'Delta Event', description: 'Say Goodbye to Cohort 21 from Supra Coders!', start: new Date, end: new Date, fundRequired: 300, volunteerNeeded: 1, userId: 1},
    {title: 'Elementary School Visit', type: 'Community Partner', description: 'Visiting Douglass Valley Elementary to show off Space Force!', start: new Date, end: new Date, fundRequired: 0, volunteerNeeded: 4, userId: 1},
    {title: '5k FUN RUN', type: 'Community Fundraiser', description: 'Volunteer to help with our 1st Annual 5k  FUN RUN Fundraiser!', start: new Date, end: new Date, fundRequired: 600, volunteerNeeded: 10, userId: 1}
  ]);
};
