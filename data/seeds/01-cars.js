exports.seed = async function (knex) {
    // Truncating a table deletes ALL existing entries and resets the primary keys
    await knex('cars').truncate()
    await knex('cars').insert([
      { vin: 'XXX666XXX', make: "Tesla", model: "Model 3", mileage: 20345, title: "OR", transmission: "n/a" },
      { vin: 'YYY$$$YYY', make: "Ford", model: "F-150", mileage: 2444, title: "OR", transmission: "automatic" }
    ]);
  };