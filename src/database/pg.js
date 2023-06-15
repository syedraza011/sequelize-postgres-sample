const { Client } = require("pg");

function createClient() {
  const client = new Client({
    user: "postgres",
    password: "supersecretpassword",
    host: "localhost",
    database: "academy",
  });
  return client
}
// postgres://username:pass@hostname:portnumber
// http://

async function runQuery(sql) {
  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }
}

async function createDatabase() {
  const client = createClient();

  try {
    client.connect();

    const sql = `
    CREATE DATABASE "fsa";
    `

    await client.query(sql);
    client.end();
  } catch (err) {
    console.error(err);
  }

}

async function createTables() {
  const sql = `
  CREATE TABLE "Brands"(
    id INTEGER PRIMARY KEY,
    name VARCHAR(100)
  );
  CREATE TABLE IF NOT EXISTS "Sneakers"(
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand_id INTEGER REFERENCES "Brands"(id)
  );
  `;

  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }

}

async function createRows() {
  const sql = `
  INSERT INTO "Brands"(id, name) VALUES(1, 'Nike');
  INSERT INTO "Brands"(id, name) VALUES(2, 'Adidas');
  INSERT INTO "Brands"(id, name) VALUES(3, 'Converse');
  INSERT INTO "Sneakers"(id, name, brand_id) VALUES(1, 'Air Max', 1);
  INSERT INTO "Sneakers"(id, name, brand_id) VALUES(2, 'Dunk Low Kentucky', 1);
  INSERT INTO "Sneakers"(id, name, brand_id) VALUES(3, 'Jordans', 1);
  `
  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }
}

// CRUD Brand Functions

async function createBrand(name, id) {
  const sql = `
  INSERT INTO "Brands"(id, name) VALUES(${id}, '${name}');
  `
  return await runQuery(sql);
}

async function getBrands() {
  const sql = `
  SELECT * FROM "Brands";
  `
  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }
}

async function updateBrand(id, name) {
  const sql = `
  UPDATE "Brands" SET name='${name}' WHERE id=${id};
  `
  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }
}

// Helpful Brand Functions
async function getLargestBrandId() {
  const sql = `
  SELECT MAX(id) FROM "Brands";
  `
  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }
}

// CRUD Sneaker Functions

async function getSneakersByBrandId(brandId) {
  const sql = `
  SELECT * FROM "Sneakers" WHERE brand_id=${brandId};
  `
  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }
}

async function deleteSneaker(sneakerId) {
  const sql = `
  DELETE FROM "Sneakers" WHERE id=${sneakerId};
  `
  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }
}


module.exports = {
  createDatabase,
  createTables,
  createRows,
  getBrands,
  createBrand,
  updateBrand,
  getLargestBrandId,
  deleteSneaker,
  getSneakersByBrandId
}
