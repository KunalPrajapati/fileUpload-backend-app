//app create

const express = require('express');

const app = express();

//port find

const PORT = process.env.PORT || 3000;

//middleware routes

app.use(express.json());

const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


//db connection 

const db = require('./config/database');
db.connect();

//cloudinary connection

const cloudinary = require('./config/cloudinary');

cloudinary.cloudinaryConnect();

//api route

const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);

//activating the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})