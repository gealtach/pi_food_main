const { Recipe, Diet } = require("../db")
const axios = require('axios');
const { Op } = require("sequelize");
require('dotenv').config();
const { API_KEY } = process.env;


//=====================================================

const cleanArray = (arrFilter) => {
    const { id, title, image, summary, healthScore, diets, analyzedInstructions } = arrFilter;
    return {
        id: id,
        name: title,
        image: image,
        resume: summary,
        healthScore: healthScore,
        diets: diets.map(diets => diets),
        stepByStep: analyzedInstructions.map(i => i),
        created: false

    }
}

//=====================================================

const getApiRecipes = async () => {
    const {data} = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const apiData = data.results.map((i) => cleanArray(i));
    return apiData;
}

const getDbRecipes = async () => {
    const dbData = await Recipe.findAll();
    return dbData;
}


//=====================================================

const getRecipesById = async (idRecipe, source) => {

    //
    if (source === "api") {
        const apiRecipeRaw = await axios(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
        const apiRecipes = cleanArray(apiRecipeRaw.data);
        return apiRecipes;
    } else {
        const dataBaseRecipes = await Recipe.findByPk(idRecipe, {
            include: {
                model: Diet,
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                }
            }
        });
        return dataBaseRecipes;
    }
}

//=====================================================

const getRecipeByName = async (name) => {
    const nameinLowerCase = name.toString().toLowerCase();
    const apiInfo = await getApiRecipes();
    const dbInfo = await getDbRecipes();
    const all = apiInfo.concat(dbInfo);
    let allFiltered = await all.filter((el) =>
      el.name.toLowerCase().includes(nameinLowerCase)
    );
    return allFiltered;
}

//=====================================================

const postNewRecipe = async (name, image, resume, healthScore, stepByStep) => {
        await Recipe.create({
            name,
            image,
            resume,
            healthScore,
            stepByStep,
        });
        // let dietDb = Diet.findAll({where: {name: diet}});
        // await newRecipe.addDiet(dietDb);
        return `Recipe ${name} created successfully`
    
}

module.exports = { 
    getRecipesById,
    getRecipeByName,
    postNewRecipe,
    cleanArray,
    getApiRecipes
}