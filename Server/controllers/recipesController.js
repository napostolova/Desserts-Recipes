const {
    recipeModel,
    userModel} = require('../models');
const {
    newRecipe
} = require('./recentController')

function getRecipes(req, res, next) {
    recipeModel.find()
        .populate('userId')
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getRecipe(req, res, next) {
    const {
        recipeId
    } = req.params;

    recipeModel.findById(recipeId)
        .populate({
            path: 'recents',
            populate: {
                path: 'userId'
            }
        })
        .then(recipe => res.json(recipe))
        .catch(next);
}

function createRecipe(req, res, next) {
    const {
        title,
        products,
        preparation,
        imageUrl
    } = req.body;
    const {
        _id: userId
    } = req.user;

    recipeModel.create({
            title,
            products,
            preparation,
            imageUrl,
            userId,
            likes: []
        })
        .then(recipe => {
            newRecipe(title, products, preparation, imageUrl, userId, recipe._id)
                .then(([_, updatedRecipe]) => res.status(200).json(updatedRecipe))
        })
        .catch(next);
}

function like(req, res, next) {
    const { recipeId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    recipeModel.updateOne({ _id: recipeId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}


function getMyRecipes(req, res, next) {

    const userId = req.user._id;
    console.log(userId);

    recipeModel.find({
            userId: userId
        })
        .then(recipes => res.json(recipes))
        .catch(next);
 }

 function editRecipe (req, res, next) {
    const { recipeId } = req.params;
     const { _id: userId } = req.user;
     const {
        title,
        products,
        preparation,
        imageUrl
    } = req.body;

    // if the userId is not the same as this one of the recipe, the recipe will not be updated
    recipeModel.findOneAndUpdate({ _id: recipeId, userId }, { title: title, products: products, preparation: preparation, imageUrl: imageUrl }, { new: true })
        .then(updatedRecipe => {
            if (updatedRecipe) {
                res.status(200).json(updatedRecipe);
                console.log('edit recipe');
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
console.log('delete recipe');
    Promise.all([
        // recentModel.findOneAndDelete({ _id: recentId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { recents: recentId } }),
        // recipeModel.findOneAndUpdate({ _id: recipeId }, { $pull: { recents: recentId } }),
        recipeModel.findOneAndDelete({ _id: recipeId }),
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
module.exports = {
    getRecipes,
    createRecipe,
    getRecipe,
    like,
    getMyRecipes,
    editRecipe,
    deleteRecipe
}