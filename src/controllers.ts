import { Movie, CompleteRequest, completeFile } from './interfaces'
import fs = require('fs')
const csv = require('csvtojson')
const Movies = require('./model')
import { Request, Response } from 'express'

const sendDefault = (req: Request, res: Response) => {
	res.send('hello world')
}

//receive the file, check extension, host it in uploads and return the new name
const sendFile = async (req: CompleteRequest, res: Response) => {
	try {
		if (!req.files) {
			res.status(401)
			res.send('No se subió ningún archivo')
		} else {
			//Use the name of the input field (i.e. "prueba") to retrieve the uploaded file
			let file: any = req.files.file

			//Check if file has correct extension
			const textExtension = req.files.file.name.split('.')[1]
			if (textExtension === 'csv') {
				//Use the mv() method to place the file in upload directory (i.e. "uploads")
				let newName = Date.now() + '.' + file.name
				file.mv('./uploads/' + newName)

				//send response
				res.status(200)
				res.send({
					message: 'Upload exitoso',
					name: newName,
				})
			} else {
				res.status(428)
				res.send({
					status: false,
					message: 'Error en el tipo de archivo enviado',
				})
			}
		}
	} catch (err) {
		res.status(500).send(err)
	}
}

//auxiliary function used inside postMovies
function postMovie(movie: Movie) {
	const newMovie = movie
	let movieObject = new Movies(newMovie)
	movieObject
		.save()
		.then(function (respuesta: Response) {
			console.log('creado' + respuesta)
		})
		.catch((error: TypeError) => {
			console.log(error)
		})
}

//convert the csv file in json and host it in DB
const combine = async (req: Request, res: Response) => {
	if (req.body.name) {
		const jsonArray: [] = await csv({ delimiter: ';' }).fromFile(`./uploads/${req.body.name}`)

		for (let movie of jsonArray) {
			postMovie(movie)
		}
		res.send(jsonArray)
	} else {
		res.status(400)
		res.send('Faltó el nombre del archivo a combinar')
	}
}

const getAllMovies = async (req: Request, res: Response) => {
	try {
		const docs: [] = await Movies.find()
		res.send(docs)
	} catch (e) {
		console.log(e)
	}
}

const getSomeMovies = async (req: Request, res: Response) => {
	try {
		const docs: [] = await Movies.find()
			.skip(parseInt(req.params.skip) - 10)
			.limit(10)
		res.send(docs)
	} catch (e) {
		console.log(e)
	}
}

const getMovie = async (req: Request, res: Response) => {
	try {
		const docs: Movie = await Movies.findOne({ titulo: req.params.id })
		if (docs) {
			res.send(docs)
		} else {
			res.send({ message: 'nop, no está' })
		}
	} catch (e) {
		console.log(e)
	}
}

module.exports = {
	sendDefault,
	sendFile,
	combine,
	getAllMovies,
	getMovie,
	getSomeMovies,
}
