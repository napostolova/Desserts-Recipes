const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    products: {
        type: String,
       required: true
    },
    preparation: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },    
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    recents: [{
        type: ObjectId,
        ref: "Recent"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Recipe', recipeSchema);
