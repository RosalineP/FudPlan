export const getFoods = callBackFn => {
    fetch('https://example-node-api-rosalinep.herokuapp.com/foods')
        .then(response => response.json())
        .then(data => {
            console.log("data", data);
            callBackFn(data);
        })
        .catch(err => {
            console.log('getFoods error', err);
        });
};
