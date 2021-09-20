const isProduction = process.env.NODE_ENV === 'production'
const baseUrl = isProduction ? 'https://example-node-api-rosalinep.herokuapp.com' : 'http://localhost:3002';

export const getFoods = callBackFn => {
    fetch(baseUrl + '/foods')
        .then(response => response.json())
        .then(data => {
            console.log("data", data);
            callBackFn(data);
        })
        .catch(err => {
            console.log('getFoods error', err);
        });
};
