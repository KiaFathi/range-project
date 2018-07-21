/*
 * Script to retrieve and format mtn project data
 * Usage:
 * MTN_PROJ_USER_IDS={ID,ID,ID} MTN_PROJ_KEY={KEY} node retrieveData.js
 */

const fs = require('fs');
const path = require('path');
const MountainProject = require('./clients/MountainProject');

const MTN_PROJ_KEY = process.env.MTN_PROJ_KEY || null;
const MTN_PROJ_USER_IDS = process.env.MTN_PROJ_USER_IDS || null;
const TARGET_DIR = path.join(__dirname, 'data');

const mtnProj = new MountainProject(MTN_PROJ_KEY);

const store = {
  users: {},
  routes: {},
};

// fetch all users
const users = MTN_PROJ_USER_IDS.split(',');

console.log('Fetching data for users:', users);
Promise.all(users.map(id => mtnProj.getUser(id)))
  .then(res => {
    users.forEach((id, idx) => {
      store.users[id] = res[idx];
    });
  })
  .then(() => Promise.all(users.map(id => mtnProj.getTicks(id))))
  .then(userTicks => {
    users.forEach((id, idx) => {
      store.users[id].ticks = userTicks[idx];
    });
    const uniqueRoutes = userTicks.reduce((acc, tickData) => {
      const routeIds = tickData.ticks.map(tick => tick.routeId);
      routeIds.forEach(id => {
        acc.add(id);
      });
      return acc;
    }, new Set());
    return [...uniqueRoutes];
  })
  .then(routeIds => mtnProj.getRoutes(routeIds))
  .then(routes => {
    store.routes = routes;
  })
  .then(() => {
    fs.writeFileSync(
      path.join(TARGET_DIR, 'store.json'),
      JSON.stringify(store),
      {
        encoding: 'utf8',
        flag: 'w',
      },
    );
  });
