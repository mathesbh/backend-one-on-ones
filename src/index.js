const PORT = 3000;

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./app/controllers/authController')(app);

app.listen(PORT, () => {
    console.log(`Server listening at the port ${PORT}.`)
});