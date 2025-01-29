const express = require("express");
const router = express.Router();
const {getWorkouts, getWorkout, createWorkout} = require("../controllers/workoutController");

//GET routes
router.get("/", getWorkouts)

router.get("/:id", getWorkout)

//POST/CREATE route
router.post("/", createWorkout)

//UPDATE route
router.put("/:id", )

//DELETE ROUTE
router.delete("/:id", (req, res) => {
    res.json({Msg: "DELETE single workout"})
})

module.exports = router;