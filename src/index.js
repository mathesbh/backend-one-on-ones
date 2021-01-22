require('dotenv').config();

const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.listen(process.env.PORT || 3001);