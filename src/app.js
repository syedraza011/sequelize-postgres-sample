const express = require('express')
const app = express()
const port = 3000
const {
    createTables,
    createRows,
    getBrands,
    getSneakersByBrandId,
    createBrand,
    getLargestBrandId,
} = require('./database/pg')

// Tell express where our static assets live
app.use(express.static('./assets'))

// Body parser middleware
app.use(express.urlencoded({ extended: false }))

// GET Routes
app.get('/', async (req, res) => {
    // The next two lines are only required the first time the app is ran.
    // await createTables();
    // await createRows();
    const brands = await getBrands()

    res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
        <h1>My Sneaker Shop</h1>
        <h2>Select a destination</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/brands">Brands (${brands?.rows?.length})</a></li>
        </ul>
      </body>
    </html>
  `)
})

app.get('/brands', async (req, res) => {
    const brands = await getBrands()

    let listItems
    if (brands?.rows?.length) {
        listItems = brands.rows.map((ele) => {
            return `<li><a href='/brands/${ele.id}'>${ele.name}</a></li>`
        })
        // Removes commas
        listItems = listItems.join('')
    } else {
        listItems = 'No Brands Available'
    }

    res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body>
        <h1>My Sneaker Shop</h1>
        <h2>Select a destination</h2>
        <ul> 
          <li><a href="/">Home</a></li>
          <li><a href="/brands">Brands (${brands?.rows?.length})</a></li>
        </ul>
        <h3>Brands</h3>
        <ul>
          ${listItems}
        </ul>
        <form action="/brands" method="POST">
          <input type="text" name="brandName" placeholder="Brand Name" />
          <button type="submit">Add Brand</button>
        </form>
      </body>
    </html>
  `)
})

app.get('/brands/:brandId', async (req, res) => {
    console.log('req', req)
    // user agent
    // req.rawHeaders[6]
    // console.log('req.rawHeaders[9]', req.rawHeaders[9])
    const brands = await getBrands()
    const sneakers = await getSneakersByBrandId(req.params.brandId)
    let sneakerList
    if (sneakers?.rows?.length > 0) {
        sneakerList = sneakers.rows.map((ele) => {
            return `<li>${ele.name}</li>`
        })
        // Removes commas
        sneakerList = sneakerList.join('')
    } else {
        sneakerList = 'No Sneakers Available'
    }

    res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body>
        <h1>My Sneaker Shop</h1>
        <h2>Select a destination</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/brands">Brands (${brands?.rows?.length})</a></li>
        </ul>
        <h3>Brand ID: ${req.params.brandId}</h3>
        <ul>
          ${sneakerList}
        </ul>
      </body>
    </html>
  `)
})

// POST Routes
app.post('/brands', async (req, res) => {
    const { brandName } = req.body
    const result = await getLargestBrandId()
    const largestBrandId = result.rows[0].max
    await createBrand(brandName, largestBrandId + 1)
    res.redirect('/brands')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
