const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
    .then(response=>{
      if(!response){
        res.status(404).json({ message: `car with id ${req.params.id} is not found` })
      }
      else{
        req.car = response //puts the car row on the req object
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: `${err}`})
  })
}

const checkCarPayload = (req, res, next) => {
  let missingField = ""

  if (req.body.vin === undefined){
    missingField = "vin"}
  if (req.body.make === undefined){
    missingField = "make"}
  if (req.body.model === undefined){
    missingField = "model"}
  if (req.body.mileage === undefined){
    missingField = "mileage"}
  
  if (missingField === ""){
    next();
  }
  else{
    res.status(400).json({ message: `${missingField} is missing`})
  }
  
}

const checkVinNumberValid = (req, res, next) => {
  if (vinValidator.validate(req.body.vin)){
    next();
  }
  else{
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  }
}

const checkVinNumberUnique = (req, res, next) => {
  Cars.getByVIN(req.body.vin)
    .then(response=>{
      if (response.length === 0){
        next();
      }
      else{
        res.status(400).json({ message: `vin ${req.body.vin} already exists`})
      }
    })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}