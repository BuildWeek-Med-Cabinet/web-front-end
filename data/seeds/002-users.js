const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE users CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'mixo', email: 'mixoooo@gmail.com', password: 'stoner123' },
        {username: 'roongy', email: 'roongytoongy@gmail.com', password: 'blazeit12' },
        {username: 'xiana', email: 'tamixo123@gmail.com', password: 'dankush12' }
      ]);
    });
};