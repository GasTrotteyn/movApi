import mongoose = require('mongoose')

let schema: object = {
	titulo: { type: String, unique: true, required: true, dropDups: true },
	genero: String,
	año: String,
	director: String,
	actores: String,
	status: String,
}

const movie = new mongoose.Schema(schema)

const Movies = mongoose.model('pelis', movie)

module.exports = Movies
