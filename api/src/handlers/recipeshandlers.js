const {  getRecipesById, getRecipeByName, postNewRecipe } = require('../controllers/recipesControllers');


const getRecipesHandlerId = async (req, res) => {
    const { idRecipe } = req.params;
    const source = isNaN(idRecipe) ? "bdd" : "api";
    try {
        //mandamos por parametro y donde buscara
        const recipes = await getRecipesById(idRecipe, source);
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getRecipesHandlerName = async (req, res) => {
    let {name} = req.query;
    if(name){
        try {
            const recipe = await getRecipeByName(name);
            res.status(200).json(recipe);
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
    
}

const postRecipeHandeler = async (req, res) => {
    let {name, image, resume, healthScore, stepByStep, diet} = req.body;
    if(name && image && resume && healthScore && stepByStep){
        try {
            const newRecipe = await postNewRecipe(name, image, resume, healthScore, stepByStep)
            res.status(200).json(newRecipe);
                
        } catch (error) {
                res.status(400).json({error: error.message})
        }   
    }  
}

module.exports = {
    getRecipesHandlerId,
    getRecipesHandlerName,
    postRecipeHandeler
};