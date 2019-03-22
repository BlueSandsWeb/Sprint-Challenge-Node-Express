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

// CREATE
router.post("/", async (req, res) => {
  const project = req.body;
  try {
    const newProject = await projectModel.insert(project);
    res.status(201).json(newProject);
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
  console.log(`\n id: ${id} \n changes: ${changes}`);
  try {
    const updatedProject = await projectModel.update(id, changes);
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ error: "404 error, no project found" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await projectModel.remove(id);
    if (deleted === 1) {
      res.status(204).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "404 project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
