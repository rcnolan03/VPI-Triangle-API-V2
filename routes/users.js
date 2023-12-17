var express = require("express");
var router = express.Router();
const userDb = require("../db/users");
const checkAuth = require("../middleware/authentication");

/**
 * Gets all users including private data
 */
router.get("/", checkAuth, async (req, res, next) => {
  try {
    const users = await userDb.getUsersAuthenticatedData();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * Gets all users public data
 */
router.get("/public", async (req, res) => {
  try {
    const users = await userDb.getUsersPublicData();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * Creates a new user
 */
router.post("/create", checkAuth, async (req, res) => {
  try {
    const user = await userDb.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/**
 * User by id functions
 */
router
  .route("/:id")
  .get(checkAuth, async (req, res) => {
    try {
      const user = await userDb.getUserById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  })
  .put(checkAuth, async (req, res) => {
    try {
      const user = await userDb.updateUserById(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  })
  .delete(checkAuth, async (req, res) => {
    try {
      const userId = req.params.id;

      await userDb.deleteUserById(userId);
      res.status(200).send({ message: `User ${userId} deleted successfully` });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
