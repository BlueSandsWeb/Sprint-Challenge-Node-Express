const express = require("express");
const router = express.Router();

const projectModel = require("../data/helpers/projectModel.js");

router.get("/", async (req, res) => {
  try {
    const posts = await projectModel.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await projectModel.get(id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

// router.post('/', async (req, res) => {

// })

// router.put('/', async (req, res) => {

// })

// router.delete('/', async (req, res) => {

// })

module.exports = router;
