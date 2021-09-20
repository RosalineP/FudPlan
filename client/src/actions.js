export const getFoods = (callBackFn) => {
  fetch('http://localhost:5000/foods')
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      callBackFn(data);
    })
    .catch((err) => {
      console.log('error', err);
    });
};

export const blah = 1;
