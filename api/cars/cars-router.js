const router = require('express').Router()

//require model
const Cars = require('./cars-model')

//require middleware
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

//endpoints
router.get('/', async (req, res, next) => {
    try {
      const data = await Cars.getAll()
      res.json(data)
    } catch (err) {
      next(err);
    }
  })

router.get('/:id', checkCarId, async (req, res, next) => {
    try {
      res.json(req.car) //this gets populated by middleware, so no need to call db twice
    }
    catch (err) {
      next(err);
    }
  })

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
      const data = await Cars.create(req.body)
      res.json(data)
    }
    catch (err) {
      next(err);
    }
  })

//error-catch endpoint
router.use((err, req, res, next) => { // eslint-disable-line

    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

//export
module.exports = router;