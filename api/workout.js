var express = require('express')
var router = express.Router()
const {
  authorizationGeneric
} = require('../middleware')
const {
  // startWorkout,
  selectWorkout,
  scheduleWorkout,
  // resumeWorkout,
  // doneWorkout,
  viewWorkout
} = require('../services/workout')

router.get('/view/:id', authorizationGeneric, viewWorkout)

router.get('/select', authorizationGeneric, selectWorkout)

router.post('/schedule/:id', authorizationGeneric, scheduleWorkout)

// router.post('/workout/start/:id', authorizationGeneric, startWorkout)

// router.post('/workout/resume/:id', authorizationGeneric, resumeWorkout)

// router.post('/workout/done/:id', authorizationGeneric, doneWorkout)

module.exports = router
