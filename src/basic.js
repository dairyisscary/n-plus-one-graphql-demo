const TicketService = require("./services/ticket");
const UserService = require("./services/user");

function getAuthorsForAllTicketsBad() {
  const authors = [];
  const tickets = TicketService.getAllTicketsSync();
  for (const ticket of tickets) {
    const author = UserService.getUserByIdSync(ticket.authorId);
    authors.push(author);
  }
  return authors;
}

function getAuthorsForAllTicketsGood() {
  const authorIds = [];
  const tickets = TicketService.getAllTicketsSync();
  for (const ticket of tickets) {
    authorIds.push(ticket.authorId);
  }
  return UserService.getManyUsersByIds(authorIds);
}

/*

  GET /tickets HTTP/1.1
  # then repeated n (number of tickets) times
  GET /users/11 HTTP/1.1
  GET /users/22 HTTP/1.1
  GET /users/5 HTTP/1.1
  GET /users/12 HTTP/1.1
  GET /users/19 HTTP/1.1
  # ...

  # VS

  GET /tickets HTTP/1.1
  GET /users/?ids=11,22,5,12,19


  # Or expresssed in SQL queries:


  SELECT * FROM tickets;
  -- then, repeated n (number of tickets) times
  SELECT * FROM users WHERE id = ticket.authorId;
  SELECT * FROM users WHERE id = ticket.authorId;
  SELECT * FROM users WHERE id = ticket.authorId;
  SELECT * FROM users WHERE id = ticket.authorId;
  SELECT * FROM users WHERE id = ticket.authorId;
  -- and so on...

  -- VS

  SELECT * FROM tickets;
  SELECT * FROM users WHERE id IN authorIds;
 */
