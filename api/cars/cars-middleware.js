const Cars = require('./cars-model')

const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
    .then(response=>{
      if(!response){
        res.status(404).json({ message: `car with id ${req.params.id} is not found` })
      }
      else{
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: `${err}`})
  })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("CHECK CAR PAYLOAD")
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("CHECK VIN VALID")
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("CHECK VIN UNIQUE")
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}