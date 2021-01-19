const mongoose = require('mongoose');
const { connection } = require('../config/db.json');

mongoose.connect(connection, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

module.exports = mongoose