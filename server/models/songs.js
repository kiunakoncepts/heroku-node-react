const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    name: {
        type: String
    },
    genius_id: {
        type: Number
    },
    artist_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    genre: {
        type: Array
    },
    stream: {
        sncd: { type: String },
        spty: { type: String },
        tidl: { type: String },
        aple: { type: String },
        ytbe: { type: String },
    },
    image: {
        type: String
    },
    rating: {
        type: Number
    }

});

module.exports = mongoose.model('Song', songSchema);