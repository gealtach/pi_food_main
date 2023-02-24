const {Router} = require('express');
const {getRecipesHandlerId, getRecipesHandlerName, postRecipeHandeler} = require('../handlers/recipeshandlers');

const router = Router();

router.get('/:idRecipe', getRecipesHandlerId);
router.get('/', getRecipesHandlerName);
router.post('/', postRecipeHandeler);



module.exports = router;