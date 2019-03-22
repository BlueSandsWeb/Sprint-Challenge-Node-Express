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
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  try {
    const updatedAction = await actionModel.update(id, changes);
    if (updatedAction) {
      res.status(200).json(updatedAction);
    } else {
      res.status(404).json({ error: "404 error, no action found" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await actionModel.remove(id);
    if (deleted === 1) {
      res.status(204).json({ message: "Action deleted successfully" });
    } else {
      res.status(404).json({ error: "404 action not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
