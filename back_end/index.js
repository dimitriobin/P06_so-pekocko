const express = require('express');
require('dotenv').config();
const app = express();

// body parsers
app.use(express.json());
app.use(express.urlencoded());

// get routes
app.use('/', (req, res, next) => {
    res.send('Hello world !')
});


// create the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});