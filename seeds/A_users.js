
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({
        username: 'Rico',
        name: 'Rico Rojas',
        profilepic: 'https://avatars3.githubusercontent.com/u/14986071'
    }),
    knex('users').insert({
        username: 'Nathan',
        name: 'Nathan Schwartz',
        profilepic: 'https://avatars1.githubusercontent.com/u/7296584'
    }),
    knex('users').insert({
        username: 'John',
        name: 'John Carpenter',
        profilepic: 'https://avatars0.githubusercontent.com/u/2602674'
    }),
    knex('users').insert({
        username: 'Ion',
        name: 'Ion Gorincioi',
        profilepic: 'https://avatars0.githubusercontent.com/u/14967432'
    }),
    knex('users').insert({
        username: 'Matt',
        name: 'Matt J Kelly',
        profilepic: 'https://scontent-dfw1-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1385112_10201668016878470_1332142746_n.jpg?oh=cb98f293f62e6c1db06b83ae2a82fe6d&oe=577FBF38'
    })
  );
};
