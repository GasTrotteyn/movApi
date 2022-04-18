"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv = require('csvtojson');
const Movies = require('./model');
const sendDefault = (req, res) => {
    res.send('hello world');
};
//receive the file, check extension, host it in uploads and return the new name
const sendFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files) {
            res.status(401);
            res.send('No se subió ningún archivo');
        }
        else {
            //Use the name of the input field (i.e. "prueba") to retrieve the uploaded file
            let file = req.files.file;
            //Check if file has correct extension
            const textExtension = req.files.file.name.split('.')[1];
            if (textExtension === 'csv') {
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                let newName = Date.now() + '.' + file.name;
                file.mv('./uploads/' + newName);
                //send response
                res.status(200);
                res.send({
                    message: 'Upload exitoso',
                    name: newName,
                });
            }
            else {
                res.status(428);
                res.send({
                    status: false,
                    message: 'Error en el tipo de archivo enviado',
                });
            }
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//auxiliary function used inside postMovies
function postMovie(movie) {
    const newMovie = movie;
    let movieObject = new Movies(newMovie);
    movieObject
        .save()
        .then(function (respuesta) {
        console.log('creado' + respuesta);
    })
        .catch((error) => {
        console.log(error);
    });
}
//convert the csv file in json and host it in DB
const combine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name) {
        const jsonArray = yield csv({ delimiter: ';' }).fromFile(`./uploads/${req.body.name}`);
        for (let movie of jsonArray) {
            postMovie(movie);
        }
        res.send(jsonArray);
    }
    else {
        res.status(400);
        res.send('Faltó el nombre del archivo a combinar');
    }
});
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield Movies.find();
        res.send(docs);
    }
    catch (e) {
        console.log(e);
    }
});
const getSomeMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield Movies.find()
            .skip(parseInt(req.params.skip) - 10)
            .limit(10);
        res.send(docs);
    }
    catch (e) {
        console.log(e);
    }
});
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield Movies.findOne({ titulo: req.params.id });
        if (docs) {
            res.send(docs);
        }
        else {
            res.send({ message: 'nop, no está' });
        }
    }
    catch (e) {
        console.log(e);
    }
});
module.exports = {
    sendDefault,
    sendFile,
    combine,
    getAllMovies,
    getMovie,
    getSomeMovies,
};
//# sourceMappingURL=controllers.js.map