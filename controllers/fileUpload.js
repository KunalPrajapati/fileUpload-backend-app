const File = require('../models/File');


//local file upload => handler function

const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {

    try {
        
        const file = req.files.file;  //the last .file is the name given by me -> this can be anything
        console.log("file" ,file);

        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;

        console.log("path =>" ,path)

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message : 'File uploaded successfully'
        })

    } catch (error) {

        console.log(error)
        
    }

}

async function uploadFileToCloudinary(file, folder){
    const options = {folder}

    try {
        
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);

        console.log(result);

        return result;

    } catch (error) {
        console.log(error);
    }

}


exports.imageUpload = async (req , res) => {

    try {
    
        //data fetching 
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        
        const file = req.files.imageFile;  //the last .imageFile is the name given by me -> this can be anything
        console.log(file);


        //validations

        const supportedTyped = ["jpeg", "jpg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();

        if(!supportedTyped.includes(fileType)){
            return res.status(400).json({
                success: false,
                message: 'File type not supported'
            })
        }

        //file format supported 

        const response = await uploadFileToCloudinary(file, "FileUpload");

        console.log(response);

        //creating entry in the db

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : response.secure_url,
        })

        res.json({
            success : true,
            message : 'Image uploaded successfully',
            imageUrl : response.secure_url
        })


    } catch (error) {

        console.log(error.message)
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
        
    }

}