const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? 'https://example-node-api-rosalinep.herokuapp.com' : 'http://localhost:3002';

export const getFoods = () => {
    return fetch(baseUrl + '/foods').then(response => response.json());
};

export const addFood = async payload => {
    return fetch(baseUrl + '/addFood', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res => res.json());
};

export const deleteFoods = async payload => {
    return fetch(baseUrl + '/deleteFoods', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res => res.json());
};
