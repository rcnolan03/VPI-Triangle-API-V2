var express = require("express");
var router = express.Router();
const committeesDb = require("../db/committees");
const checkAuth = require("../middleware/authentication");

/**
 * Gets all committees including private data
 */
router.get("/", checkAuth, async (req, res, next) => {
  try {
    const committees = await committeesDb.getCommittees();
    res.json(committees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * Creates a new committee
 */
router.post("/create", checkAuth, async (req, res) => {
  try {
    const committee = await committeesDb.createCommittee(req.body);
    res.status(201).json(committee);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Gets a committee by id
 */
router
  .route("/:id")
  .get(checkAuth, async (req, res) => {
    try {
      const committee = await committeesDb.getCommitteeById(req.params.id);
      if (committee) {
        res.json(committee);
      } else {
        res.status(404).send("Committee not found");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  })
  .delete(checkAuth, async (req, res) => {
    try {
      const committeeId = req.params.id;

      await committeesDb.deleteCommitteeById(committeeId);
      res
        .status(200)
        .send({ message: `Committee ${committeeId} deleted successfully` });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  })
  .put(checkAuth, async (req, res) => {
    try {
      const committee = await committeesDb.updateCommitteesById(req.body);
      res.json(committee);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
