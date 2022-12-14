const crud = require('../lib/rest-crud')
const { ObjectId } = require('mongoose').Types

module.exports = {
  startWorkout: async (req, res, next) => {
    // STEPS OF STARTING WORKING OUT

    // STEP #1
    // - build your own routine for certain period of date & time
    
    // STEP #2
    // - workout your selected routine

    // STEP #3
    // - quickly resume your workout on daily basis

    // STEP #4
    // - finish your workout and get rewards

    // STEP #5
    // - then build again your workout routine
  },
  selectWorkout: async (req, res, next) => {
    // select your workout from your own routine
    const { type } = req.body
    const entries = await crud('trainings').viewAll({ type })

    res.status(200).json({
      entries
    })
  },
  scheduleWorkout: async (req, res, next) => {
    const { ...schedule } = req.body
    const { id } = req.params
    const response = await crud('personalPlans').create({
      ...schedule,
      userID: id
    })
    res.status(201).json({
      message: 'Scheduled workout successfully',
      response
    })
  },
  resumeWorkout: async (req, res, next) => {
    // resume your last session in your workout routine
  },
  doneWorkout: async (req, res, next) => {
    // get done on your routine and suggest to build a workout again
  },
  viewWorkout: async (req, res, next) => {
    // view current workout while on-progress
    const { id } = req.params
    const randReps = Math.floor(Math.random() * (15 - 8 + 1)) + 8
    let response = {}
    response['type'] = 'testing',
    response['training'] = 'testing name'
    response['repition'] = randReps
    response['sets'] = 4
    response['goals'] = {
      repition: response['repition'],
      sets: response['sets']
    }
    const plans = await crud('personalPlans').rawCrud().aggregate([
      {
        '$match': {
          'userID': ObjectId(id)
        }
      }, {
        '$unwind': {
          'path': '$trainings', 
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$lookup': {
          'from': 'trainings', 
          'localField': 'trainings', 
          'foreignField': '_id', 
          'as': 'trainings'
        }
      }, {
        '$unwind': {
          'path': '$trainings', 
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$project': {
          'trainings': 1
        }
      }
    ])
    const extResponse = []

    for (const plan of plans) {
      extResponse.push(plan.trainings)
    }

    response['plan'] = extResponse

    res.status(200).json({
      ...response,
    })
  }
}