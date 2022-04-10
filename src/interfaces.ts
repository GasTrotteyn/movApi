import { Request } from 'express'

export interface Movie {
	titulo?: string
	año?: string
	director?: string
	genero?: string
	actores?: string
	message?: string
}

export interface completeFile extends File {
	mv: Function
}

export interface CompleteRequest extends Request {
	files: { file: File }
}
