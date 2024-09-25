const router = require("express").Router();

router.get("/", async (req, res) => {
    res.status(200).send({
        message: "Server is up and running.",
    });
});

module.exports = router;