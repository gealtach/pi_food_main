const {Diet} = require('../db');
const { getApiRecipes } = require('./recipesControllers');

const getDiets = async () => {
    const diets = await Diet.findAll();
    if(diets.length === 0){
        const apiRecipes = await getApiRecipes();
        let arr = [];
        for(let i = 0; i < apiRecipes.length; i++){
            for(let j = 0; j < apiRecipes[i].diets.length; j++){
                arr.push(apiRecipes[i].diets[j])
            }
        }
        let arr2 = new Set(arr);
        let arr3 = []
        arr2.forEach((e) => arr3.push(e));
        return arr3;
    }
}

module.exports = getDiets;