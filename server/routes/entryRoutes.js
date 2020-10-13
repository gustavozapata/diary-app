const express = require("express");
const entryController = require("../controllers/entryController");
const router = express.Router();

router
  .route("/")
  .get(entryController.getEntries)
  .post(entryController.createEntry);

router
  .route("/:id")
  .patch(entryController.updateEntry)
  .delete(entryController.deleteEntry);

router.route("/:id/comment").patch(entryController.postComment);

module.exports = router;
