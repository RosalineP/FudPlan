const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));

const getBooks = (request, response) => {
    pool.query('SELECT * FROM books', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const addBook = (request, response) => {
    const { author, title } = request.body

    pool.query(
        'INSERT INTO books (author, title) VALUES ($1, $2)',
        [author, title],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Book added.' })
        }
    )
};

app
    .route('/books')
    // GET endpoint
    .get(getBooks)
    // POST endpoint
    .post(addBook)

const getFoods = (request, response) => {
    console.log("request to getFoods", request);
    pool.query(
        'SELECT' +
        '        name,' +
        '        quantity,' +
        '        units,' +
        '        compartment,' +
        '        to_char(to_date(cast(expiry as TEXT), \'YYYY-MM-DD\'), \'MM-DD-YYYY\') AS expiry,' +
        '        icon,' +
        '        userId ' +
        'FROM foods;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

app
    .route('/foods')
    .get(getFoods)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
})