const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'client/build')));

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
        'FROM foods ' +
        'ORDER BY id DESC;',
        (error, results) => {
            if (error) {
                console.log(error);
                response.status(500).json({status: 'failure', message: 'Eugh!'});
            }
            response.status(200).json(results.rows);
        }
    );
};

app.route('/foods').get(getFoods);


const addFood = (request, response) => {
    const payload = JSON.parse(Object.keys(request.body)[0]);
    const { name, expiry, compartment, icon, quantity, unit } = payload;

    const quantityValue = quantity.length > 0 ? quantity : null;

    pool.query(
        'INSERT INTO foods (name, expiry, compartment, icon, quantity, unit) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, expiry, compartment, icon, quantityValue, unit],
        (error) => {
            if (error) {
                console.log(error);
                response.status(500).json({status: 'failure', message: 'Eugh!'});
            }
            response.status(200).json({ status: 'success', message: 'Food added.' })
        }
    );
};

app.post('/addFood', addFood)


const deleteFoods = (request, response) => {
    const payload = JSON.parse(Object.keys(request.body)[0]);
    const { ids } = payload;

    pool.query(
        'DELETE FROM foods WHERE id = ANY($1::int[])',
        [ids],
        (error) => {
            if (error) {
                console.log(error);
                response.status(500).json({status: 'failure', message: 'Eugh!'});
            }
            response.status(200).json({ status: 'success', message: 'Food(s) deleted.' })
        }
    );
};

app.post('/deleteFoods', deleteFoods)





app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
})