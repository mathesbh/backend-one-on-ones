const PORT = 3001;

const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.listen(PORT, () => {
    console.log(`Server listening at the port ${PORT}.`)
});