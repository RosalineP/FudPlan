const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express();

// app.use(express.json());
app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
};
app.use(cors(corsOptions));
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
    pool.query(
        'SELECT' +
        '        id,' +
        '        name,' +
        '        quantity,' +
        '        unit,' +
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


const addFood = (request, response) => {
    const payload = JSON.parse(Object.keys(request.body)[0]);
    const { name, expiry, compartment, icon, quantity, unit } = payload;
    const quantityValue = quantity.length > 0 ? quantity : null;

    pool.query(
        'INSERT INTO foods (name, expiry, compartment, icon, quantity, unit) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, expiry, compartment, icon, quantityValue, unit],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Food added.' })
        }
    );
};

app.post('/addFood', addFood)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
})