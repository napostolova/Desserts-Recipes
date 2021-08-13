const { userModel, recipeModel, recentModel } = require('../models');

function newRecipe(title, products, preparation, imageUrl, userId, recipeId) {
    return recentModel.create({ title, products, preparation, imageUrl, userId, recipeId })
        .then(recent => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { recents: recent._id }, $addToSet: { recipes: recipeId } }),
                recipeModel.findByIdAndUpdate({ _id: recipeId }, { $push: { recents: recent._id }, $addToSet: { likes: userId } }, { new: true })
            ])
        })
}

function getLatestsRecipes(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    recentModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('recipeId userId')
        .then(recents => {
            res.status(200).json(recents)
        })
        .catch(next);
}

function createRecipe(req, res, next) {
    const { recipeId } = req.params;
    const { _id: userId } = req.user;
    const { recipe } = req.body;

    newRecipe(recipe, userId, recipeId)
        .then(([_, updatedRecipe]) => res.status(200).json(updatedRecipe))
        .catch(next);
}

function editRecipe (req, res, next) {
    const { recipeId } = req.params;
    const { recipe } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the recipe, the recipe will not be updated
    recentModel.findOneAndUpdate({ _id: recipeId, userId }, { text: recipe }, { new: true })
        .then(updatedRecipe => {
            if (updatedRecipe) {
                res.status(200).json(updatedRecipe);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteRecipe(req, res, next) {
    const { recentId, recipeId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        recentModel.findOneAndDelete({ _id: recentId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { recents: recentId } }),
        recipeModel.findOneAndUpdate({ _id: recipeId }, { $pull: { recents: recentId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { recentId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    recentModel.updateOne({ _id: recentId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
    getLatestsRecipes,
    newRecipe,
    createRecipe,
    editRecipe,
    deleteRecipe,
    like,
}
