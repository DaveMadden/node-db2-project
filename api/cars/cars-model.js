const db = require('../../data/db-config')

const getAll = async () => {
  const rows = await db('cars')
  return rows
}

const getById = async (id) => {
  const record = await db('cars')
    .where("id", id)
    .first()
  return record
}

const create = async (newCar) => {
  const thing = await db('cars')
    .insert(newCar)
  
  return await getById(thing)
}

module.exports = {
  getAll,
  getById,
  create
}