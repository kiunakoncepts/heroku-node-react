const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: {
        type: String
    },
    genius_id: {
        type: Number
    },
    region: {
        type: String
    },
    subRegion: {
        type: String
    },
    genre: {
        type: Array
    },
    image: {
        type: String
    },
    bg_image: {
        type: String
    },
    rating: {
        type: Number
    },
    tidal_id: {
        type : Number
    },
    bio: {
        type: String
    }

});

module.exports = mongoose.model('Artist', artistSchema);