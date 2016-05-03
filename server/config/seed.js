/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Work from '../api/work/work.model';

Work.find({}).remove(function() {
  Work.create({
    image: '/assets/work.png',
    title: 'Work 1',
    description: 'here it is',
    tags: [ 'ink', 'work', 'here' ],
    _creator: "5727d4b0ef73b19220d48e82",
    email: 'test@example.com',
    userName: 'test@example.com'
  });
});

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });



