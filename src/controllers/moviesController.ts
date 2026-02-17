import express, { Request, Response } from 'express';

// Movie Model ref
import Movie from '../models/movie';

// // define a movie object
// interface Movie {
//     id: number;
//     title: string;
//     year: number;
// }

// // create mock movie data in memory 
// let movies: Movie[] = [
//     { id: 1, title: 'The Shining', year: 1980 },
//     { id: 2, title: 'Weapons', year: 2025 },
//     { id: 3, title: '28 Years Later', year: 2025 },
//     { id: 4, title: 'Deadpool & Wolverine', year: 2024 }
// ];

/**
* @swagger
* /api/v1/movies:
*   get:
*     tags:
*     - Movie
*     summary: Retrieve all movies
*     responses:
*       200:
*         description: A list of movies
*       404:
*         description: No movies found
*/
export const getMovies = async (req: Request, res: Response) => {
    // check url for any filter parameters using req.query property (any keys/values after ?)
    // example: /movies?genre=Comedy
    const filter = req.query;

    // use model to fetch movie documents from MongoDB
    const movies = await Movie.find(filter);

    // if no movies found
    if (movies.length === 0) {
        return res.status(404).json({ error: 'No Movies Found' });
    }

    return res.status(200).json(movies);
}

/**
* @swagger
* /api/v1/movies:
*   post:
*     tags:
*     - Movie
*     summary: Create a new movie
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 required: true
*                 type: string
*               year:
*                 required: true
*                 type: number
*     responses:
*       201:
*         description: Movie created
*       400:
*         description: Bad request
*/
export const createMovie = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request' }); // 400: Bad Request
    }

    try {
        // use Movie model to save to db
        await Movie.create(req.body);

        return res.status(201).json(); // 201: Resource Created
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

/**
* @swagger
* /api/v1/movies/{id}:
*   put:
*     tags:
*     - Movie
*     summary: Update a movie based on id param in url
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 required: true
*                 type: string
*               year:
*                 required: true
*                 type: number
*     responses:
*       204:
*         description: Updated, no content
*       404:
*         description: Movie not found
*/
export const updateMovie = async (req: Request, res: Response) => {
    // check if id valid
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return res.status(404).json({ 'error': 'Movie Not Found' });
    }

    try {
        // use mongoose to update Movie from request body
        movie.set(req.body);
        await movie.save();
        return res.status(204).json(); // 204: OK, No Content
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

/**
* @swagger
* /api/v1/movies/{id}:
*   delete:
*     tags:
*     - Movie
*     summary: Delete a movie based on id param in url
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     responses:
*       204:
*         description: Deleted, no content
*       404:
*         description: Movie not found
*/
export const deleteMovie = async (req: Request, res: Response) => {
    // check if id valid
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return res.status(404).json({ 'error': 'Movie Not Found' });
    }

    // use mongoose to delete movie based on id param in url
    await Movie.findByIdAndDelete(req.params.id);

    return res.status(204).json(); // 204: OK, No Content
};

/**
* @swagger
* /api/v1/movies/{id}/reviews:
*   post:
*     tags:
*     - Movie, Review
*     summary: Add a review child document to a selected movie based on id param in url
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               reviewer:
*                 required: true
*                 type: string
*               reviewText:
*                 required: true
*                 type: string
*               rating:
*                 required: true
*                 type: number
*     responses:
*       204:
*         description: Movie updated with new review, no content
*       400:
*         description: Bad request - invalid review content
*       404:
*         description: Movie not found
*/
export const createReview = async (req: Request, res: Response) => {
    // retrieve movie id from url param eg. /movies/{id}/reviews
    const id: string = req.params.id.toString();

    // fetch selected movie
    const movie = await Movie.findById(id);

    // verify movie found
    if (!movie) {
        return res.status(404).json({ 'error': 'Movie Not Found' });
    }

    try {
        // use push() to add to subdocument array
        // ... is js "spread operator" that destructures an array into separate properties
        movie.reviews.push({
            ...req.body,
            date: new Date()
        });
        await movie.save();

        // return response No Content response
        return res.sendStatus(204); 
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};