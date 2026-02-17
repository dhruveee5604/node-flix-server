import mongoose, { Schema } from 'mongoose';

interface IMovie {
    title: string;
    year: number;
    genre: string;
    rating: number;
    duration: number;
    reviews: IReview[];
}

interface IReview {
    reviewer: string;
    reviewText: string;
    rating: number;
    date: Date;
}

const ReviewSchema = new Schema<IReview>({
    reviewer: {
        type: String,
        required: [true, 'Reviewer Required'],
        trim: true
    },
    reviewText: {
        type: String,
        required: [true, 'Review Text Required'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating Required'],
        min: 0,
        max: 10
    },
    date: {
        type: Date,
        default: Date.now  // auto set to current date & time
    }
});

const MovieSchema = new Schema<IMovie>({
    title: {
        type: String,
        required: [true, 'Title Required']
    },
    year: {
        type: Number,
        min: 1900,
        required: [true, 'Year Required']
    },
    genre: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    duration: {
        type: Number,
        min: 1
    },
    reviews: [ReviewSchema]
});

// make model public. As it's a mongoose model it inherits the mongoose CRUD methods
const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
export default Movie;