const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const recentSchema = new mongoose.Schema({
    title: {
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
    recipeId: {
        type: ObjectId,
        ref: "Recipe"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Recent', recentSchema);
