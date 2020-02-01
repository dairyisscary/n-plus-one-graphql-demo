const { profileServiceCall, sleep, sleepSync } = require("../util");

const USERS = {
  u1: {
    id: "u1",
    name: "Plato",
  },
  u2: {
    id: "u2",
    name: "Aristotle",
  },
};

module.exports = {
  getUserByIdSync: profileServiceCall("fetch user", (id) => {
    sleepSync();
    return USERS[id] || null;
  }),
  getUserById: profileServiceCall("fetch user", async (id) => {
    await sleep();
    return USERS[id] || null;
  }),
  getManyByIds: profileServiceCall("fetch many users", async (ids) => {
    await sleep();
    return ids.map(id => USERS[id] || null);
  }),
};
