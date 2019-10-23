import React from 'react';
import axios from 'axios';

const handleButtonClick = () => {
  axios
    .get('http://localhost:9000/items')
    .then((data) => console.log (data.data));
};

const mainPage = () => (
  <>
    <h1>hello prosiaki</h1>
    <button onClick={handleButtonClick}>click me!</button>
  </>
);

export default mainPage;