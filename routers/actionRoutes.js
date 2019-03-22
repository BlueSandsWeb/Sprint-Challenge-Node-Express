const express = require("express");
const router = express.Router();

const actionModel = require("../data/helpers/actionModel.js");

router.get("/", async (req, res) => {
  try {
    const posts = await actionModel.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await actionModel.get(id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

// CREATE
router.post("/", async (req, res) => {
  const action = req.body;
  try {
    const newAction = await actionModel.insert(action);
    res.status(201).json(newAction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Couldn't add post to database. Try again later" });
  }
});

// UPDATE
// router.put('/', async (req, res) => {

// })

// DELETE
// router.delete('/', async (req, res) => {

// })

module.exports = router;
