const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () => {

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(console.log('Database connected'));
    } catch (error) {
        console.log('Database connection failed');
        console.log(error);
    }

}