const express = require("express");
const router = express.Router();
const {getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout} = require("../controllers/workoutController");

//GET routes
router.get("/", getWorkouts)

router.get("/:id", getWorkout)

//POST/CREATE route
router.post("/", createWorkout)

//UPDATE route
router.put("/:id", updateWorkout)

//DELETE ROUTE
router.delete("/:id",deleteWorkout)

module.exports = router;