const isProduction = process.env.NODE_ENV === 'production'
const baseUrl = isProduction ? 'https://example-node-api-rosalinep.herokuapp.com' : 'http://localhost:3002';

export const getFoods = callBackFn => {
    fetch(baseUrl + '/foods')
        .then(response => response.json())
        .then(data => {callBackFn(data)})
        .catch(err => {
            console.log('getFoods error', err);
        });
};

// ToDo: I don't really like this pattern
export const addFood = async (payload, callBackFn) => {
    fetch(
        baseUrl + '/addFood',
        {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': "application/x-www-form-urlencoded"
            },
        })
        .then(res => callBackFn(res));
};

export const example = () => {
    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/foods')
            .then(response => response.json())
            .then(data => {resolve(data);})
            .catch(err => {reject(err);});
    });
};

const fetchPromise =  fetch(baseUrl + '/foods');
