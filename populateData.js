/**
 * Script to retrieve and format mtn project data
 * @param {string[]} MTN_PROJ_USER_IDS - ids to fetch data for
 * @param {string} MTN_PROJ_KEY - api key
 *
 * @returns writes store.json to TARGET_DIR
 */
const fs = require('fs');
const path = require('path');
const MountainProject = require('./clients/MountainProject');

const MTN_PROJ_KEY = process.env.MTN_PROJ_KEY || null;
const MTN_PROJ_USER_IDS = process.env.MTN_PROJ_USER_IDS || null;
const TARGET_DIR = path.join(__dirname, 'data');

const mtnProj = new MountainProject(MTN_PROJ_KEY);

const store = {
  users: {
    /*
     * [id]: {
     *   ticks: [
     *   ]
     * }
     */
  },
  routes: {
    /*
     * [id] : {
     * }
     */
  },
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
    // Extend users object with tickData
    users.forEach((id, idx) => {
      store.users[id] = { ...store.users[id], ...userTicks[idx] };
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
  .then(data => {
    // Store routes keyed on route id
    store.routes = data.routes.reduce(
      (acc, route) => ({ ...acc, [route.id]: route }),
      {},
    );
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
