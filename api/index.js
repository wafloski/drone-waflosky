const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'welcome to drone app' });
});

require('./app/routes/item.routes.js')(app);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
