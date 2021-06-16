import axios from 'axios';

export const apiUrl = 'https://recipe-hub-back.herokuapp.com/';

export const fetchRecipes = async () => {
  return axios.get(`${apiUrl}admin/v1/mrepository/`);
}

export const fetchRecipe = async id => {
  return axios.get(`${apiUrl}admin/v1/mrepository/${id}/`);
}

export const postRecipe = async param => {
  return axios.post(`${apiUrl}admin/v1/mrepository/`, param);
}

export const postFork = async param => {
  return axios.post(`${apiUrl}api/v1/fork`, param);
}