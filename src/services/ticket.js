const { profileServiceCall, sleep, sleepSync } = require("../util");

const TICKETS = {
  t1: {
    id: "t1",
    authorId: "u1",
    content: "Write _The Republic_",
  },
  t2: {
    id: "t2",
    authorId: "u1",
    content: "Explain how the soul works to those idiot Sophists",
  },
  t3: {
    id: "t3",
    authorId: "u2",
    content: "Help Plato with that shit I promised him",
  },
};

module.exports = {
  getAllTicketsSync: profileServiceCall("fetch all tickets", () => {
    sleepSync();
    return Object.values(TICKETS);
  }),
  getAllTickets: profileServiceCall("fetch all tickets", async () => {
    await sleep();
    return Object.values(TICKETS);
  }),
};
