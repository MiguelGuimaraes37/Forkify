import { aysnc } from 'regenerator-runtime';
import { API_URL, RES_PER_PARGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PARGE,
  },
  bookmarks: [],
};

/**
 * Creates a recipe object by input
 * @param {dataFromAPI} data
 * @returns recipe object
 * @author Miguel Guimaraes Aka Deli
 */
const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

/**
 * Loads a recipe object to state by input
 * @param {idOfRecipe} id
 * @author Miguel Guimaraes Aka Deli
 */
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    state.search.page = 1;
  } catch (err) {
    console.error(`${err} BUM BUM BUM`);
    throw err;
  }
};

/**
 * Loads a searchResults to state by input
 * @param {query} query (e.g pizza)
 * @author Miguel Guimaraes Aka Deli
 */
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    console.error(`${err} BUM BUM BUM`);
    throw err;
  }
};

/**
 * Gets number of search results page by input with a defalt value
 * @param {query} query (e.g pizza)
 * @returns the previous page and next page
 * @author Miguel Guimaraes Aka Deli
 */
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

/**
 * Update current recipe servings and set it on state
 * @param {numberOfServings} newServings
 * @author Miguel Guimaraes Aka Deli
 */
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldSergings // 2 * 8 / 4 = 4;
  });

  state.recipe.servings = newServings;
};

/**
 * Persist bookmarks into Local Storage
 * @author Miguel Guimaraes Aka Deli
 */
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/**
 * Add bookmark to current recipe by input and set it on state and add it to local storage
 * @param {Object} recipe
 * @author Miguel Guimaraes Aka Deli
 */
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

/**
 * Delete current recipe bookmarkby input and set it on state and remove it from local storage
 * @param {int} id
 * @author Miguel Guimaraes Aka Deli
 */
export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => (el.id = id));
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmark
  if (state.recipe.id === id) state.recipe.bookmarked = false;

  persistBookmarks();
};

/**
 * Get the bookmarks of Local Storage and set it on state
 * @author Miguel Guimaraes Aka Deli
 */
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

/**
 * Upload and bookmark the new recipe and add it to state
 * @param {Object} newRecipe
 * @author Miguel Guimaraes Aka Deli
 */
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);

    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
