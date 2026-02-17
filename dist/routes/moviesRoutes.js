"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = require("../controllers/moviesController");
// create router to point each url to controller function it should call
const router = express_1.default.Router();
// GET: /api/v1/movies
router.get('/', moviesController_1.getMovies);
// POST: /api/v1/movies
router.post('/', moviesController_1.createMovie);
// PUT: /api/v1/movies/3489 => : represents a url param (usually an id val)
router.put('/:id', moviesController_1.updateMovie);
// DELETE: /api/v1/movies/3489 => : represents a url param (usually an id val)
router.delete('/:id', moviesController_1.deleteMovie);
// POST: /api/v1/movies/{id}/reviews
router.post('/:id/reviews', moviesController_1.createReview);
// make router public
exports.default = router;
