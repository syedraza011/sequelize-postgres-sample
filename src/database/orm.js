const Sequelize = require('sequelize')
const db = new Sequelize('postgres://jugnoo:Alhumdulilah@localhost:5432/sequelize')

// Database Models

const Brands = db.define('Brands', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Sneakers = db.define('Sneakers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand_id: {
    type: Sequelize.INTEGER,
    relations: {
      model: Brands,
      key: 'id'
    }
  }
})

const Employees = db.define('Employees', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

// Sequelize Lifecycle Hooks

Sneakers.beforeCreate((sneaker) => {
  sneaker.name = sneaker.name.toUpperCase()
})

Brands.beforeCreate((brand) => {
  brand.name = brand.name.toUpperCase()
})

// Database Functions

async function syncAndSeed() {
  // Create Models
  await db.sync({ force: true })
  // Create Instances
  await Brands.create({ id: 1, name: 'Nike' })
  await Brands.create({ id: 2, name: 'Adidas' })
  await Brands.create({ id: 3, name: 'Converse' })
  await Sneakers.create({ id: 1, name: 'Air Max', brand_id: 1 })
  await Sneakers.create({ id: 2, name: 'Dunk Low Kentucky', brand_id: 1 })
  await Sneakers.create({ id: 3, name: 'Jordans', brand_id: 1 })
  await Employees.create({ id: 1, name: 'john', email: 'john@fullstackacademy.com' })
}

async function init() {
  try {
    await db.authenticate()
    await syncAndSeed()
  } catch (err) {
    console.error(err)
  }
}

// Brands CRUD Functions

async function getBrands() {
  try {
    const brands = await Brands.findAll()
    return brands
  } catch (err) {
    console.error(err)
  }
}

async function getBrand(id) {
  try {
    const brand = await Brands.findByPk(id)
    return brand
  } catch (err) {
    console.error(err)
  }
}

async function createBrand(id, name) {
  try {
    const brand = await Brands.create({ id, name })
    return brand
  } catch (err) {
    console.error(err)
  }
}

async function updateBrand(id, name) {
  try {
    const brand = await Brands.update({ name }, { where: { id } })
    return brand
  } catch (err) {
    console.error(err)
  }
}

async function deleteBrand(id) {
  try {
    const brand = await Brands.destroy({ where: { id } })
    return brand
  } catch (err) {
    console.error(err)
  }
}

// Sneakers CRUD Functions

async function getSneakers() {
  try {
    const sneakers = await Sneakers.findAll()
    return sneakers
  } catch (err) {
    console.error(err)
  }
}

async function getSneaker(id) {
  try {
    const sneaker = await Sneakers.findByPk(id)
    return sneaker
  } catch (err) {
    console.error(err)
  }
}

async function createSneaker(id, name, brand_id) {
  try {
    const sneaker = await Sneakers.create({ id, name, brand_id })
    return sneaker
  } catch (err) {
    console.error(err)
  }
}

async function updateSneaker(id, name, brand_id) {
  try {
    const sneaker = await Sneakers.update({ name, brand_id }, { where: { id } })
    return sneaker
  } catch (err) {
    console.error(err)
  }
}

async function deleteSneaker(id) {
  try {
    const sneaker = await Sneakers.destroy({ where: { id } })
    return sneaker
  } catch (err) {
    console.error(err)
  }
}

// Employees CRUD Functions

async function getEmployees() {
  try {
    const employees = await Employees.findAll()
    return employees
  } catch (err) {
    console.error(err)
  }
}

async function getEmployee(id) {
  try {
    const employee = await Employees.findByPk(id)
    return employee
  } catch (err) {
    console.error(err)
  }
}

async function createEmployee(id, name, email) {
  try {
    const employee = await Employees.create({ id, name, email })
    return employee
  } catch (err) {
    console.error(err)
  }
}

async function updateEmployee(id, name, email) {
  try {
    const employee = await Employees.update({ name, email }, { where: { id } })
  } catch (err) {
    console.error(err)
  }
}

async function deleteEmployee(id) {
  try {
    const employee = await Employees.destroy({ where: { id } })
    return employee
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  init,
  getBrands
}
