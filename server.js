const express = require("express");
const server = express();

server.use(express.json());

// READ - get()
server.get("/", (req, res) => {
  res.status(200).send("Homepage");
});

// CREATE - insert()

// UPDATE - update()

// DELETE - remove()

// No page found
server.use((req, res) => {
  res
    .status(404)
    .send(
      "Oops! There's no page by that web address.  Please try a different URL."
    );
});

module.exports = server;
