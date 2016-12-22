'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('messages').insert({
          id: 1,
          name: 'Criminal',
          message: 'What Are You?',
          created_at: new Date('2016-06-26T14:26:16.000Z'),
          updated_at: new Date('2016-06-26T14:26:16.000Z')
        }),
        knex('messages').insert({
          id: 2,
          name: 'Batman',
          message: 'I\'m Batman',
          created_at: new Date('2016-06-26T14:26:16.000Z'),
          updated_at: new Date('2016-06-26T14:26:16.000Z')
        })
      ])
      .then(() => {
         return knex.raw(
           "SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages));"
         );
       });
    });
};
