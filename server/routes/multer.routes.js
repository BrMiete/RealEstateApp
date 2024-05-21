const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
            console.log('Carpeta "uploads" creada correctamente.');
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    if(req.file){
        const fileName = path.basename(req.file.path);
        res.send({message:'Archivo subido correctamente', imageUrl: fileName});
    }else{
        res.status(400).send({message: 'Error al cargar el archivo'})
    }
});

module.exports = {
    multerRouter: router
};
