import { aysnc } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

/**
 * @param {numberOfSeconds} s
 * @returns a timeout promise
 * @author Miguel Guimaraes Aka Deli
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * If uploadData != undefined uploads a recipe to API, otherwise get recipes from API.
 * @param {request} url
 * @param {data} uploadData (e.g creation of a recipe)
 * @returns either the new recipe created or the recipes of API
 * @author Miguel Guimaraes Aka Deli
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
