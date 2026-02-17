"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ReviewSchema = new mongoose_1.Schema({
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
        default: Date.now // auto set to current date & time
    }
});
const MovieSchema = new mongoose_1.Schema({
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
const Movie = mongoose_1.default.model('Movie', MovieSchema);
exports.default = Movie;
