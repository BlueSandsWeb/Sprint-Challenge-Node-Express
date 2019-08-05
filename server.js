const express = require("express");
const server = express();

server.use(express.json());

const actionRoutes = require("./routers/actionRoutes.js");
const projectRoutes = require("./routers/projectRoutes.js");

server.use("/api/action", actionRoutes);
server.use("/api/project", projectRoutes);

// READ - get()
server.get("/", (req, res) => {
  res.status(200).send("try /api/actionRoutes or /api/actionRoutes");
});

// No page found
server.use((req, res) => {
  res
    .status(404)
    .send(
      "Oops! There's no page by that web address.  Please try a different URL."
    );
});

module.exports = server;
