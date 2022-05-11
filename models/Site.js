const mongoose= require('mongoose');

const SiteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    jurisdiction: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Site', SiteSchema);