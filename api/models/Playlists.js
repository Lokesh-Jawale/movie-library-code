const mongoose = require("mongoose")

const PlaylistSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    movies: {
        type: Array,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Playlists", PlaylistSchema);
