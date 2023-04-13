const express = require("express");
const router = express.Router();
const controller = require("../controllers/websites");

/* POST websites. */
router
  .post("/", controller.createWebsite)
  .get("/", controller.listAllWebsites)
  .patch("/:id", controller.updateWebsite)
  .delete("/:id", controller.deleteWebsite);

module.exports = router;
