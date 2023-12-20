/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('shop').del()
  await knex('shop').insert([
    { title:"4 SOPS PVC Patch", image_path: "../images/4 SOPS USSF PVC Patch.jpg", price: 10},
    { title:"75th ISRS PVC Patch", image_path: "../images/75th ISRS.jpg", price: 10},
    { title:"1 SOPS", image_path: "../images/1 SOPS.jpg", price: 10},
    { title:"4 SPCS PVC Patch", image_path: "../images/4 SPCS.jpg", price: 10},
    { title:"72 ISRS PVC Patch", image_path: "../images/72 ISRS.jpg", price: 10},
    { title:"533 TRS Friday PVC Patch", image_path: "../images/533 TRS Friday PVC Patch.jpg", price: 10},
    { title:"Cheyenne Mountain Complex PVC Patch", image_path: "../images/CHEYENNE.jpg", price: 10},
    { title:"DEL 4 PVC Patch", image_path: "../images/DEL 4.jpg", price: 10},
    { title:"DEL 5 PVC Patch", image_path: "../images/DEL 5.jpg", price: 10},
    { title:"DEL 7 PVC Patch", image_path: "../images/DEL7.jpg", price: 10},
    { title:"SBD 1 PVC Patch", image_path: "../images/SBD 1.jpg", price: 10},
    { title:"DEL 2 PVC Patch", image_path: "../images/Space Delta 2.jpg", price: 10},
    { title:"DEL 3 PVC Patch", image_path: "../images/Space Delta 3.jpg", price: 10},
    { title:"DEL 10 PVC Patch", image_path: "../images/Space_Delta_10_emblem.png", price: 10},
    { title:"SPOC PVC Patch", image_path: "../images/SPOC.jpg", price: 10},
    { title:"THULE PVC Patch", image_path: "../images/THULE.jpg", price: 10},
  ]);
};

