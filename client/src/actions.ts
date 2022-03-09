import {Food, FoodAndQuantity, FoodIds} from "./types";

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? 'https://example-node-api-rosalinep.herokuapp.com' : 'http://localhost:3002';

export const getFoods = async (): Promise<Food[]> => {
    const response = await fetch(baseUrl + '/foods');
    return await response.json();
};

// todo could proabbly stand to modularize these
// todo use await: https://stackoverflow.com/questions/54950838/how-to-use-fetch-with-async-await
export const addFood = async (payload: Food): Promise<any> => {
    return fetch(baseUrl + '/addFood', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res => res.json());
};

export const deleteFoods = async (payload: FoodIds): Promise<any> => {
    return fetch(baseUrl + '/deleteFoods', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res => res.json());
};

export const decrementFood = async (payload: FoodAndQuantity): Promise<any> => {
    return fetch(baseUrl + '/decrementFood', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res => res.json());
};
